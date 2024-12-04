"use client";

import * as React from "react";
import {
    AudioWaveform,
    Blocks,
    Calendar,
    Command,
    Home,
    Inbox,
    MessageCircleQuestion,
    Search,
    Settings2,
    Sparkles,
    Trash2,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import SignOut from "@/components/auth/SignOut";

import { usePathname, useRouter } from "next/navigation";

export function SidebarLeft({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <Sidebar className="" variant="floating" collapsible="icon" {...props}>
            <SidebarHeader>
                {/* <TeamSwitcher teams={data.teams} /> */}
                {/* <NavMain items={data.navMain} /> */}
            </SidebarHeader>
            <SidebarContent>
                {/* <NavFavorites favorites={data.favorites} /> */}
                {/* <NavWorkspaces workspaces={data.workspaces} /> */}
                {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
            </SidebarContent>
            <SidebarFooter>
                <SignOut sideNav />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
