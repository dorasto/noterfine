"use client";
import * as React from "react";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { IconShieldFilled } from "@tabler/icons-react";

export function SidebarRight({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <Sidebar
            collapsible="icon"
            variant="floating"
            // className="sticky hidden lg:flex top-0 h-svh border-l"
            side="right"
            {...props}
        >
            <SidebarHeader className="border-b border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            isActive={pathname === "/admin/site-admin"}
                            onClick={() => router.push("/admin/site-admin")}
                        >
                            <IconShieldFilled />
                            Site Admin
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {/* <DatePicker /> */}
                <SidebarSeparator className="mx-0" />
                {/* <Calendars calendars={data.calendars} /> */}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Plus />
                            <span>New Calendar</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
