// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { text, pgTableCreator, timestamp, varchar, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgTable = pgTableCreator((name) => `tools_${name}`);

export const shortUrls = pgTable("link", {
  uid: uuid("uid").defaultRandom().unique().notNull(),
  code: varchar("code", { length: 5 }).notNull().unique(),
  url: text("url").notNull(),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});


// Schema for inserting a Url - can be used to validate API requests
export const insertUrlSchema = createInsertSchema(shortUrls).omit({ uid: true });
 
// // Schema for selecting a Url - can be used to validate API responses
export const selectUrlSchema = createSelectSchema(shortUrls, {
  uid: (schema) => schema.uid.optional(),
  code: (schema) => schema.code.optional(),
}).pick({uid: true, code: true});


 
// // Schema for updating a Url - can be used to validate API requests
export const updateUrlSchema = createInsertSchema(shortUrls).pick({ url: true });

// // Schema for deleting a Url - can be used to validate API requests
export const deleteUrlSchema = createSelectSchema(shortUrls).pick({ uid: true });