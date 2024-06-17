import Modal from "../../components/ui/Modal.tsx";
import Image from "apps/website/components/Image.tsx";
import Button from "../../components/ui/Button.tsx";
import Toastify from "toastify";

import { invoke } from "../../runtime.ts";
import { useSignal } from "@preact/signals";
import { sendEvent } from "../../sdk/analytics.tsx";

interface Props {
  image: string;
  title: string;
  productID: string;
}

export default function ProductReview({
  image = "",
  title = "",
  productID = "0",
}: Props) {
  const comment = useSignal<string>("");
  const displayModal = useSignal(false);

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    try {
      await invoke.site.actions.likes({ productID, comment: comment.value });

      Toastify({
        text: "Comment saved successfully.",
        close: true,
        gravity: "bottom",
        duration: 5000,
        position: "center",
        stopOnFocus: true,
        style: {
          background: "#27ae60",
        },
      }).showToast();

      sendEvent({
        name: "post_score",
        params: {
          score: 1,
        },
      });

      displayModal.value = false;
    } catch (err) {
      console.error("error:", err);

      Toastify({
        text: "There was an error. Please try again later.",
        close: true,
        gravity: "bottom",
        duration: 5000,
        position: "center",
        stopOnFocus: true,
        style: {
          background: "#c0392b",
        },
      }).showToast();

      displayModal.value = false;
    }
  };

  return (
    <>
      <button
        class="btn btn-primary mt-5"
        onClick={() => displayModal.value = true}
      >
        Save
      </button>
      {displayModal.value && (
        <Modal loading="lazy" open>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-bordered bg-black p-7 border border-white rounded-md">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-start gap-3"
            >
              <Image
                alt={title}
                src={image}
                class="rounded"
                width={150}
                height={150}
              />
              <div>
                <h2 class="text-lg font-bold text-white">{title}</h2>
                <label className="form-control mb-3 w-64">
                  <div className="label">
                    <span className="label-text text-white">Comments</span>
                  </div>
                  <textarea
                    onInput={(event) => {
                      comment.value = (event.target as HTMLInputElement).value;
                    }}
                    value={comment.value}
                    required
                    className="h-24 text-white bg-black border border-white rounded-md"
                    minLength={5}
                    placeholder="Your text here"
                  />
                </label>
                <div class="flex justify-end gap-3">
                  <Button onClick={() => displayModal.value = false}>
                    Cancel
                  </Button>
                  <Button type="submit">Publish</Button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
