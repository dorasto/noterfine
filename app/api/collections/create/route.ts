import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { collection } from "@/app/db/schema/collections";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(), // you need to pass the headers object.
        });
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const newCollection = await db
            .insert(collection)
            .values({
                id: body.id,
                name: body.name,
                description: body.description,
                isDomain: body.isDomain,
                url: body.url,
                isPublic: body.isPublic,
                userId: body.userId,
                organizationId: body.organizationId,
            })
            .returning();

        return NextResponse.json(newCollection[0]);
    } catch (error) {
        console.error("Error creating collection:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
