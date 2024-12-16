import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { OrgHeading } from "@/components/organization/Heading";
import { CollectionHeading } from "@/components/collections/CollectionHeading";
import { db } from "@/app/db";
import * as schema from "@/app/db/schema/collections";
import { eq } from "drizzle-orm";
import type { Collection } from "@/types/user";

interface PageProps {
    params: {
        collection: string;
    };
}

export default async function Home({ params }: PageProps) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const collectionData = await db
        .select()
        .from(schema.collection)
        .where(eq(schema.collection.id, params.collection))
        .limit(1);
    console.log(collectionData);
    return (
        <div>
            <CollectionHeading collection={collectionData[0] as Collection} />
        </div>
    );
}
