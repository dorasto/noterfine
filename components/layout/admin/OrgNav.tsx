"use client";

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
} from "lucide-react";
import { FullOrganization, type User } from "@/types/user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter, usePathname } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/app/lib/auth-client";
import {
    IconBell,
    IconBuildingCommunity,
    IconCreditCard,
    IconHome,
    IconLayoutSidebarRightExpandFilled,
    IconLogout,
    IconSparkles,
    IconUser,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
interface Props {
    user: User;
    state?: "collapsed" | "expanded";
    organizations: FullOrganization[];
    activeOrg: FullOrganization | null;
    onOrganizationChange: (org: FullOrganization | null) => Promise<void>;
}

export function OrgNav({
    user,
    state,
    organizations,
    activeOrg,
    onOrganizationChange,
}: Props) {
    const { isMobile } = useSidebar();
    const router = useRouter();
    return (
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-sidebar-accent border-sidebar-border"
                        tooltip={"Your account"}
                    >
                        <Avatar className={cn("rounded-md w-4 h-4")}>
                            <AvatarImage
                                src={
                                    activeOrg
                                        ? activeOrg?.logo || ""
                                        : user.image || ""
                                }
                                alt={activeOrg?.name || "Noterfine"}
                            />
                            <AvatarFallback className="rounded-md">
                                {activeOrg
                                    ? activeOrg.name?.charAt(0)
                                    : user.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                {activeOrg?.name || "Personal"}
                            </span>
                            {/* <span className="truncate text-xs">Pro</span> */}
                        </div>
                        <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-md"
                    side={isMobile ? "bottom" : "right"}
                    align="end"
                    sideOffset={4}
                >
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-md">
                                <AvatarImage
                                    src={user.image ?? ""}
                                    alt={user.name}
                                />
                                <AvatarFallback className="rounded-md">
                                    {user.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {user.name}
                                </span>
                                {/* <span className="truncate text-xs">
                                        {user.email}
                                    </span> */}
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        {organizations.map((org: FullOrganization) => (
                            <DropdownMenuItem
                                key={org.id}
                                onClick={async () => {
                                    router.push(`/admin/org/${org.id}`);
                                    await onOrganizationChange(org);
                                    router.refresh();
                                }}
                            >
                                <img
                                    src={org.logo ?? ""}
                                    alt={org.name}
                                    className="h-4 w-4"
                                />
                                {org.name}
                            </DropdownMenuItem>
                        ))}

                        <DropdownMenuItem
                            onClick={async () => {
                                await onOrganizationChange(null);
                                router.refresh();
                                router.push("/admin");
                            }}
                        >
                            <Avatar className="h-4 w-4 rounded-md">
                                <AvatarImage
                                    src={user.image ?? ""}
                                    alt={user.name}
                                />
                                <AvatarFallback className="rounded-md text-[0.5rem]">
                                    {user.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            Personal
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    );
}
