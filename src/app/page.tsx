"use client";
import React, { useEffect, useState, useMemo, use } from "react";
import Arrow from "./components/arrow";
export default function Home() {
  const [randomText, setRandomText] = useState({ title: "", content: "" });
  const [lang, setLang] = useState("");
  // Get language from localStorage if available
  const storedLang = localStorage.getItem("selectedLang");
  useMemo(() => {
    if (storedLang) {
      setLang(storedLang);
    }
  }, [storedLang]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/api/getDatas?filepath=datas/home_text_th.json"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        console.log(data);
        setRandomText(data[Math.floor(Math.random() * data.length)]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
          <h3 className="w-fit text-gray-100">
            {lang == "th" ? "เกิดอะไรขึ้นบ้าง?" : "What happen today?"}
          </h3>
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
