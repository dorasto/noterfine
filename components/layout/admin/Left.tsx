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
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import SignOut from "@/components/auth/SignOut";

import { usePathname, useRouter } from "next/navigation";
import { UserNav } from "./UserNav";
import { type User } from "@/types/user";
import { LeftItemsArray, SiteAdminItemsArray } from "./LeftItems";
import { IconArrowBack, IconShieldFilled } from "@tabler/icons-react";

export function SidebarLeft({
    user,
    siteAdmin,
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    user: User;
    siteAdmin: boolean;
}) {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <Sidebar className="" variant="floating" collapsible="icon" {...props}>
            <SidebarHeader>
                {/* <TeamSwitcher teams={data.teams} /> */}
                {/* <NavMain items={data.navMain} /> */}
            </SidebarHeader>
            {siteAdmin && pathname.includes("/admin/site-admin") ? (
                <SidebarContent>
                    {SiteAdminItemsArray().map((group) => (
                        <SidebarGroup key={group.title}>
                            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            onClick={() =>
                                                router.push(item.href)
                                            }
                                            isActive={pathname === item.href}
                                            tooltip={item.title}
                                        >
                                            <item.icon />
                                            {item.title}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroup>
                    ))}
                </SidebarContent>
            ) : (
                <SidebarContent>
                    {LeftItemsArray().map((group) => (
                        <SidebarGroup key={group.title}>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            onClick={() =>
                                                router.push(item.href)
                                            }
                                            isActive={pathname === item.href}
                                            tooltip={item.title}
                                        >
                                            <item.icon />
                                            {item.title}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroup>
                    ))}
                </SidebarContent>
            )}
            <SidebarFooter>
                <SidebarMenu>
                    <UserNav user={user} />
                    {siteAdmin && (
                        <>
                            <SidebarSeparator />
                            <SidebarMenuItem>
                                {pathname.includes("/admin/site-admin") ? (
                                    <SidebarMenuButton
                                        onClick={() => router.push("/admin/")}
                                        tooltip={"Exit Site Admin"}
                                    >
                                        <IconArrowBack />
                                        Exit Site Admin
                                    </SidebarMenuButton>
                                ) : (
                                    <SidebarMenuButton
                                        onClick={() =>
                                            router.push("/admin/site-admin")
                                        }
                                        tooltip={"Enter Site Admin"}
                                    >
                                        <IconShieldFilled />
                                        Site Admin
                                    </SidebarMenuButton>
                                )}
                            </SidebarMenuItem>
                        </>
                    )}
                </SidebarMenu>
            </SidebarFooter>
            {/* <SidebarRail /> */}
        </Sidebar>
    );
}
