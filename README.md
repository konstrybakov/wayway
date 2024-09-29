# WayWay

WayWay was is a word learning app. I've created it to help me learn a new language after I couldn't find a word learning app that would satisfy my requirements. There are a few things that made me create WayWay:

- some apps have a lot of unnecessary (for me) configuration exposed to the user during the creation of the word entry
- some apps don't have learning modes that I prefer
- some apps have a UI that doesn't satisfy my requirements
- some apps don't have a freemium, or good enough premium for me

## Setup

### Prerequisites

Before setting up the project, ensure you have the following installed and configured:

1. **PostgreSQL Database**

   - A running PostgreSQL instance with a database created
   - A database connection string

2. **Bun Runtime**

   - Install the latest version of [Bun](https://bun.sh/) for your operating system

3. **Clerk**

   - Create a free account at [Clerk](https://clerk.com/)
   - Follow instructions to setup a Clerk application

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
   ```

5. If you plan to use AI features, add your OpenAI API key:

   ```
   OPENAI_API_KEY=<your-openai-api-key>
   ```

6. Run database migrations

   ```
   bun db:migrate
   ```

### Authentication Setup

Please checkout clerk dashboard and documentation on how to setup the Next.js application.

You can find API keys here (look for `Developers/API keys`): [Dashboard](https://dashboard.clerk.com)

You would need to customize session token. To do that go to `Session management/Sessions` and customize a token to look like this:

```json
{
	"name": "{{user.first_name}}",
	"email": "{{user.primary_email_address}}",
	"imgsrc": "{{user.image_url}}"
}
```

### Troubleshooting

If you encounter any issues during setup or running the application, please check the following:

1. Ensure all environment variables are correctly set in your `.env` file
2. Verify that PostgreSQL is running and accessible


For further assistance open an issue in the GitHub repository.

## License

While I am figuring out how to approach this whole thing, please consider the following license

This project is licensed under the WayWay Non-Commercial License. You are free to use, modify, and self-host this software for personal, non-commercial purposes only.

For full terms and conditions, see the [LICENSE](./LICENSE) file.
