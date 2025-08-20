/**
 *
 */

import type { QueryClient } from "@tanstack/react-query"
import { showToast, Toast } from "@raycast/api"

import type { RouterOutputs } from "../../../lib/networking/rpc/client"
import { trpc } from "../../../lib/networking/rpc/client"

export const getAllMessagesQueryOptions = ({ userId }: { userId: string }) => trpc.messages.all.queryOptions({ userId })

export const createMessageDeletionMutationOptions = ({ client, userId }: { client: QueryClient; userId: string }) => {
    const queryKey = getAllMessagesQueryOptions({ userId }).queryKey

    return trpc.messages.delete.mutationOptions({
        /**
         * @todo [P3] There might be a newer way to do optimistic updates.
         */
        onMutate: async messageToDelete => {
            await client.cancelQueries({ queryKey })
            const messagesBeforeUpdate = client.getQueryData(queryKey)

            client.setQueryData(queryKey, (stale?: RouterOutputs["messages"]["all"]) =>
                stale?.filter(message => message.id !== messageToDelete.id)
            )

            return { messagesBeforeUpdate }
        },

        onError: (error, _, context) => {
            if (context?.messagesBeforeUpdate) client.setQueryData(queryKey, context.messagesBeforeUpdate)

            showToast({ style: Toast.Style.Failure, title: "Deletion Failed", message: "Failed to delete message." })
            console.error(error)
        },

        onSuccess: async () =>
            await showToast({ style: Toast.Style.Success, title: "Message Deleted", message: "Message deleted successfully." }),
        onSettled: () => client.invalidateQueries({ queryKey })
    })
}
