import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import SignUp from "./SignUp";

export async function AuthenticationScreen() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        return (
            <div>
                <SignUp />
            </div>
        );
    }
    return (
        <div>
            <h1>Welcome {session.user.name}</h1>
        </div>
    );
}
