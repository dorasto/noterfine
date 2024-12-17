"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Sidebar, SidebarProvider } from "../ui/sidebar";

interface Props {
    collectionId: string;
    item?: any;
    userId: string;
}

export function CollectionEditor({ collectionId, item, userId }: Props) {
    const router = useRouter();
    const [title, setTitle] = useState(item?.title || "");
    const [content, setContent] = useState(item?.content || {});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            id: item?.id || crypto.randomUUID(),
            collectionId,
            title,
            content,
            createdById: userId,
        };

        const response = await fetch("/api/collections/items", {
            method: item ? "PUT" : "POST",
            body: JSON.stringify(data),
        });

        if (response.ok) {
            router.push(
                `/admin/org/${collectionId}/collections/${collectionId}`
            );
        }
    };

    return (
        <SidebarProvider>
            <Card>
                <CardHeader>
                    <CardTitle>{item ? "Edit Item" : "New Item"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit">
                            {item ? "Save Changes" : "Create Item"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <Sidebar side="right" variant="floating"></Sidebar>
        </SidebarProvider>
    );
}
