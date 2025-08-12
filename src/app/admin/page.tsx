import React from "react";
import Arrow from "../components/arrow";
import FeedPost from "./feed_post";
import TitlesManager from "./titles_manager";
function Admin() {
  return (
    <main className="h-fit overflow-hidden">
      <header className="md:fixed flex max-md:order-last md:top-10 md:left-10 max-md:left-5">
        <a
          href="/"
          className="flex items-center transform hover:scale-110 max-md:hover:scale-100 duration-500 shadow-lg rounded-full p-2 bg-white/50 text-black px-5 max-md:scale-75 z-20"
        >
          <Arrow size="2em" />
          <h3 className="ml-2">Back</h3>
        </a>
      </header>

      <h1>Admin Page</h1>
      <span className="font-bold text-2xl my-2 border-b-4 border-gray-200/80 pb-2 w-4/5 text-center mx-auto">
        Manage your feeds and settings here.
      </span>

      {/* Add admin functionalities here */}
      <div className="flex justify-start items-start mt-5 bg-black/20 p-5 rounded-lg shadow-lg gap-5">
        <FeedPost />
        <TitlesManager />
      </div>
    </main>
  );
}
export default Admin;
