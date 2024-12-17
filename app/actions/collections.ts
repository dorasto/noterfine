"use server";

import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { FullOrganization } from "@/types/user";
import { revalidatePath } from "next/cache";
import "dotenv/config";
export async function updateActiveOrganization(org: FullOrganization | null) {
    const headersList = await headers();
    const headersObj = new Headers(headersList);

    await auth.api.setActiveOrganization({
        headers: headersObj,
        body: {
            organizationId: org?.id || null,
        },
    });

    revalidatePath("/", "layout");
}

export async function getCollections(organizationId: string) {
    const headersList = await headers();
    const headersObj = new Headers(headersList);

    return fetch(
        `${process.env.BETTER_AUTH_URL}/api/collections/list?organizationId=${organizationId}`,
        {
            headers: headersObj,
        }
    ).then((res) => res.json());
}
