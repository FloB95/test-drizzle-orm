import { createTRPCRouter } from "~/server/api/trpc";
import { shortUrlsRouter } from "./routers/shortUrlsRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  shortUrls: shortUrlsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
