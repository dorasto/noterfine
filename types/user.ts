import { type InferSelectModel } from "drizzle-orm";
import { organization, user } from "@/app/db/schema/auth-schema";

export type User = InferSelectModel<typeof user>;
export type Organization = InferSelectModel<typeof organization>;
