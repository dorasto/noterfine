"use client";
import { authClient } from "@/app/lib/auth-client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    banned: boolean;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default function ListUsers() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await authClient.admin.listUsers({
                query: {
                    limit: 10,
                },
            });
            setUsers(response?.data?.users as User[]);
        };
        fetchUsers();
    }, []);

    return (
        <Table>
            <TableCaption>List of System Users</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">
                            {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                            <span
                                className={`px-2 py-1 rounded-full text-sm ${
                                    user.banned
                                        ? "bg-red-100 text-red-800"
                                        : "bg-green-100 text-green-800"
                                }`}
                            >
                                {user.banned ? "Banned" : "Active"}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span
                                className={`px-2 py-1 rounded-full text-sm ${
                                    user.emailVerified
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-yellow-100 text-yellow-800"
                                }`}
                            >
                                {user.emailVerified ? "Verified" : "Pending"}
                            </span>
                        </TableCell>
                        <TableCell>
                            {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                            {new Date(user.updatedAt).toLocaleDateString()}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
