import { feed_spacial } from "../../../../public/datas.js";

export async function GET() {
  try {
    return Response.json(feed_spacial);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
