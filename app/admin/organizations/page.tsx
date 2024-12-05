import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { UserOrganizations } from "@/components/user/organizations";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
    return (
        <div>
            <UserOrganizations />
        </div>
    );
}
