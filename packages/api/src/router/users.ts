/**
 *
 */

import type { TRPCRouterRecord } from "@trpc/server"
import { z } from "zod"

import { eq } from "@osynco/db"
import { users } from "@osynco/db/schema"

import { publicProcedure } from "../trpc"

export const usersRouter = {
    get: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
        return ctx.db.query.users.findFirst({ where: eq(users.id, input.id) })
    })
} satisfies TRPCRouterRecord
