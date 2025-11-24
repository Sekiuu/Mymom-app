import { PostRecord } from "../../lib/schemas";

export type FeedItem = PostRecord & {
  username?: string;
  user_id?: string;
};

