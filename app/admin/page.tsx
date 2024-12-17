import PageWrapper from "@/components/layout/PageWrapper";
import { getSession } from "@/hooks/server";

export default async function Home() {
    const session = await getSession();

    return (
        <PageWrapper>
            <h1>Hello {session?.user.name}</h1>
        </PageWrapper>
    );
}
