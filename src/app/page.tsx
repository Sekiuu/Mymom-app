"use client";
import React, { useEffect, useState } from "react";
import Arrow from "./components/arrow";
import { home_text_spacial_th } from "../../public/datas";
export default function Home() {
  const [randomText, setRandomText] = useState({ title: "", content: "" });
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * home_text_spacial_th.length);
    setRandomText(home_text_spacial_th[randomIndex]);
  });

  return (
    <main>
      <div className="text-center">
        {/* quote */}
        <h1> {randomText.title} </h1>
        {/* sub text */}
        <span>
          <h2 className="my-2">{randomText.content}</h2>
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
