import React from "react";
import Arrow from "./components/arrow";
export default function Home() {
  return (
    <main>
      <div className="text-center">
        {/* quote */}
        <h1> Happy Mother's Day </h1>
        {/* sub text */}
        <span>
          <h2 className="my-2">
            Happy every day, happy every times. I hope you love this gift.
          </h2>
        </span>
        <a
          className="cta-a my-10 flex mx-auto group text-[150%]"
          href="/feeder"
        >
          <h3 className="w-fit text-gray-100">Feed me with your love.</h3>
          {/* right arrow */}
          <Arrow
            right={true}
            size={"1.5em"}
            style={"transform duration-300 group-hover:translate-x-2"}
          />
        </a>
      </div>
      {/* feature cards */}
      <div className="flex mt-10 max-md:flex-col max-md:space-y-10 max-md:text-left mx-auto w-3/5 justify-around items-center">
        <span className={"card"}>📲 mobile friendly </span>
        <span className={"card"}>💻 responsive </span>
        <span className={"card"}>🕶 easy to use </span>
      </div>
    </main>
  );
}
