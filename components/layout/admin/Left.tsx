"use client";

import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";

import { usePathname, useRouter } from "next/navigation";
import { UserNav } from "./UserNav";
import { type User } from "@/types/user";
import {
    FooterItemsArray,
    LeftItemsArray,
    SiteAdminItemsArray,
} from "./LeftItems";
import {
    IconArrowBack,
    IconLayoutSidebarLeftCollapse,
    IconLayoutSidebarLeftExpand,
    IconShieldFilled,
} from "@tabler/icons-react";
import { OrgNav } from "./OrgNav";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

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
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar();

    return (
        <Sidebar className="" variant="floating" collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    {state === "expanded" ? (
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                className="text-primary group/menu"
                                tooltip={"Home"}
                            >
                                <Avatar className="h-4 w-4 rounded-none">
                                    <AvatarImage
                                        src={
                                            "https://cdn.doras.to/Noterfine/logo-yellow.svg"
                                        }
                                        alt="Home"
                                        className=" group-hover/menu:hidden"
                                    />
                                    <AvatarImage
                                        src={
                                            "https://cdn.doras.to/Noterfine/logo-white.svg"
                                        }
                                        alt="Home"
                                        className="hidden group-hover/menu:block"
                                    />
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-bold">
                                        Noterfine
                                    </span>
                                </div>
                            </SidebarMenuButton>
                            <SidebarMenuAction onClick={() => toggleSidebar()}>
                                <IconLayoutSidebarLeftCollapse />
                            </SidebarMenuAction>
                        </SidebarMenuItem>
                    ) : (
                        <SidebarMenuItem>
                            <SidebarMenuButton onClick={() => toggleSidebar()}>
                                <IconLayoutSidebarLeftExpand />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}
                    <OrgNav user={user} state={state} />
                </SidebarMenu>
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
                    {FooterItemsArray().map((group) => (
                        <div key={group.title}>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        onClick={() => router.push(item.href)}
                                        isActive={pathname === item.href}
                                        tooltip={item.title}
                                    >
                                        <item.icon />
                                        {item.title}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </div>
                    ))}
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
