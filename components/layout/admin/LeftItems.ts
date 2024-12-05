import * as tabler from "@tabler/icons-react";

export function LeftItemsArray() {
    return [
        {
            title: "Dashboard",
            items: [
                {
                    title: "Dashboard",
                    icon: tabler.IconHome,
                    href: "/admin",
                },
                {
                    title: "Organizations",
                    icon: tabler.IconBuildingCommunity,
                    href: "/admin/organizations",
                },
            ],
        },
    ];
}

export function SiteAdminItemsArray() {
    return [
        {
            title: "Site Admin",
            items: [
                {
                    title: "Home",
                    icon: tabler.IconHome,
                    href: "/admin/site-admin",
                },
                {
                    title: "Users",
                    icon: tabler.IconUsers,
                    href: "/admin/site-admin/users",
                },
                {
                    title: "Email Templates",
                    icon: tabler.IconMail,
                    href: "/admin/site-admin/emails",
                },
            ],
        },
    ];
}
