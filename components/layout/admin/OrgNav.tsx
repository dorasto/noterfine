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
import { useRouter } from "next/navigation";
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
}

export function OrgNav({ user, state }: Props) {
    const { isMobile } = useSidebar();
    const router = useRouter();
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onRequest: (ctx) => {
                    // handle loading state
                },
                onSuccess: () => {
                    router.push("/");
                },
                onError: (ctx) => {
                    alert(ctx.error.message);
                },
            },
        });
    };

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
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-sidebar-accent border-sidebar-border"
                        tooltip={"Your account"}
                    >
                        <Avatar className={cn("rounded-md w-4 h-4")}>
                            <AvatarImage
                                src={activeOrg?.logo || ""}
                                alt={activeOrg?.name || "Noterfine"}
                            />
                            <AvatarFallback className="rounded-md">
                                <IconBuildingCommunity />
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                {activeOrg?.name || "Organization"}
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
                                    CN
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
                        {fullOrganizations.map((org) => (
                            <DropdownMenuItem
                                key={org.id}
                                onClick={async () => {
                                    try {
                                        await authClient.organization.setActive(
                                            {
                                                organizationId: org.id,
                                            }
                                        );
                                        setActiveOrg(org);
                                        router.push(`/admin/org/${org.id}`);
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

                        <DropdownMenuItem
                            onClick={async () => {
                                try {
                                    await authClient.organization.setActive({
                                        organizationId: null,
                                    });
                                    setActiveOrg(null);
                                    router.push(`/admin`);
                                } catch (error) {
                                    console.error(
                                        "Error clearing active organization:",
                                        error
                                    );
                                }
                            }}
                        >
                            <IconHome className="h-4 w-4" />
                            Home
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    );
}
