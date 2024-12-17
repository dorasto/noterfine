import ListUsers from "@/components/administration/users/list";
import CreateUser from "@/components/administration/users/create";
import { getSession } from "@/hooks/server";

export default async function Home() {
    const session = await getSession();

    return (
        <div>
            <ListUsers />
            <CreateUser />
        </div>
    );
}
