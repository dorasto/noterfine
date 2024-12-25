Noterfine is a project that aims to help manage notes and tasks and turn them into websites that can be either shared with the world, or for internal use locked behind an authentication wall. It is currently in development and is not yet ready for use.

There will be a cloud hosted version of the project, as well as a self hosted version all provided from the one codebase.

Tech Stack:

-   NextJS
-   TailwindCSS
-   Drizzle ORM
-   ShadCN UI
-   PostgreSQL

## Development

> [!IMPORTANT]
> Inside the package.json you will see references to commands with "infisical:`. These are used for those who don't want a .env file but Infisical, or other secrets management tools.

-   We've provided a Dockerfile to help you spin up a postgresql database.
-   Copy the .env.example file to .env and fill in the required information.
-   Run `pnpm install`
-   Run `pnpm dev`
-   Open your browser to http://localhost:3000
-   Drizzle will run at the same time, and available on http://local.drizzle.studio
-   You will need to run `pnpm db:push` to push the schema to the database.
