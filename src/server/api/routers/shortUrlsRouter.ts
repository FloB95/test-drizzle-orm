import { z } from "zod";
import { faker } from "@faker-js/faker";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { deleteUrlSchema, insertUrlSchema, selectUrlSchema, shortUrls } from "~/server/db/schema/schema";
import { eq } from "drizzle-orm";

export const shortUrlsRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.shortUrls.findMany();
  }),

  add: publicProcedure.input(z.object({})).mutation(({ ctx }) => {
    type NewShortUrl = typeof shortUrls.$inferInsert;

    const newShortUrl: NewShortUrl = {
      // uid: "sasdsdasaddsadsaasddsas",
      code: faker.string.alphanumeric({
        length: 5,
      }),
      url: faker.internet.url(),
      createdBy: faker.string.uuid(),
    };

    const d = insertUrlSchema.parse(newShortUrl);
    return ctx.db.insert(shortUrls).values(d);
  }),

  delete: publicProcedure
    .input(deleteUrlSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(shortUrls).where(eq(shortUrls.uid, input.uid));
    }),
});
