import { pgTable, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { user, organization } from "./auth-schema";

export const collection = pgTable("collection", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    isDomain: boolean("isDomain").default(false).notNull(),
    url: text("url"),
    isPublic: boolean("isPublic").default(false).notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    userId: text("userId").references(() => user.id),
    organizationId: text("organizationId").references(() => organization.id),
});

export const collectionItem = pgTable("collection_item", {
    id: text("id").primaryKey(),
    collectionId: text("collectionId")
        .references(() => collection.id)
        .notNull(),
    title: text("title").notNull(),
    content: jsonb("content"), // Using jsonb to store BlockNote's JSON structure
    order: text("order"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    createdById: text("createdById")
        .references(() => user.id)
        .notNull(),
});
