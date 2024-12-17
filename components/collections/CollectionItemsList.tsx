"use client";
import { CollectionItem } from "@/types/user";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { formatDistance } from "date-fns";
import { IconFileText } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface Props {
    items?: CollectionItem[];
    onCreateNew?: () => void;
}

export function CollectionItemsList({ items = [], onCreateNew }: Props) {
    return (
        <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
                <Label variant={"heading"}>Items</Label>
                <a href={`/admin/org/editor/new`}>
                    <Button onClick={onCreateNew}>Create</Button>
                </a>
            </div>

            <div className="flex flex-wrap gap-4">
                {items.map((item) => (
                    <Card
                        key={item.id}
                        className="flex-1 min-w-[300px] max-w-[400px] hover:shadow-lg transition-shadow"
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <IconFileText size={20} />
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                Created{" "}
                                {formatDistance(
                                    new Date(item.createdAt),
                                    new Date(),
                                    { addSuffix: true }
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {items.length === 0 && (
                    <div className="w-full text-center text-muted-foreground py-8">
                        No items yet. Create your first item!
                    </div>
                )}
            </div>
        </div>
    );
}
