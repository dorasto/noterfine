import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { Label } from "../ui/label";

interface Props {
    type?: "signin" | "signup";
}

export async function AuthenticationScreen({ type = "signin" }: Props) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        redirect("/admin");
    }

    return (
        <div className="flex items-center h-dvh gap-12 p-12">
            <div className="w-1/2">
                {type === "signin" ? <SignIn /> : <SignUp />}
            </div>

            <div className="w-1/2 bg-secondary h-full rounded-3xl flex flex-col gap-12 min-h-full items-center place-content-center">
                <Label variant={"headingLarge"}>Simplify things</Label>
            </div>
        </div>
    );
}
