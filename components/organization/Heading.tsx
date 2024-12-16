"use client";

import { authClient } from "@/app/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { OrgMembers } from "./Members";

interface Props {
    children?: React.ReactNode;
}
export function OrgHeading({ children }: Props) {
    const { data: activeOrganization } = authClient.useActiveOrganization();
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-1">
                    <img
                        src={activeOrganization?.logo ?? ""}
                        alt={activeOrganization?.name}
                        className="h-10 w-10 rounded-full"
                    />
                    <Label variant={"heading"}>
                        {activeOrganization?.name}
                    </Label>
                    <Label
                        variant={"bold"}
                        className="ml-auto text-muted-foreground"
                    >
                        {activeOrganization?.slug}.noterfine.app
                    </Label>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <OrgMembers />
            </CardContent>
        </Card>
    );
}
