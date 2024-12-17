"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarInput,
    SidebarProvider,
} from "../ui/sidebar";
import PageWrapper from "../layout/PageWrapper";
import { Editor } from "@/components/editor/DynamicEditor";

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
        <SidebarProvider
            style={{
                "--sidebar-width": "20vw",
                "--sidebar-width-mobile": "50vw",
            }}
        >
            <PageWrapper>
                <Editor />
            </PageWrapper>
            <Sidebar side="right" variant="floating">
                <SidebarContent>
                    <SidebarGroup>
                        <div>
                            <Label variant={"small"}>Title</Label>
                            <SidebarInput
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    );
}
