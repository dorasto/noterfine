import { auth } from "@/app/lib/auth";
import { authClient } from "@/app/lib/auth-client";
import { headers } from "next/headers";

export default async function ListUsers() {
    const users = await authClient.admin.listUsers({
        query: {
            searchField: "email",
            searchOperator: "contains",
            searchValue: "@example.com",
            limit: 10,
            offset: 0,
            sortBy: "createdAt",
            sortDirection: "desc",
            filterField: "role",
            filterOperator: "eq",
            filterValue: "admin",
        },
    });
    return (
        <div>
            <h1>Users</h1>
            <pre>{JSON.stringify(users, null, 2)}</pre>
        </div>
    );
}
