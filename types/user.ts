import { type InferSelectModel } from "drizzle-orm";
import { user } from "@/app/db/schema/auth-schema";

export type User = InferSelectModel<typeof user>;
