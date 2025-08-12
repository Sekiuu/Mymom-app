import React from "react";
import PlusIcon from "../components/plus_icon";
function FeedPost() {
  return (
    <div className="text-gray-200/80 border-white/50 border p-10 rounded-xl text-center w-full flex flex-col items-center justify-center mt-10">
      <h1>Post a new feed</h1>
      {/* Add form or functionality to post a new feed */}
      <span className="font-regular italic text-xl my-2">
        Use the button below to add a new feed.
      </span>
      <button className="cta-b mt-5">
        <PlusIcon className="inline mr-2" />
        Add Feed
      </button>
    </div>
  );
}

export default FeedPost;
