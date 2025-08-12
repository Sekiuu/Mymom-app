"use client";
import React from "react";
import Arrow from "../components/arrow";
import Image from "next/image";
import { useState, useEffect } from "react";
function Feeder() {
  const [images, setImgs] = useState<{ img: string; text: string }[]>([]);
  const [feed, setRandomImage] = useState({ img: "", text: "" });
  const [shown, setShown] = useState(false);

  const getRandomImage = (imgs: { img: string; text: string }[]) => {
    if (!imgs || imgs.length === 0) return { img: "", text: "" };
    const randomIndex = Math.floor(Math.random() * imgs.length);
    return imgs[randomIndex];
  };
  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await fetch("/api/getFeeds_th");
        const data = await response.json();
        console.log(data);
        setImgs(data);
        setRandomImage(getRandomImage(data));
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };
    fetchRandomImage();
  }, []); // Add empty dependency array to prevent infinite loop
  return (
    <main className="h-fit">
      <header className="md:fixed flex max-md:order-last md:top-10 md:left-10 max-md:left-5">
        <a
          href="/"
          className="flex items-center transfrom hover:scale-110 max-md:hover:scale-100 duration-500 shadow-lg rounded-full p-2 bg-white/50 text-black px-5 max-md:scale-75 z-20"
        >
          <Arrow size="2em" />
          <h3 className="ml-2 max">Back</h3>
        </a>
      </header>

      <div className="text-center mt-10 max-md:order-first">
        {/* promt */}
        <h1>What happen today?</h1>
        {/* content */}
        {feed.text ? (
          <h2
            className={
              "font-bold my-10 transfrom transition-ease-in transition-discrete" +
              (shown
                ? " text-white/80 translate-y-0 duration-500"
                : " text-white/0 translate-y-10 duration-0 ")
            }
          >
            {feed.text}
          </h2>
        ) : (
          ""
        )}
        {/* pictures card*/}

        <div className="flex mx-auto aspect-square md:w-1/2 w-4/5 mt-10">
          {shown ? (
            ""
          ) : (
            //button to show the image
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <button
                className="absolute cta-b z-20"
                onClick={() => {
                  setShown(true);
                }}
              >
                <h2>Tap to see!!</h2>
              </button>
            </div>
          )}
          {/* shown img */}
          {feed.img ? (
            <Image
              src={feed.img}
              alt={feed.text}
              width={500}
              height={500}
              className={
                "object-cover aspect-square rounded-md" +
                (shown ? "" : " blur-lg")
              }
            />
          ) : (
            <h1 className="text-black">Loading...</h1>
          )}
        </div>
      </div>
      {/* button to random other img */}
      <button
        className={
          "cta-a my-10 group duration-300 transition-all" +
          (shown ? " opacity-100" : " opacity-0")
        }
        onClick={() => {
          setShown(false);
          setRandomImage(getRandomImage(images));
        }}
      >
        <span className="flex items-center w-fit mx-auto">
          <h2>see other one!</h2>
          <Arrow
            right
            size="1em"
            style="ml-2 transform group-hover:translate-x-2 group-hover:scale-200 duration-300"
          />
        </span>
        <span className="font-regular italic text-gray-200/80">
          want to see more? cick me!
        </span>
      </button>
    </main>
  );
}
export default Feeder;
