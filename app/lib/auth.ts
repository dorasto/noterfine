import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/app/db"; // your drizzle instance
import * as schema from "@/app/db/schema/auth-schema";
import { admin, magicLink, organization } from "better-auth/plugins";
import "dotenv/config";
import { render } from "@react-email/render";
import MagicLinkEmailTemplate from "@/components/email/MagicLink";
import { sendMagicLinkEmail } from "./send-magic-link";
export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        admin(),
        organization(),
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
