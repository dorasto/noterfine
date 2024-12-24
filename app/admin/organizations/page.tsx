import { UserOrganizations } from "@/components/user/organizations";
import { CreateOrg } from "@/components/user/CreateOrg";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import "dotenv/config";
import { getSession } from "@/hooks/server";
import PageWrapper from "@/components/layout/PageWrapper";

export default async function Home() {
    const session = await getSession();

    return (
        <PageWrapper>
            <div className="flex flex-col gap-6">
                <UserOrganizations />
                <Separator />
                {session?.user.accountType === "pro" ||
                // TODO: Create license key check
                process.env.NOTERFINE_LICENSE_KEY !== undefined ? (
                    <CreateOrg />
                ) : (
                    <>
                        <div className="bg-background/10 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm rounded-xl border">
                            <Label variant={"heading"}>Upgrade</Label>
                        </div>
                        <CreateOrg disabled />
                    </>
                )}
            </div>
        </PageWrapper>
    );
}
