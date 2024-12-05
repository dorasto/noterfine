"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "@/hooks/use-toast";
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
import { useState } from "react";

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Organization name must be at least 2 characters.",
    }),
    slug: z
        .string()
        .min(2, {
            message: "Slug must be at least 2 characters.",
        })
        .regex(/^[a-z0-9-]+$/, {
            message:
                "Slug can only contain lowercase letters, numbers, and hyphens.",
        }),
    logo: z.string(),
});

export function CreateOrg() {
    const [imagePreview, setImagePreview] = useState<string>("");

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            slug: "",
            logo: "",
        },
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                form.setValue("logo", base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const newOrg = await authClient.organization.create({
                name: data.name,
                slug: data.slug,
                logo: data.logo,
            });

            toast({
                title: "Organization created successfully",
                description: `${newOrg.name} has been created.`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create organization.",
                variant: "destructive",
            });
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Create New Organization</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Organization Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="My Organization"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    The display name of your organization
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="my-organization"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    URL-friendly name (lowercase letters,
                                    numbers, and hyphens only)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="logo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Logo</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                    />
                                </FormControl>
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Logo preview"
                                        className="mt-2 h-20 w-20 object-cover rounded-lg"
                                    />
                                )}
                                <FormDescription>
                                    Upload your organization logo
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Create Organization</Button>
                </form>
            </Form>
        </div>
    );
}
