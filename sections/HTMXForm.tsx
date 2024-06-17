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
  req: Request,
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
};

export default function HTMXForm({
  reminders = [],
}: SectionProps<typeof loader>) {
  console.log("reminders", reminders);

  return (
    <>
      <form
        class="container bg-black"
        hx-on="htmx:beforeRequest: disableForm, htmx:afterRequest: enableForm"
        hx-post={useSection({
          props: {
            reminders,
          },
        })}
        hx-swap="outerHTML"
        hx-target="closest section"
        hx-indicator="#submitButton"
      >
        <div class="md:p-10">
          <label class="form-control">
            <div class="label">
              <span class="label-text text-white">Reminder:</span>
            </div>
            <textarea
              name="reminder"
              class="reminder textarea textarea-bordered h-24 max-w-400"
              required
              minLength={5}
              placeholder="Write a Reminder"
            />
          </label>
          <button
            id="submitButton"
            class="btn mt-2"
            type="submit"
          >
            Add Reminder
          </button>
        </div>
      </form>
      <div className="container">
        <ul className="flex md:flex-col gap-2 my-3" id="reminders">
          {reminders.map((reminder, index) => (
            <li className="bg-gray-100 rounded p-3" key={index}>
              {reminder}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
