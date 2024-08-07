import { useSection } from "deco/hooks/useSection.ts";

import type { SectionProps } from "deco/types.ts";

export interface Props {
    /**
     * @hide
     */
    reminders: string[];
}

export const loader = async (
    props: Props,
    req: Request
) => {
    const contentType = req.headers.get("content-type");

    if (contentType !== "application/x-www-form-urlencoded") {
        return props;
    }

    const {
        reminders = [],
    } = props;

    const form = await req.formData();

    const reminder = form.get("reminder")?.toString();

    if (reminder) reminders.push(reminder);

    return { reminders };
}

export default function HTMXForm({
    reminders = []
}: SectionProps<typeof loader>) {
    return (
        <>
            <form 
                class="container bg-black md:p-10"
                hx-on="htmx:beforeRequest: disableForm, htmx:afterRequest: enableForm"
                hx-post={useSection({
                    props: {
                        reminders,
                    }
                })}
                hx-swap="outerHTML"
                hx-target="closest section"
                hx-indicator="#submitButton"
            >
                <label class="form-control ">
                    <div class="label">
                        <span class="label-text text-white">Reminder:</span>
                    </div>
                    <textarea 
                        name="reminder"
                        class="reminder textarea textarea-bordered h-24" 
                        required
                        minLength={5}
                        placeholder="Write a reminder"
                    />
                </label>
                <button 
                    id="submitButton"
                    class="btn mt-2"
                    type="submit"
                >
                    add reminder
                </button>
            </form>
            <div class="container">
                <ul class="flex flex-col gap-2 my-3" id="reminders">
                    {
                        reminders.map(reminder => (
                            <li class="bg-gray-100 rounded p-3" key={reminder}>
                                <span>{reminder.length}</span>
                                {reminder}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}