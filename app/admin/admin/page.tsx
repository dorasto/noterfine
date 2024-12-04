import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import ListUsers from "@/components/administration/users/list";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
    return (
        <div>
            <h1>Hello {session?.user.name}</h1>
            <p>{session?.user.role}</p>
            <ListUsers />
        </div>
    );
}
