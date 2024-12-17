"use client";
import { formatDistance, subDays } from "date-fns";
import { authClient } from "@/app/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Collection } from "@/types/user";
import { organization } from "better-auth/plugins";
import { IconEye, IconLockBolt, IconLockOpen2 } from "@tabler/icons-react";

interface Props {
    children?: React.ReactNode;
    collection?: Collection;
}
export function CollectionHeading({ children, collection }: Props) {
    const { data: activeOrganization } = authClient.useActiveOrganization();
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-1">
                    <img
                        // @ts-ignore
                        src={activeOrganization?.logo}
                        alt={activeOrganization?.name}
                        className="h-10 w-10"
                    />
                    <Label variant={"heading"}>
                        {collection?.name || "Collection"}
                    </Label>
                    <div className="ml-auto">
                        {collection?.isPublic ? (
                            <IconLockOpen2 />
                        ) : (
                            <IconLockBolt />
                        )}
                    </div>
                    <Label variant={"bold"} className="text-muted-foreground">
                        {collection?.isDomain
                            ? "Domain"
                            : activeOrganization?.slug +
                              ".noterfine.app/" +
                              collection?.url}
                    </Label>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex items-start gap-2 w-full">
                {collection?.description && (
                    <p className="text-muted-foreground">
                        {collection.description}
                    </p>
                )}
                <div className="flex flex-col gap-1 ml-auto">
                    <Label variant={"small"}>
                        Created:{" "}
                        {collection?.createdAt &&
                            formatDistance(
                                new Date(collection.createdAt),
                                new Date(),
                                { addSuffix: true }
                            )}
                    </Label>
                    <Label variant={"small"}>
                        Visibility:{" "}
                        {collection?.isPublic ? "Public" : "Private"}
                    </Label>
                </div>
            </CardContent>
        </Card>
    );
}
