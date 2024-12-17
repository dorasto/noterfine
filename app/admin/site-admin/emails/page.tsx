import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import EmailPreview from "@/components/email/Wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/hooks/server";
export default async function Home() {
    const session = await getSession();

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="">Magic Link</CardTitle>
                </CardHeader>
                <CardContent>
                    <EmailPreview html={`<h1>Hello World</h1>`} />
                </CardContent>
            </Card>
        </div>
    );
}
