import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/app/db"; // your drizzle instance
import * as schema from "@/app/db/schema/auth-schema";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    plugins: [admin()],
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
});
