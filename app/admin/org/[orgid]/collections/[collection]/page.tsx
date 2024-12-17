import { CollectionHeading } from "@/components/collections/CollectionHeading";
import { db } from "@/app/db";
import * as schema from "@/app/db/schema/collections";
import { eq } from "drizzle-orm";
import type { Collection } from "@/types/user";
import { getSession } from "@/hooks/server";
import { redirect } from "next/navigation";

interface PageProps {
    params: {
        orgid: string;
        collection: string;
    };
}

export default async function Home({ params }: PageProps) {
    const { orgid, collection } = await params;
    const session = await getSession();

    if (!session?.user) {
        redirect("/auth/login");
    }

    const collectionData = await db
        .select()
        .from(schema.collection)
        .where(eq(schema.collection.id, collection))
        .limit(1);

    return (
        <div>
            <CollectionHeading collection={collectionData[0] as Collection} />
        </div>
    );
}
