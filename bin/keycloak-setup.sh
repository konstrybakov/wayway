#!/bin/bash

set -e

# Container name
CONTAINER_NAME="keycloak-wayway"

# PostgreSQL connection details
PG_HOST="localhost"
PG_DOCKER_HOST="host.docker.internal"
PG_DATABASE="keycloak"

# Function to read DATABASE_URL from .env file
read_database_url() {
  if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
  else
    echo ".env file not found. Please create one with DATABASE_URL."
    exit 1
  fi

  if [ -z "$DATABASE_URL" ]; then
    echo "DATABASE_URL not found in .env file."
    exit 1
  fi
}

# Function to parse DATABASE_URL
parse_database_url() {
  # Extract components from DATABASE_URL
  PG_USER=$(echo $DATABASE_URL | sed -n 's/^postgresql:\/\/\([^:]*\):.*/\1/p')
  PG_PASSWORD=$(echo $DATABASE_URL | sed -n 's/^postgresql:\/\/[^:]*:\([^@]*\).*/\1/p')
  PG_PORT=$(echo $DATABASE_URL | sed -n 's/^postgresql:\/\/[^@]*@[^:]*:\([^/]*\).*/\1/p')

  # Use default port if not specified
  PG_PORT=${PG_PORT:-5432}

  # Validate parsed values
  if [ -z "$PG_USER" ] || [ -z "$PG_PASSWORD" ]; then
    echo "Failed to parse DATABASE_URL. Please check the format."
    exit 1
  fi
}

# Function to check if Keycloak is ready
check_keycloak() {
  curl -s -o /dev/null -w "%{http_code}" http://localhost:9000/health/ready
}

# Function to wait for Keycloak to be ready
wait_for_keycloak() {
  echo "Waiting for Keycloak to start..."
  ATTEMPTS=0
  MAX_ATTEMPTS=30
  until [ "$(check_keycloak)" = "200" ] || [ $ATTEMPTS -eq $MAX_ATTEMPTS ]; do
    echo "Waiting for Keycloak to be ready... (Attempt $((ATTEMPTS+1))/$MAX_ATTEMPTS)"
    sleep 10
    ATTEMPTS=$((ATTEMPTS+1))
  done

  if [ $ATTEMPTS -eq $MAX_ATTEMPTS ]; then
    echo "Keycloak failed to start in time. Please check the Docker logs."
    docker logs $CONTAINER_NAME
    exit 1
  fi

  echo "Keycloak is ready!"
}

# Function to create database if it doesn't exist
create_database_if_not_exists() {
  echo "Checking if database exists..."
  if ! PGPASSWORD=$PG_PASSWORD psql -h $PG_HOST -p $PG_PORT -U $PG_USER -lqt | cut -d \| -f 1 | grep -qw $PG_DATABASE; then
    echo "Database $PG_DATABASE does not exist. Creating it..."
    PGPASSWORD=$PG_PASSWORD psql -h $PG_HOST -p $PG_PORT -U $PG_USER -c "CREATE DATABASE $PG_DATABASE;"
    echo "Database $PG_DATABASE created successfully."
  else
    echo "Database $PG_DATABASE already exists."
  fi
}

# Function to create Keycloak resources
create_keycloak_resources() {
  # Get an admin token
  echo "Getting admin token..."
  ADMIN_TOKEN=$(curl -s -X POST http://localhost:8080/realms/master/protocol/openid-connect/token \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d 'username=admin' \
    -d 'password=admin' \
    -d 'grant_type=password' \
    -d 'client_id=admin-cli' | jq -r '.access_token')

  if [ -z "$ADMIN_TOKEN" ]; then
    echo "Failed to obtain admin token. Please check Keycloak logs."
    docker logs $CONTAINER_NAME
    exit 1
  fi

  # Create a new realm
  echo "Creating new realm..."
  curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:8080/admin/realms \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"realm": "wayway", "enabled": true}'

  # Create a new user
  echo "Creating new user..."
  USER_CREATION_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:8080/admin/realms/wayway/users \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "username": "robotbarry",
      "firstName": "Robot",
      "lastName": "Barry",
      "enabled": true,
      "email": "barry@mail.com",
      "emailVerified": true,
      "credentials": [{"type": "password", "value": "barrycakes", "temporary": false}]
    }')

  USER_CREATION_BODY=$(echo "$USER_CREATION_RESPONSE" | sed -e '$d')
  USER_CREATION_STATUS=$(echo "$USER_CREATION_RESPONSE" | tail -n1)

  if [ "$USER_CREATION_STATUS" -eq 201 ]; then
    echo "User created successfully"
  else
    echo "Failed to create user. Status code: $USER_CREATION_STATUS"
    echo "Response body: $USER_CREATION_BODY"
    exit 1
  fi

  # Create a new client
  echo "Creating new client..."
  curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:8080/admin/realms/wayway/clients \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "clientId": "wayway",
      "enabled": true,
      "publicClient": false,
      "redirectUris": [
        "http://localhost:3000/*",
        "http://localhost:3000/api/auth/callback/keycloak"
      ],
      "secret": "wayway"
    }'

  echo "Keycloak setup complete!"
}

# Read and parse DATABASE_URL
read_database_url
parse_database_url
create_database_if_not_exists

# Check container status
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Container $CONTAINER_NAME is running. All good!"
elif [ "$(docker ps -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
    echo "Container $CONTAINER_NAME is stopped. Starting it..."
    docker start $CONTAINER_NAME
    wait_for_keycloak
    echo "Container $CONTAINER_NAME is now running."
else
    echo "Container $CONTAINER_NAME does not exist. Creating it..."

    # Start Keycloak using Bitnami image with PostgreSQL
    echo "Starting Keycloak..."
    docker run -d --name $CONTAINER_NAME \
      -p 8080:8080 \
      -p 8443:8443 \
      -p 9000:9000 \
      -e KEYCLOAK_CREATE_ADMIN_USER=true \
      -e KEYCLOAK_ADMIN_USER=admin \
      -e KEYCLOAK_ADMIN_PASSWORD=admin \
      -e KEYCLOAK_ENABLE_HEALTH_ENDPOINTS=true \
      -e KEYCLOAK_DATABASE_HOST=$PG_DOCKER_HOST \
      -e KEYCLOAK_DATABASE_PORT=$PG_PORT \
      -e KEYCLOAK_DATABASE_NAME=$PG_DATABASE \
      -e KEYCLOAK_DATABASE_USER=$PG_USER \
      -e KEYCLOAK_DATABASE_PASSWORD=$PG_PASSWORD \
      --add-host=host.docker.internal:host-gateway \
      bitnami/keycloak:latest

    wait_for_keycloak
    create_keycloak_resources
fi
