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
    IconCreditCard,
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
                        size={state === "expanded" ? "lg" : "default"}
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-sidebar-accent border-sidebar-border"
                        tooltip={"Your account"}
                    >
                        <Avatar
                            className={cn(
                                "rounded-md",
                                state === "expanded" ? "w-8 h-8" : "w-4 h-4"
                            )}
                        >
                            <AvatarImage
                                src={
                                    "https://cdn.doras.to/Noterfine/logo-white.svg"
                                }
                                alt="Noterfine"
                            />
                            <AvatarFallback className="rounded-md">
                                {user.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                OrgName
                            </span>
                            <span className="truncate text-xs">Pro</span>
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
                                // onClick={() => {
                                //     setSelectedOrganization(org);
                                //     setIsOpen(false);
                                // }}
                            >
                                <img
                                    src={org.logo ?? ""}
                                    alt={org.name}
                                    className="h-4 w-4"
                                />
                                {org.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    );
}
