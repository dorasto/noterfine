"use client";
import { authClient } from "@/app/lib/auth-client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        const { data, error } = await authClient.signIn.email(
            {
                email,
                password,
            },
            {
                onRequest: (ctx) => {
                    //show loading
                },
                onSuccess: (ctx) => {
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
            <Label variant={"headingLarge"}>Log in</Label>
            <div className="flex flex-col gap-1">
                <Label variant={"bold"}>Welcome back! 👋</Label>
                <Label>Sign in with your preferred method below</Label>
            </div>
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@email.com"
            />
            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <Button onClick={signIn}>Sign In</Button>
            <Separator />
            <Label variant={"small"}>
                Don't have an account yet?{" "}
                <Link className="text-primary" href={"/auth/signup"}>
                    Create your account
                </Link>
            </Label>
        </div>
    );
}
