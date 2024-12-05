import { SidebarLeft } from "@/components/layout/admin/Left";
import { SidebarRight } from "@/components/layout/admin/Right";
import { cookies } from "next/headers";
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
export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <SidebarLeft
                siteAdmin={session?.user.role === "admin"}
                user={session?.user}
            />

            <SidebarInset>
                <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1">
                                        Project Management & Task Tracking
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
