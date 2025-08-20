import type { TRPCRouterRecord } from "@trpc/server"
import { z } from "zod"

import { count, desc, eq } from "@osynco/db"
import { creatableMessageSchema, messages } from "@osynco/db/schema"

import { publicProcedure } from "../trpc"

export const messagesRouter = {
    all: publicProcedure.input(z.object({ userId: z.string() })).query(async ({ ctx, input }) => {
        return await ctx.db.query.messages.findMany({
            where: eq(messages.userId, input.userId),
            orderBy: desc(messages.createdAt),
            limit: 25
        })
    }),

    count: publicProcedure.input(z.object({ userId: z.string() })).query(async ({ ctx, input }) => {
        const result = await ctx.db.select({ count: count() }).from(messages).where(eq(messages.userId, input.userId))

        if (!result[0]?.count) return 0

        return result[0].count
    }),

    byId: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
        return ctx.db.query.messages.findFirst({
            where: eq(messages.id, input.id)
        })
    }),

    /**
     * @todo [P0] Make protected once auth is implemented.
     */
    create: publicProcedure.input(creatableMessageSchema).mutation(({ ctx, input }) => {
        return ctx.db.insert(messages).values(input)
    }),

    /**
     * @todo [P0] Make protected once auth is implemented.
     */
    delete: publicProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
        return ctx.db.delete(messages).where(eq(messages.id, input.id))
    })
} satisfies TRPCRouterRecord
