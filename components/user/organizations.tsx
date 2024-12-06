"use client";
import { authClient } from "@/app/lib/auth-client";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { FullOrganization, Organization } from "@/types/user";

export function UserOrganizations() {
    const { data: session } = authClient.useSession();
    const { data: organizations } = authClient.useListOrganizations();
    const [fullOrganizations, setFullOrganizations] = useState<
        FullOrganization[]
    >([]);

    useEffect(() => {
        async function fetchFullOrgs() {
            if (!organizations) return;

            try {
                const fullOrgs = await Promise.all(
                    organizations.map(async (org) => {
                        const result =
                            await authClient.organization.getFullOrganization({
                                query: { organizationId: org.id },
                            });
                        return result.data as FullOrganization; // Type assertion here
                    })
                );
                // Filter out any null values and set state
                setFullOrganizations(
                    fullOrgs.filter(
                        (org): org is FullOrganization => org != null
                    )
                );
            } catch (error) {
                console.error("Error fetching full org data:", error);
            }
        }

        fetchFullOrgs();
    }, [organizations]);

    if (!organizations) {
        return <Skeleton className="w-full h-16 rounded-md" />;
    }

    return (
        <div className="flex flex-col gap-3">
            {organizations.map((org) => {
                const fullOrgData = fullOrganizations.find(
                    (fo) => fo.id === org.id
                );
                const memberCount = fullOrgData?.members?.length || (
                    <Skeleton className="w-full h-[19px] rounded-md" />
                );
                const userRole = fullOrgData?.members?.find(
                    (member) => member.userId === session?.user?.id
                )?.role || <Skeleton className="w-full h-[19px] rounded-md" />;

                return (
                    <div
                        key={org.id}
                        className="flex items-center gap-3 bg-card p-2 first:rounded-t-md last:rounded-b-md"
                    >
                        {org.logo && (
                            <img
                                src={org.logo}
                                alt={org.name}
                                className="w-12 h-12 rounded-md"
                            />
                        )}
                        <div className="w-1/12">
                            <div className="truncate">
                                <Label variant={"heading"}>{org.name}</Label>
                            </div>
                        </div>
                        <div className="w-2/12">
                            <div className="truncate">
                                <Label variant={"bold"}>
                                    {org.slug}.noterfine.app
                                </Label>
                            </div>
                        </div>
                        <div className="w-2/12 ml-auto">
                            <div className="truncate">
                                <Label
                                    variant={"bold"}
                                    className="flex items-center gap-1"
                                >
                                    Members: {memberCount}
                                </Label>
                            </div>
                        </div>
                        <div className="w-2/12">
                            <div className="truncate">
                                <Label
                                    variant={"bold"}
                                    className="flex items-center gap-1"
                                >
                                    Role: {userRole}
                                </Label>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
