import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { collection } from "@/app/db/schema/collections";
import { auth } from "@/app/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function GET(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const organizationId = searchParams.get("organizationId");

    const collections = await db
        .select()
        .from(collection)
        .where(eq(collection.organizationId, organizationId as string));

    return NextResponse.json(collections);
}
