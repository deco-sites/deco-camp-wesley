import { FnContext } from "deco/mod.ts";

export interface Props {
  productId: string;
  comment: string;
}

export default async function sendVote(
  props: Props,
  _req: Request,
  _ctx: FnContext,
) {
  const response = await fetch("https://camp-api.deco.cx/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "wesley",
    },
    body: JSON.stringify({
      "productId": props.productId,
      "coment": props.comment,
    }),
  });

  if (response.ok) {
    return { status: "ok" };
  } else {
    return { status: "failure" };
  }
}
