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
import { Button } from "@/components/ui/button";
interface Props {
    user: User;
    onOrganizationChange?: (org: FullOrganization | null) => void;
}

export function OrgSelector({ user, onOrganizationChange }: Props) {
    const { isMobile } = useSidebar();
    const router = useRouter();
    const path = usePathname();

    const { data: session } = authClient.useSession();
    const { data: organizations } = authClient.useListOrganizations();
    const [fullOrganizations, setFullOrganizations] = useState<
        FullOrganization[]
    >([]);
    const [activeOrg, setActiveOrg] = useState<FullOrganization | null>(null);
    // Add this useEffect to get the active organization
    useEffect(() => {
        if (
            session?.session.activeOrganizationId &&
            fullOrganizations.length > 0
        ) {
            const active = fullOrganizations.find(
                (org) => org.id === session.session.activeOrganizationId
            );
            setActiveOrg(active || null);
        }
    }, [session?.session.activeOrganizationId, fullOrganizations]);
    useEffect(() => {
        async function fetchFullOrgs() {
            if (!organizations) return;

            try {
                const fullOrgs = await Promise.all(
                    organizations.map(async (org) => {
                        const result =
                            await authClient.organization.getFullOrganization({
                                query: { organizationId: org.id },
                            });
                        return result.data as FullOrganization; // Type assertion here
                    })
                );
                // Filter out any null values and set state
                setFullOrganizations(
                    fullOrgs.filter(
                        (org): org is FullOrganization => org != null
                    )
                );
            } catch (error) {
                console.error("Error fetching full org data:", error);
            }
        }

        fetchFullOrgs();
    }, [organizations]);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                    <Avatar className={cn("rounded-md w-4 h-4")}>
                        <AvatarImage
                            src={activeOrg?.logo || ""}
                            alt={activeOrg?.name || "Noterfine"}
                        />
                        <AvatarFallback className="rounded-md">
                            <IconUser />
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            {activeOrg?.name || "Your profile"}
                        </span>
                        {/* <span className="truncate text-xs">Pro</span> */}
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-md"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
            >
                <DropdownMenuGroup>
                    {fullOrganizations.map((org) => (
                        <DropdownMenuItem
                            key={org.id}
                            onClick={async () => {
                                try {
                                    await authClient.organization.setActive({
                                        organizationId: org.id,
                                    });
                                    setActiveOrg(org);
                                    onOrganizationChange?.(org);
                                } catch (error) {
                                    console.error(
                                        "Error setting active organization:",
                                        error
                                    );
                                }
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={async () => {
                            try {
                                await authClient.organization.setActive({
                                    organizationId: null,
                                });
                                setActiveOrg(null);
                                onOrganizationChange?.(null);
                            } catch (error) {
                                console.error(
                                    "Error clearing active organization:",
                                    error
                                );
                            }
                        }}
                    >
                        {user.image ? (
                            <img
                                src={user.image ?? ""}
                                alt={user.name}
                                className="h-4 w-4"
                            />
                        ) : (
                            <IconUser className="h-4 w-4" />
                        )}
                        Your profile
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
