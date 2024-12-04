"use client";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import * as tabler from "@tabler/icons-react";

interface Props {
    sideNav?: boolean;
}
export default function SignOut({ sideNav }: Props) {
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onRequest: (ctx) => {
                    // handle loading state
                },
                onSuccess: () => {
                    router.push("/login");
                },
                onError: (ctx) => {
                    alert(ctx.error.message);
                },
            },
        });
    };

    if (sideNav) {
        return (
            <SidebarMenuItem onClick={handleSignOut}>
                <SidebarMenuButton className="text-nowrap">
                    <tabler.IconLogout />
                    Sign Out
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    }
    return <Button onClick={handleSignOut}>Sign Out</Button>;
}
