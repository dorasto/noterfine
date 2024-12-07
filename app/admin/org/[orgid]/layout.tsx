import { redirect } from "next/navigation";

import { headers } from "next/headers";
import { User } from "@/types/user";
import { auth } from "@/app/lib/auth";
export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
    return <>{children}</>;
}
