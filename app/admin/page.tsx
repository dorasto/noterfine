import { getSession } from "@/hooks/server";

export default async function Home() {
    const session = await getSession();

    return (
        <div>
            <h1>Hello {session?.user.name}</h1>
        </div>
    );
}
