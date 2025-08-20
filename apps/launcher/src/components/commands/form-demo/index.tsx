/**
 *
 */

import { useState } from "react"
import {
    Action,
    ActionPanel,
    Clipboard,
    closeMainWindow,
    Form,
    getPreferenceValues,
    getSelectedText,
    Icon,
    LaunchProps,
    popToRoot,
    showToast,
    Toast
} from "@raycast/api"
import { useForm } from "@raycast/utils"
import { useMutation } from "@tanstack/react-query"

import { trpc } from "../../../lib/networking/rpc/client"
import { withContext } from "../../ui/headless/context-providers"

/**
 * @todo [P1] Replace when auth is implemented.
 */
const { "user-id": userId } = getPreferenceValues()

interface FormDemoSchema {
    content: string
}

type FormDemoProps = LaunchProps<{ draftValues: FormDemoSchema }>

export default function FormDemo(props: FormDemoProps) {
    return withContext(<_FormDemo {...props} />)
}

function _FormDemo({ draftValues }: FormDemoProps) {
    const [content, setContent] = useState<string | undefined>(draftValues?.content)

    const toast = new Toast({
        style: Toast.Style.Animated,
        title: "Creating Message"
    })

    const createMessage = useMutation(
        trpc.messages.create.mutationOptions({
            onSuccess: async () => {
                toast.style = Toast.Style.Success
                toast.title = "Message Created"
                toast.message = "Your message has been created."

                await popToRoot({ clearSearchBar: true })
            },
            onError: error => {
                toast.style = Toast.Style.Failure
                toast.title = "Error Creating Message"
                toast.message = "Unable to create message."

                if (content) Clipboard.copy(content)
                console.error(error.message)
            }
        })
    )

    const { handleSubmit, itemProps } = useForm<FormDemoSchema>({
        async onSubmit(values) {
            await closeMainWindow()
            await toast.show()

            createMessage.mutate({ userId, content: values.content })
        },

        validation: { content: value => (!value ? "Content is required." : undefined) }
    })

    const insertFromSelection = async () => {
        try {
            const selection = await getSelectedText()

            if (!selection || !selection.length) {
                showToast({ title: "No Text Selected", style: Toast.Style.Failure })
                return
            }

            setContent((content ?? "") + selection)
        } catch (error) {
            showToast({ title: "Unable to Get Selection", style: Toast.Style.Failure })
            console.error(error)
        }
    }

    return (
        <Form
            enableDrafts
            actions={
                <ActionPanel>
                    <Action.SubmitForm onSubmit={handleSubmit} />
                    <ActionPanel.Section title="Import">
                        <Action
                            title={"Insert from Selection"}
                            icon={Icon.TextSelection}
                            onAction={insertFromSelection}
                            shortcut={{ modifiers: ["cmd", "shift"], key: "v" }}
                        />
                    </ActionPanel.Section>
                </ActionPanel>
            }
            isLoading={createMessage.isPending}
        >
            <Form.TextArea
                {...itemProps.content}
                title="Message"
                placeholder="Your message..."
                value={content}
                onChange={setContent}
            />
        </Form>
    )
}
