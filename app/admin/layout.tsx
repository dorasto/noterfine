import { SidebarLeft } from "@/components/layout/admin/Left";
import { SidebarRight } from "@/components/layout/admin/Right";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { User } from "@/types/user";
import { Suspense } from "react";
export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
    if (!session?.user) {
        redirect("/auth/login");
    }
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <Suspense fallback={<div>Loading...</div>}>
                <SidebarLeft
                    siteAdmin={session?.user.role === "admin"}
                    user={session.user as User}
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
