"use client";
import { authClient } from "@/app/lib/auth-client";
import { Label } from "../ui/label";
import { Organization } from "@/types/user";
import { CreateOrg } from "./CreateOrg";

export function UserOrganizations() {
    const { data: organizations } = authClient.useListOrganizations();
    return (
        <div>
            <Label variant={"heading"}>Organizations</Label>
            <CreateOrg />
        </div>
    );
}
