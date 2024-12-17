import { SidebarLeft } from "@/components/layout/admin/Left";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { FullOrganization, User } from "@/types/user";
import { Suspense } from "react";
import {
    getCollections,
    updateActiveOrganization,
} from "../actions/collections";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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

    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <Suspense fallback={<div>Loading...</div>}>
                <SidebarLeft
                    siteAdmin={session?.user.role === "admin"}
                    user={session.user as User}
                    organizations={fullOrganizations}
                    activeOrg={activeOrg}
                    collections={collections}
                    onOrganizationChange={updateActiveOrganization}
                />
            </Suspense>
            <SidebarInset>
                <Suspense fallback={<div>Loading...</div>}>
                    <div className="flex flex-1 flex-col gap-4 p-4">
                        {children}
                    </div>
                </Suspense>
            </SidebarInset>
        </SidebarProvider>
    );
}
