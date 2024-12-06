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
            sendMagicLink: async ({ email, token, url }) => {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.UNSEND_API_KEY}`,
                    },
                    body: JSON.stringify({
                        to: email,
                        from: "Noterfine <hello@system.noterfine.app>",
                        subject: "Noterfine - Sign In Link",
                        html: `Click this link to sign in: <a href="${url}?token=${token}">Sign In</a>`,
                        text: `Click this link to sign in: ${url}?token=${token}`,
                    }),
                };

                try {
                    const response = await fetch(
                        "https://app.unsend.dev/api/v1/emails",
                        options
                    );
                    const data = await response.json();
                    return;
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
