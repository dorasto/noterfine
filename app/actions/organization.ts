"use server";

import { auth } from "../lib/auth";
import { headers } from "next/headers";
import "dotenv/config";

export async function getOrganization() {
    const headersList = await headers();
    const headersObj = new Headers(headersList);
    const data = await auth.api.getFullOrganization({
        headers: headersObj,
    });
    return data;
}
