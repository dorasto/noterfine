"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collection, FullOrganization } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    IconArrowRight,
    IconCreditCard,
    IconExternalLink,
    IconStack2,
    IconUsers,
} from "@tabler/icons-react";
interface Props {
    isMobile?: boolean;
    org: FullOrganization;
    open: boolean;
    setOpen: (open: boolean) => void;
    collections?: Collection[];
}

export function OrgDrawerPopover({
    isMobile,
    org,
    open,
    setOpen,
    collections,
}: Props) {
    const isDesktop = isMobile === false;

    if (isDesktop) {
        return (
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger className="sr-only">
                    Open
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="right"
                    align="center"
                    sideOffset={50}
                    alignOffset={-10}
                >
                    <DropdownMenuLabel className="flex items-center gap-1">
                        <Avatar className={cn("rounded-md w-4 h-4")}>
                            {org.logo && (
                                <AvatarImage
                                    src={org.logo}
                                    alt={org?.name || "Noterfine"}
                                />
                            )}
                            <AvatarFallback className="rounded-md">
                                {org.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>{" "}
                        {org.name}
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <IconExternalLink /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <IconStack2 /> Collections
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                {collections?.map((collection) => (
                                    <DropdownMenuItem key={collection.id}>
                                        {collection.name}
                                        <IconArrowRight className="ml-auto" />
                                    </DropdownMenuItem>
                                ))}
                                {(!collections || collections.length === 0) && (
                                    <DropdownMenuItem disabled>
                                        No collections
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        <IconUsers /> Team
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <IconCreditCard /> Billing
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left border-b">
                    <div className="flex items-center gap-2">
                        <Avatar className={cn("rounded-md w-8 h-8")}>
                            {org.logo && (
                                <AvatarImage
                                    src={org.logo}
                                    alt={org?.name || "Noterfine"}
                                />
                            )}
                            <AvatarFallback className="rounded-md">
                                {org.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <DrawerTitle>{org.name}</DrawerTitle>
                    </div>
                </DrawerHeader>

                <OrgContent className="px-4" org={org} />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

interface OrgContentProps {
    className?: string;
    org: FullOrganization;
}
function OrgContent({ className, org }: OrgContentProps) {
    return (
        <div className={cn("flex flex-col gap-3", className)}>
            <div className=" flex flex-col gap-1">
                <Label>Collections</Label>
            </div>
        </div>
    );
}
