"use client";

import { authClient } from "@/app/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface Props {
    children?: React.ReactNode;
}
export function OrgMembers({ children }: Props) {
    const { data: activeOrganization } = authClient.useActiveOrganization();
    console.log(activeOrganization);
    return (
        <div className="flex flex-col gap-1">
            {activeOrganization?.members.map((member) => (
                <div
                    key={member.id}
                    className="flex items-center gap-1 border-b last:border-0"
                >
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={member.user.image ?? ""} />

                        <AvatarFallback>
                            {member.user.name?.slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="w-1/4 flex flex-col">
                        <div className="truncate">
                            <Label variant={"bold"}>
                                {member.user.name}daosipfj saodifj asopdijf
                                opasijdf opaisjdop iajsodp ifjasopdij
                            </Label>
                        </div>
                        <div className="truncate">
                            <Label variant={"small"}>{member.user.email}</Label>
                        </div>
                    </div>
                    <Badge className="capitalize" variant={"outline"}>
                        {member.role}
                    </Badge>
                </div>
            ))}
        </div>
    );
}
