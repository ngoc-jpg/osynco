/**
 *
 */

import { experimentalRouter } from "./router/experimental"
import { messagesRouter } from "./router/messages"
import { usersRouter } from "./router/users"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
    users: usersRouter,

    experimental: experimentalRouter,

    messages: messagesRouter
})

/**
 * The tRPC router.
 */
export type AppRouter = typeof appRouter
