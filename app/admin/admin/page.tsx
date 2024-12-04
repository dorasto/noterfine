import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import ListUsers from "@/components/administration/users/list";
import CreateUser from "@/components/administration/users/create";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
    return (
        <div>
            <ListUsers />
            <CreateUser />
        </div>
    );
}
