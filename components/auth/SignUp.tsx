"use client";
import { authClient } from "@/app/lib/auth-client"; //import the auth client
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const signUp = async () => {
        const { data, error } = await authClient.signUp.email(
            {
                email,
                password,
                name,
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
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
            />
            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@email.com"
            />
            <Button onClick={signUp}>Sign Up</Button>
        </div>
    );
}
