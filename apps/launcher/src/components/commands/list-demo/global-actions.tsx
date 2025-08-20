/**
 *
 */

import { Action, ActionPanel, Icon } from "@raycast/api"

import { Message } from "@osynco/db/schema"

export function GlobalActions({
    message,
    refreshMessages,
    deleteMessage,
    isShowingDetail,
    toggleDetail
}: {
    message: Message
    refreshMessages: () => Promise<unknown>
    deleteMessage: (message: Message) => void
    isShowingDetail: boolean
    toggleDetail: () => void
}) {
    return (
        <ActionPanel>
            <ActionPanel.Section title="View">
                <Action
                    title={isShowingDetail ? "Hide Inspector" : "Inspect"}
                    icon={isShowingDetail ? Icon.EyeDisabled : Icon.Eye}
                    shortcut={{ modifiers: ["cmd"], key: "i" }}
                    onAction={toggleDetail}
                />
            </ActionPanel.Section>

            <ActionPanel.Section title="Modify">
                <Action
                    title="Refresh"
                    icon={Icon.RotateClockwise}
                    shortcut={{ modifiers: ["cmd"], key: "r" }}
                    onAction={refreshMessages}
                />
                <Action
                    title="Delete"
                    icon={Icon.Trash}
                    style={Action.Style.Destructive}
                    shortcut={{ modifiers: ["cmd"], key: "backspace" }}
                    onAction={() => deleteMessage(message)}
                />
            </ActionPanel.Section>
        </ActionPanel>
    )
}
