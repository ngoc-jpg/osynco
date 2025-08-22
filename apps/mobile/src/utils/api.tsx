/**
 *
 */

import { QueryClient } from "@tanstack/react-query"
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client"
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"
import superjson from "superjson"

import type { AppRouter } from "@osynco/api"

import { BASE_URL } from "~/constants"
import { authClient } from "./auth"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {}
    }
})

/**
 * A set of type-safe hooks for consuming your API.
 */
export const trpc = createTRPCOptionsProxy<AppRouter>({
    client: createTRPCClient({
        links: [
            loggerLink({
                enabled: opts =>
                    process.env.NODE_ENV === "development" || (opts.direction === "down" && opts.result instanceof Error),
                colorMode: "ansi"
            }),
            httpBatchLink({
                transformer: superjson,
                url: `${BASE_URL}/api/trpc`,
                headers() {
                    const headers = new Map<string, string>()
                    headers.set("x-trpc-source", "expo-react")
                    const cookies = authClient.getCookie()

                    if (cookies) headers.set("Cookie", cookies)

                    return Object.fromEntries(headers)
                }
            })
        ]
    }),
    queryClient
})

export { type RouterInputs, type RouterOutputs } from "@osynco/api"
