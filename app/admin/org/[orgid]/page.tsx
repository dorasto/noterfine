import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { OrgHeading } from "@/components/organization/Heading";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
    const org = await auth.api.getFullOrganization({
        headers: await headers(),
    });
    return (
        <div>
            <OrgHeading />
        </div>
    );
}
