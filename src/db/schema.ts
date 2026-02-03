import { integer, pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    age: integer("age").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export type UserInsert = typeof users.$inferInsert;
