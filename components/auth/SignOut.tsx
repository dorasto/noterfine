"use client";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function SignOut() {
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

    return <Button onClick={handleSignOut}>Sign Out</Button>;
}
