"use client";
import { authClient } from "@/app/lib/auth-client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";

export default function MagicLink() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isSent, setIsSent] = useState(false);

    const sendMagicLink = async () => {
        const { data, error } = await authClient.signIn.magicLink(
            {
                email,
                callbackURL: "/admin",
            },
            {
                onRequest: (ctx) => {
                    // Loading state
                },
                onSuccess: (ctx) => {
                    setIsSent(true);
                    router.push("/admin");
                },
                onError: (ctx) => {
                    alert(ctx.error.message);
                },
            }
        );
    };

    return (
        <div className="flex flex-col gap-4">
            {!isSent ? (
                <div className="flex items-center gap-0 border-2 border-border/50 transition-all duration-300 focus-within:border-primary rounded-lg ease-in-out">
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@email.com"
                        className="rounded-r-none"
                    />
                    <Button className="rounded-l-none" onClick={sendMagicLink}>
                        Send Magic Link
                    </Button>
                </div>
            ) : (
                <Label variant={"headingLarge"}>
                    Magic link sent! Check your email.
                </Label>
            )}
        </div>
    );
}
