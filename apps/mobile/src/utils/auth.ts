/**
 *
 */

import { useRouter } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { expoClient } from "@better-auth/expo/client"
import { useQueryClient } from "@tanstack/react-query"
import { createAuthClient } from "better-auth/react"

import { BASE_URL } from "~/constants"

const _authClient = createAuthClient({
    baseURL: `${BASE_URL}/api/auth`,
    plugins: [
        expoClient({
            scheme: "osynco",
            storagePrefix: "osynco",
            storage: SecureStore
        })
    ]
})

const useSignIn = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return async <SignInResult>(signInMethod: (options: typeof _authClient.signIn) => Promise<SignInResult>) => {
        try {
            const result = await signInMethod(_authClient.signIn)

            await queryClient.invalidateQueries()
            router.replace("/")

            return result
        } catch (error) {
            console.error("Sign in failed:", error)

            throw error
        }
    }
}

export const useSignOut = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return async () => {
        try {
            const result = await _authClient.signOut()

            await queryClient.invalidateQueries()
            router.replace("/")

            return result
        } catch (error) {
            console.error("Sign out failed:", error)

            throw error
        }
    }
}

export const authClient = {
    ..._authClient,

    /**
     * @deprecated Use `useSignIn` instead.
     */
    signIn: _authClient.signIn,

    /**
     * @deprecated Use `useSignOut` instead.
     */
    signOut: _authClient.signOut,

    useSession: _authClient.useSession,

    useSignIn,
    useSignOut
}
