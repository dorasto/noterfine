"use client";

import { FullOrganization, Organization, User } from "@/types/user";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { OrgSelector } from "../layout/admin/OrgSelector";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { IconPlus } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { collectionItem } from "@/app/db/schema/collections";

const formSchema = z.object({
    collectionName: z.string().min(3).max(36),
    collectionBio: z.string(),
    collectionDomainCheck: z.boolean().default(true),
    collectionDomain: z.string().min(3).max(36),
    collectionPublic: z.boolean(),
});
interface CreateCollectionProps {
    user: User;
    organization: FullOrganization | null;
    onOrganizationChange: (org: FullOrganization | null) => void;

    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateCollection({
    user,
    organization,
    onOrganizationChange,
    open,
    onOpenChange,
}: CreateCollectionProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Create collection record with:
            // - id (generate UUID)
            // - name (from values.collectionName)
            // - description (from values.collectionBio)
            // - url (from values.collectionDomain)
            // - isPublic (from values.collectionPublic)
            // - userId (from user.id)
            // - organizationId (from organization?.id if exists)

            const collectionData = {
                id: crypto.randomUUID(),
                name: values.collectionName,
                description: values.collectionBio,
                domain: values.collectionDomain,
                url: values.collectionDomain,
                isPublic: values.collectionPublic,
                userId: user.id,
                organizationId: organization?.id,
            };

            // We can create an API endpoint at /api/collections/create
            // Then call it here:
            const response = await fetch("/api/collections/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(collectionData),
            });

            if (response.ok) {
                toast.success("Collection created successfully!");
                onOpenChange(false);
            }
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to create collection. Please try again.");
        }
    }

    const collectionDomainCheck = form.watch("collectionDomainCheck");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-fit">
                <DialogHeader>
                    <Card>
                        <CardHeader>
                            <CardTitle>Create collection for</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <OrgSelector
                                user={user}
                                onOrganizationChange={(org) => {
                                    onOrganizationChange(org);
                                }}
                            />
                        </CardContent>
                    </Card>
                </DialogHeader>
                <div className="overflow-auto h-full flex flex-col gap-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-3 max-w-3xl mx-auto"
                        >
                            <FormField
                                control={form.control}
                                name="collectionName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Internal Documents"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The name of your collection
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="collectionBio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Welcome to my notes!"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Describe what this collection is
                                            used for
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="collectionDomainCheck"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel>Custom domain</FormLabel>
                                            <FormDescription>
                                                Check this if you wish to use a
                                                domain specific for this
                                                collection, or utilize a custom
                                                of your organization
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="collectionDomain"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>URL</FormLabel>
                                        <FormControl className="flex items-center">
                                            {!collectionDomainCheck ? (
                                                <div className="flex items-center">
                                                    <div className="h-9 w-fit rounded-l-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex items-center">
                                                        {organization
                                                            ? organization?.slug
                                                            : user.name}
                                                        .noterfine.app/
                                                    </div>
                                                    <Input
                                                        className="rounded-r-md rounded-l-none"
                                                        placeholder="my-collection"
                                                        type="text"
                                                        {...field}
                                                        onKeyDown={(e) => {
                                                            if (e.key === " ") {
                                                                e.preventDefault();
                                                                field.onChange(
                                                                    field.value +
                                                                        "-"
                                                                );
                                                            }
                                                        }}
                                                        onChange={(e) => {
                                                            const value =
                                                                e.target.value
                                                                    .replace(
                                                                        /[^a-zA-Z0-9-]/g,
                                                                        ""
                                                                    )
                                                                    .toLowerCase();
                                                            field.onChange(
                                                                value
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <Input
                                                        placeholder="mydomain.com"
                                                        type="text"
                                                        {...field}
                                                        onKeyDown={(e) => {
                                                            if (e.key === " ") {
                                                                e.preventDefault();
                                                                field.onChange(
                                                                    field.value +
                                                                        "-"
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </FormControl>
                                        <FormDescription>
                                            Enter the URL you wish to use
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="collectionPublic"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel>Make public</FormLabel>
                                            <FormDescription>
                                                Choose if this should be
                                                publicly accessible or if only
                                                organization members can access
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
