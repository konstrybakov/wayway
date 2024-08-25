# WayWay

WayWay was is a word learning app. I've created it to help me learn a new language after I couldn't find a word learning app that would satisfy my requirements. There are a few things that made me create WayWay:

- some apps have a lot of unnecessary (for me) configuration exposed to the user during the creation of the word entry
- some apps don't have learning modes that I prefer
- some apps have a UI that doesn't satisfy my requirements
- some apps don't have a freemium, or good enough freemium for me

## Setup

### Prerequisites

Before setting up the project, ensure you have the following installed and configured:

1. **PostgreSQL Database Server**

   - A running PostgreSQL instance with a database created
   - User, that is able to create additional databases as needed

2. **Bun Runtime**

   - Install the latest version of [Bun](https://bun.sh/) for your operating system

3. **Docker** (Optional)

   - Required only if you choose to set up local authentication with Keycloak
   - Install [Docker](https://www.docker.com/get-started/) if not already available on your system

4. **GitHub Account** (Alternative to Keycloak)
   - Only required if you prefer using GitHub OAuth for authentication

### Environment Setup

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install project dependencies:

   ```bash
   bun install
   ```

3. Create your environment configuration:

   ```bash
   cp .env.example .env
   ```

4. Open the `.env` file and configure the following variables:

   ```
   DATABASE_URL=<your-postgres-database-url>
   AUTH_SECRET=<randomly-generated-secret-string>
   ```

5. If you plan to use AI features, add your OpenAI API key:
   ```
   OPENAI_API_KEY=<your-openai-api-key>
   ```

### Authentication Setup

Choose one of the following authentication methods:

#### Option 1: Local Keycloak Instance (Recommended for Development)

1. Add the following to your `.env` file:

   ```
   DEV_AUTH="keycloak"
   AUTH_KEYCLOAK_ID="wayway"
   AUTH_KEYCLOAK_SECRET="wayway"
   AUTH_KEYCLOAK_ISSUER="http://localhost:8080/realms/wayway"
   ```

2. Start the Keycloak instance:

   ```bash
   bun start:keycloak
   ```

   This command spins up a Docker container with a pre-configured Keycloak instance, including a realm, user, and client.

3. Access Keycloak using the following credentials:
   - Username: `robotbarry`
   - Email: `barry@mail.com`
   - Password: `barrycakes`

### Option 2: GitHub OAuth

1. Create a new OAuth app in your GitHub account:

   - Follow the guide at [Configuring GitHub Authentication](https://authjs.dev/guides/configuring-github)

2. Add the following to your `.env` file:
   ```
   AUTH_GITHUB_ID=<your-github-oauth-app-id>
   AUTH_GITHUB_SECRET=<your-github-oauth-app-secret>
   ```

## Starting the Application

Once you've completed the setup, you can start the application in dev mode:

```bash
bun dev
```

Visit `http://localhost:3000` in your web browser to access the application.

## Troubleshooting

If you encounter any issues during setup or running the application, please check the following:

1. Ensure all environment variables are correctly set in your `.env` file
2. Verify that PostgreSQL is running and accessible
3. If using Keycloak, make sure Docker is running and the Keycloak container is active

For further assistance open an issue in the GitHub repository.

## License

While I am figuring out how to approach this whole thing, please consider the following license

This project is licensed under the WayWay Non-Commercial License. You are free to use, modify, and self-host this software for personal, non-commercial purposes only.

For full terms and conditions, see the [LICENSE](./LICENSE) file.
