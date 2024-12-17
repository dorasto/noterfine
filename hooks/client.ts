"use client";
import { getOrganization } from "@/app/actions/organization";
import { useEffect, useState } from "react";
import { FullOrganization } from "@/types/user";

export function getActiveOrganization() {
    const [activeOrganization, setActiveOrganization] =
        useState<FullOrganization | null>(null);
    useEffect(() => {
        const test = getOrganization();
        test.then((res: any) => {
            setActiveOrganization(res);
        });
        return () => {
            setActiveOrganization(null);
        };
    }, []);
    return activeOrganization;
}
