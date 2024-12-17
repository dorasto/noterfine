import { db } from "@/app/db";
import * as schema from "@/app/db/schema/collections";
import { eq } from "drizzle-orm";
import { getSession } from "@/hooks/server";
import { redirect } from "next/navigation";
import { CollectionEditor } from "@/components/collections/editor";

interface PageProps {
    params: {
        orgid: string;
        collection: string;
        id: string;
    };
}

export default async function Editor({ params }: PageProps) {
    const { orgid, collection, id } = params;
    const session = await getSession();

    if (!session?.user) {
        redirect("/auth/login");
    }

    let collectionItem = null;

    if (id !== "new") {
        const items = await db
            .select()
            .from(schema.collectionItem)
            .where(eq(schema.collectionItem.id, id))
            .limit(1);
        collectionItem = items[0];
    }

    return (
        <CollectionEditor
            collectionId={collection}
            item={collectionItem}
            userId={session.user.id}
        />
    );
}
