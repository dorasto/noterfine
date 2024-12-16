import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/app/db"; // your drizzle instance
import * as schema from "@/app/db/schema/auth-schema";
import { admin, magicLink, organization } from "better-auth/plugins";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq } from "drizzle-orm";
import { user } from "@/app/db/schema/auth-schema";
import { render } from "@react-email/render";
import React from "react";
import { MagicLinkEmailTemplate } from "@/components/email/MagicLink";
import { sendMagicLinkEmail } from "./sendMagic";

export const auth = betterAuth({
    user: {
        additionalFields: {
            accountType: {
                type: "string",
                required: false,
                defaultValue: "free",
                input: false, // don't allow user to set role
            },
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        admin(),
        organization({
            allowUserToCreateOrganization: async (user) => {
                const accountType = await getAccountType(user.id);
                return accountType.plan === "pro";
            },
        }),

        magicLink({
            disableSignUp: true,
            sendMagicLink: async ({ email, token, url }) => {
                try {
                    await sendMagicLinkEmail(email, url, token);
                } catch (error) {
                    console.error("Failed to send magic link:", error);
                    throw error;
                }
            },
        }),
    ],
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
});

async function getAccountType(userId: string) {
    const userRecord = await db
        .select({
            accountType: schema.user.accountType,
        })
        .from(schema.user)
        .where(eq(schema.user.id, userId))
        .limit(1);

    return {
        plan: userRecord[0]?.accountType || "free",
    };
}
