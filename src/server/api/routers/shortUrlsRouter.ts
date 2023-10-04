import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { deleteUrlSchema, insertUrlSchema, shortUrls } from "~/server/db/schema/schema";
import { asc, eq } from "drizzle-orm";

export const shortUrlsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.shortUrls.findMany({
      orderBy: [asc(shortUrls.createdAt)],
    });
  }),

  add: publicProcedure.input(insertUrlSchema).mutation(async ({ ctx, input }) => {
    return ctx.db.insert(shortUrls).values(input);
  }),

  delete: publicProcedure.input(deleteUrlSchema).mutation(({ ctx, input }) => {
    return ctx.db.delete(shortUrls).where(eq(shortUrls.uid, input.uid));
  }),
});
