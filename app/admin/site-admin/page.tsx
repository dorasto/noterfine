import { getSession } from "@/hooks/server";

export default async function Home() {
    const session = await getSession();

    return <div></div>;
}
