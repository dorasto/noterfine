import Image from "next/image";
import { auth } from "../lib/auth";
import { headers } from "next/headers";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
    return (
        <div>
            <h1>Hello {session?.user.name}</h1>
        </div>
    );
}
