import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { UserOrganizations } from "@/components/user/organizations";
import { CreateOrg } from "@/components/user/CreateOrg";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/app/lib/auth-client";
import { user } from "@/app/db/schema/auth-schema";
import { Label } from "@/components/ui/label";
import "dotenv/config";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
    return (
        <div className="flex flex-col gap-6">
            <UserOrganizations />
            <Separator />
            {session?.user.accountType === "pro" ||
            // TODO: Create license key check
            process.env.NOTERFINE_LICENSE_KEY !== undefined ? (
                <CreateOrg />
            ) : (
                <div className="relative">
                    <div className="bg-background/10 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm rounded-xl border">
                        <Label variant={"heading"}>Upgrade</Label>
                    </div>
                    <CreateOrg disabled />
                </div>
            )}
        </div>
    );
}
