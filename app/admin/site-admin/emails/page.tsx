import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import ListUsers from "@/components/administration/users/list";
import CreateUser from "@/components/administration/users/create";
import MagicLinkEmail from "@/components/email/MagicLink";
import { render } from "@react-email/render";
import EmailPreview from "@/components/email/Wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
    const magicLink = await render(<MagicLinkEmail />, {
        pretty: true,
    });
    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="">Magic Link</CardTitle>
                </CardHeader>
                <CardContent>
                    <EmailPreview html={magicLink} />
                </CardContent>
            </Card>
        </div>
    );
}
