import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { OrgHeading } from "@/components/organization/Heading";
import { redirect } from "next/navigation";
import { FullOrganization } from "@/types/user";
import { getCollections } from "@/app/actions/collections";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
export default async function Home() {
    const headersList = await headers();
    const headersObj = new Headers(headersList);

    const session = await auth.api.getSession({
        headers: headersObj,
    });

    if (!session?.user) {
        redirect("/auth/login");
    }

    const organizations = await auth.api.listOrganizations({
        headers: headersObj,
    });

    const fullOrganizations = organizations
        ? await Promise.all(
              organizations.map(async (org: { id: string }) => {
                  const orgDetails = await auth.api.getFullOrganization({
                      headers: headersObj,
                      query: { organizationId: org.id },
                  });
                  return orgDetails as FullOrganization;
              })
          )
        : [];

    const activeOrg =
        fullOrganizations.find(
            (org): org is FullOrganization =>
                org?.id === session.session.activeOrganizationId
        ) || null;

    const collections = activeOrg ? await getCollections(activeOrg.id) : [];
    return (
        <div>
            <OrgHeading />
            {activeOrg?.name}
        </div>
    );
}
