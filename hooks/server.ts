"use server";

import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export const getSession = async () => {
    const headersList = await headers();
    const headersObj = new Headers(headersList);

    const session = await auth.api.getSession({
        headers: headersObj,
    });
    return session;
};
