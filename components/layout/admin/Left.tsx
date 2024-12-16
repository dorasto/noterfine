"use client";

import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";

import { usePathname, useRouter } from "next/navigation";
import { UserNav } from "./UserNav";
import { FullOrganization, Collection, type User } from "@/types/user";

import {
    FooterItemsArray,
    LeftItemsArray,
    SiteAdminItemsArray,
} from "./LeftItems";
import {
    IconArrowBack,
    IconDotsVertical,
    IconLayoutSidebarLeftCollapse,
    IconLayoutSidebarLeftExpand,
    IconNews,
    IconPencil,
    IconPlus,
    IconShieldFilled,
} from "@tabler/icons-react";
import { OrgNav } from "./OrgNav";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import CreateCollection from "@/components/collections/CreateCollection";
import { authClient } from "@/app/lib/auth-client";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

    const [createCollectionopen, setCreateCollectionOpen] =
        React.useState(false);
    const { data: session } = authClient.useSession();
    const { data: organizations } = authClient.useListOrganizations();
    const [fullOrganizations, setFullOrganizations] = React.useState<
        FullOrganization[]
    >([]);
    const [activeOrg, setActiveOrg] = React.useState<FullOrganization | null>(
        null
    );

    React.useEffect(() => {
        async function fetchFullOrgs() {
            if (!organizations) return;

            const fullOrgs = await Promise.all(
                organizations.map(async (org) => {
                    const result =
                        await authClient.organization.getFullOrganization({
                            query: { organizationId: org.id },
                        });
                    return result.data as FullOrganization;
                })
            );
            setFullOrganizations(
                fullOrgs.filter((org): org is FullOrganization => org != null)
            );
        }
        fetchFullOrgs();
    }, [organizations]);

    React.useEffect(() => {
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

    const [collections, setCollections] = React.useState<Collection[]>([]);

    React.useEffect(() => {
        async function fetchCollections() {
            if (activeOrg) {
                const response = await fetch(
                    `/api/collections/list?organizationId=${activeOrg.id}`
                );

                const data = await response.json();
                setCollections(data);
            }
        }
        fetchCollections();
    }, [activeOrg]);

    return (
        <Sidebar className="" variant="inset" collapsible="icon" {...props}>
            <CreateCollection
                user={user}
                organization={activeOrg}
                onOrganizationChange={setActiveOrg}
                open={createCollectionopen}
                onOpenChange={setCreateCollectionOpen}
            />
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
                    <>
                        {LeftItemsArray().map((group) => (
                            <SidebarGroup key={group.title}>
                                <SidebarMenu>
                                    {group.items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                onClick={() =>
                                                    router.push(item.href)
                                                }
                                                isActive={
                                                    pathname === item.href
                                                }
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
                        <Collapsible defaultOpen className="group/collapsible">
                            <SidebarGroup>
                                <SidebarGroupLabel>
                                    <IconNews />
                                    Collections
                                </SidebarGroupLabel>
                                <SidebarGroupAction
                                    onClick={() =>
                                        setCreateCollectionOpen(true)
                                    }
                                >
                                    <IconPlus />
                                </SidebarGroupAction>
                                {collections?.map((collection) => (
                                    <SidebarMenuItem key={collection.id}>
                                        <SidebarMenuButton
                                            isActive={pathname.includes(
                                                collection.id
                                            )}
                                            onClick={() =>
                                                router.push(
                                                    `/admin/org/${activeOrg?.id}/collections/${collection.id}`
                                                )
                                            }
                                        >
                                            {collection.name}
                                        </SidebarMenuButton>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton />
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton />
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarGroup>
                        </Collapsible>
                    </>
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
