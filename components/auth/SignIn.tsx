"use client";
import { authClient } from "@/app/lib/auth-client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SignIn() {
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
                    //redirect to the dashboard
                },
                onError: (ctx) => {
                    alert(ctx.error.message);
                },
            }
        );
    };

    return (
        <div className="flex flex-col gap-4">
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
        </div>
    );
}
