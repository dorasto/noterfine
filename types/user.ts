import { type InferSelectModel } from "drizzle-orm";
import { member, organization, user } from "@/app/db/schema/auth-schema";

export type User = InferSelectModel<typeof user>;

export type Organization = InferSelectModel<typeof organization>;
export type Member = InferSelectModel<typeof member>;

export interface FullOrganization extends Organization {
    members: Member[];
    invitations: Array<{
        id: string;
        status: "pending" | "accepted" | "rejected" | "canceled";
        organizationId: string;
        email: string;
        role: string;
        inviterId: string;
    }>;
}
