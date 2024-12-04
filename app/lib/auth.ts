import { betterAuth } from "better-auth";
import { LibsqlDialect } from "@libsql/kysely-libsql";
 
const dialect = new LibsqlDialect({
    url: process.env.TURSO_DATABASE_URL || "",
    authToken: process.env.TURSO_AUTH_TOKEN || "",
})
 
export const auth = betterAuth({
  database: {
    dialect,
    type: "sqlite"
  }
});