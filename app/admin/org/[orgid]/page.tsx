import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { OrgHeading } from "@/components/organization/Heading";
import { redirect } from "next/navigation";
import { getSession } from "@/hooks/server";
import PageWrapper from "@/components/layout/PageWrapper";

export default async function Home({ params }: { params: { orgid: string } }) {
    //await needed for next 15 not sure why
    const { orgid } = await params;
    const session = await getSession();
    if (!session?.user) {
        redirect("/auth/login");
    }

    auth.api.setActiveOrganization({
        headers: await headers(),
        body: {
            organizationId: orgid || null,
        },
    });

    return (
        <PageWrapper>
            <OrgHeading />
        </PageWrapper>
    );
}
