import "dotenv/config";
import { createAuthClient } from "better-auth/react";
import {
    adminClient,
    magicLinkClient,
    organizationClient,
} from "better-auth/client/plugins";
export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    plugins: [adminClient(), magicLinkClient(), organizationClient()],
});

export const { signIn, signUp, useSession } = createAuthClient();
