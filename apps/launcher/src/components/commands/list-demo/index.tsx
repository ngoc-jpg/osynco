/**
 *
 */

import { useState } from "react"
import { getPreferenceValues, Icon, List } from "@raycast/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { trpc } from "../../../lib/networking/rpc/client"
import { prettifyDate } from "../../../utils"
import { withContext } from "../../ui/headless/context-providers"
import { GlobalActions } from "./global-actions"
import { createMessageDeletionMutationOptions, getAllMessagesQueryOptions } from "./query-helpers"

/**
 * @todo [P1] Replace when auth is implemented.
 */
const { "user-id": userId }: { "user-id": string } = getPreferenceValues()

export default function ListDemo() {
    return withContext(<_ListDemo />)
}

function _ListDemo() {
    const queryClient = useQueryClient()
    const [isShowingDetail, setIsShowingDetail] = useState(false)

    const { data: messages, ...messagesQuery } = useQuery(getAllMessagesQueryOptions({ userId }))
    const { data: messageCount } = useQuery(trpc.messages.count.queryOptions({ userId }))
    const deleteMessage = useMutation(createMessageDeletionMutationOptions({ client: queryClient, userId }))

    const isActive = messagesQuery.isFetching || deleteMessage.isPending
    const toggleDetail = () => setIsShowingDetail(!isShowingDetail)
    const navigationTitle = messageCount ? `${messageCount} Messages` : undefined

    return (
        <List isLoading={isActive} navigationTitle={navigationTitle} isShowingDetail={isShowingDetail}>
            {messages?.length ? (
                messages.map(message => (
                    <List.Item
                        key={message.id}
                        title={`${message.content}`}
                        detail={
                            <List.Item.Detail
                                markdown={message.content}
                                metadata={
                                    <List.Item.Detail.Metadata>
                                        <List.Item.Detail.Metadata.Label
                                            title="Created"
                                            text={prettifyDate(message.createdAt)}
                                        />
                                    </List.Item.Detail.Metadata>
                                }
                            />
                        }
                        actions={
                            <GlobalActions
                                message={message}
                                refreshMessages={messagesQuery.refetch}
                                deleteMessage={deleteMessage.mutate}
                                isShowingDetail={isShowingDetail}
                                toggleDetail={toggleDetail}
                            />
                        }
                        accessories={[
                            {
                                date: message.createdAt
                            }
                        ]}
                    />
                ))
            ) : (
                <List.EmptyView title="No messages yet." icon={Icon.Message} />
            )}
        </List>
    )
}
