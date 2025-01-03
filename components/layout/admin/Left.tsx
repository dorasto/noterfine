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
    SidebarMenuSubAction,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    IconBuildingCommunity,
    IconChevronCompactDown,
    IconChevronDown,
    IconDotsVertical,
    IconLayoutSidebarLeftCollapse,
    IconLayoutSidebarLeftExpand,
    IconNews,
    IconPencil,
    IconPlus,
    IconSettings,
    IconShieldFilled,
    IconTrash,
} from "@tabler/icons-react";
import { OrgNav } from "./OrgNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import CreateCollection from "@/components/collections/CreateCollection";
import { authClient } from "@/app/lib/auth-client";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrgDrawerPopover } from "./OrgDrawerPopover";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CreateOrg } from "@/components/user/CreateOrg";
import { DialogTitle } from "@radix-ui/react-dialog";

interface SidebarLeftProps extends React.ComponentProps<typeof Sidebar> {
    user: User;
    siteAdmin: boolean;
    organizations: FullOrganization[];
    activeOrg: FullOrganization | null;
    collections: Collection[];
    allOrgCollections: { orgId: string; collections: Collection[] }[];

    onOrganizationChange: (org: FullOrganization | null) => Promise<void>;
}

export function SidebarLeft({
    user,
    siteAdmin,
    organizations,
    activeOrg,
    collections,
    onOrganizationChange,
    allOrgCollections,
    ...props
}: SidebarLeftProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { state, toggleSidebar, isMobile } = useSidebar();
    const [openOrgDrawer, setOpenOrgDrawer] = React.useState(false);

    const [createCollectionopen, setCreateCollectionOpen] =
        React.useState(false);
    const [openOrgs, setOpenOrgs] = React.useState<string[]>([]);
    React.useEffect(() => {
        if (pathname) {
            const orgId = organizations.find((org) =>
                pathname.includes(org.id)
            )?.id;
            if (orgId && !openOrgs.includes(orgId)) {
                setOpenOrgs((prev) => [...prev, orgId]);
            }
        }
    }, [pathname, organizations]);

    return (
        <Sidebar className="" variant="floating" collapsible="icon" {...props}>
            <CreateCollection
                user={user}
                organization={activeOrg}
                onOrganizationChange={onOrganizationChange}
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
                    {state === "expanded" && (
                        <OrgNav
                            user={user}
                            state={state}
                            organizations={organizations}
                            activeOrg={activeOrg}
                            onOrganizationChange={onOrganizationChange}
                        />
                    )}
                </SidebarMenu>
            </SidebarHeader>
            {siteAdmin && pathname.includes("/admin/site-admin") ? (
                <SidebarContent className="select-none">
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
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                <IconBuildingCommunity />
                                Organizations
                            </SidebarGroupLabel>
                            <SidebarGroupAction
                            // onClick={() => setCreateCollectionOpen(true)}
                            >
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <IconPlus />
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader className="sr-only">
                                            <DialogTitle>
                                                Create organization
                                            </DialogTitle>
                                        </DialogHeader>
                                        <CreateOrg />
                                    </DialogContent>
                                </Dialog>
                                {/* <IconPlus /> */}
                            </SidebarGroupAction>
                            {organizations?.map((org) => (
                                <Collapsible
                                    open={openOrgs.includes(org.id)}
                                    onOpenChange={(open) => {
                                        setOpenOrgs((prev) =>
                                            open
                                                ? [...prev, org.id]
                                                : prev.filter(
                                                      (id) => id !== org.id
                                                  )
                                        );
                                    }}
                                    key={org.id}
                                    className="group/collapsible select-none"
                                >
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            isActive={pathname.endsWith(org.id)}
                                            onClick={async () => {
                                                if (state === "expanded") {
                                                    await onOrganizationChange(
                                                        org
                                                    );
                                                    router.refresh();
                                                    router.push(
                                                        `/admin/org/${org.id}`
                                                    );
                                                } else {
                                                    console.log(
                                                        "Current state:",
                                                        openOrgDrawer
                                                    );
                                                    setOpenOrgDrawer(true);
                                                    console.log(
                                                        "After setState:",
                                                        openOrgDrawer
                                                    );
                                                }
                                            }}
                                        >
                                            <Avatar
                                                className={cn(
                                                    "rounded-md w-4 h-4"
                                                )}
                                            >
                                                {org.logo && (
                                                    <AvatarImage
                                                        src={org.logo}
                                                        alt={
                                                            org?.name ||
                                                            "Noterfine"
                                                        }
                                                    />
                                                )}
                                                <AvatarFallback className="rounded-md">
                                                    {org.name?.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            {org.name}
                                        </SidebarMenuButton>
                                        <OrgDrawerPopover
                                            org={org}
                                            open={openOrgDrawer}
                                            setOpen={setOpenOrgDrawer}
                                            isMobile={isMobile}
                                            collections={
                                                allOrgCollections.find(
                                                    (e) => e.orgId === org.id
                                                )?.collections
                                            }
                                            onOrganizationChange={
                                                onOrganizationChange
                                            }
                                        />
                                        <div
                                            className={cn(
                                                "flex items-center gap-1 absolute top-2 right-2",
                                                state === "expanded"
                                                    ? ""
                                                    : "hidden"
                                            )}
                                        >
                                            <CollapsibleTrigger asChild>
                                                <Button
                                                    variant={"sidebarActions"}
                                                    size={"sidebarActions"}
                                                >
                                                    <IconChevronDown className="group-data-[state=closed]/collapsible:-rotate-90" />
                                                </Button>
                                            </CollapsibleTrigger>

                                            <Button
                                                variant={"sidebarActions"}
                                                size={"sidebarActions"}
                                                onClick={async () => {
                                                    setOpenOrgDrawer(true);
                                                }}
                                            >
                                                <IconDotsVertical className="group-data-[state=closed]/collapsible:" />
                                            </Button>

                                            {/* <SidebarMenuAction>
                                                <CollapsibleTrigger asChild>
                                                    <IconChevronDown className="group-data-[state=closed]/collapsible:-rotate-90" />
                                                </CollapsibleTrigger>
                                            </SidebarMenuAction> */}
                                        </div>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {allOrgCollections
                                                    .find(
                                                        (e) =>
                                                            e.orgId === org.id
                                                    )
                                                    ?.collections?.map(
                                                        (collection) => (
                                                            <SidebarMenuSubItem
                                                                key={
                                                                    collection.id
                                                                }
                                                                className="group/subitem"
                                                            >
                                                                <SidebarMenuSubButton
                                                                    isActive={pathname.includes(
                                                                        collection.id
                                                                    )}
                                                                    onClick={async () => {
                                                                        await onOrganizationChange(
                                                                            org
                                                                        );
                                                                        router.refresh();
                                                                        router.push(
                                                                            `/admin/org/${org.id}/collections/${collection.id}`
                                                                        );
                                                                    }}
                                                                    className="gap-2"
                                                                >
                                                                    <div className="truncate">
                                                                        {
                                                                            collection.name
                                                                        }
                                                                    </div>
                                                                </SidebarMenuSubButton>
                                                                <SidebarMenuAction className="invisible group-hover/subitem:visible right-4">
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger
                                                                            asChild
                                                                        >
                                                                            <IconDotsVertical className="group-data-[state=closed]/collapsible:" />
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent side="right">
                                                                            <DropdownMenuLabel>
                                                                                {
                                                                                    collection.name
                                                                                }
                                                                            </DropdownMenuLabel>
                                                                            <DropdownMenuSeparator />
                                                                            <DropdownMenuItem>
                                                                                <IconPlus />
                                                                                Add
                                                                                content
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem>
                                                                                <IconSettings />
                                                                                Settings
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuSeparator />
                                                                            <DropdownMenuItem className="bg-destructive/50">
                                                                                <IconTrash />
                                                                                Delete
                                                                            </DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                </SidebarMenuAction>
                                                            </SidebarMenuSubItem>
                                                        )
                                                    )}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarGroup>
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
