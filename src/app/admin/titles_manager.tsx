"use client";
import React from "react";
import { useState, useEffect } from "react";
import PlusIcon from "../components/plus_icon";
import { title } from "process";
function TitlesManager() {
  const [titles, setTitles] = useState<{ title: string; content: string }[]>(
    []
  );

  useEffect(() => {
    // Fetch titles from an API or database if needed
    // For now, we are using static data imported above
    const fetchTitles = async () => {
      try {
        const response = await fetch(
          "/api/getDatas?filepath=datas/home_text_th.json"
        );
        if (!response.ok) throw new Error("Failed to fetch titles");
        const data = await response.json();
        setTitles(data);
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    };
    fetchTitles();
  }, []);

  const handleAddTitle = () => {
    const newTitle = prompt("Enter a new title:");
    const newContent = prompt("Enter a content") || "- nothing -";
    if (newTitle) {
      setTitles([...titles, { title: newTitle, content: newContent }]);
    }
  };
  const handleEditTitle = (index: number) => {
    const newTitle = prompt("Edit the title:", titles[index].title);
    const newContent =
      prompt("Edit the Content:", titles[index].title) || titles[index].content;
    if (newTitle) {
      const updatedTitles = titles.map((title, i) =>
        i === index ? { title: newTitle, content: newContent } : title
      );
      setTitles(updatedTitles);
    }
  };
  const handleRemoveTitle = (index: number) => {
    const updatedTitles = titles.filter((_, i) => i !== index);
    setTitles(updatedTitles);
  };
  const handleSaveTitles = () => {
    fetch("/api/saveData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _filepath: "datas",
        fileName: "home_text_th.json",
        data: titles,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save titles");
        alert("Titles saved successfully!");
      })
      .catch((err) => {
        alert("Error saving titles: " + err.message);
      });
  };
  return (
    <div className="text-gray-200/80 border-white/50 border p-10 rounded-xl text-center w-full flex flex-col items-center justify-center mt-10">
      <h1>Manage Titles</h1>
      <span className="font-regular italic text-xl my-2">
        Add or edit titles for your feeds.
      </span>
      <button className="cta-b mt-5" onClick={handleAddTitle}>
        Add Title
      </button>
      <ul className="mt-5 text-left w-full border-white/25 border-4 px-10 max-h-[400px] overflow-y-scroll scroll-smooth scroll-p-6">
        {titles.map((title, index) => (
          <li
            key={index}
            className="my-2 border-b-1 border-white/50 overflow-hidden"
          >
            {title.title.length > 20
              ? `${title.title.slice(0, 20)}...`
              : title.title}

            {/* function button */}
            <div className="inline-flex float-right flex-col justify-end items-center">
              {/* edit */}
              <button
                className="ml-2 text-gray-400 hover:text-blue-500"
                onClick={() => {
                  handleEditTitle(index);
                }}
              >
                <div className="group inline">
                  <PlusIcon className="inline" />
                  <span className="ml-1 absolute opacity-0 group-hover:opacity-100">
                    edit
                  </span>
                </div>
              </button>
              {/* remove */}
              <button
                className="ml-2 text-gray-400 hover:text-red-500"
                onClick={() => {
                  handleRemoveTitle(index);
                }}
              >
                <div className="group inline">
                  <PlusIcon className="inline rotate-45" />
                  <span className="ml-1 absolute opacity-0 group-hover:opacity-100">
                    remove
                  </span>
                </div>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* save changes button */}
      <button className="cta-b mt-5" onClick={handleSaveTitles}>
        Save Changes
      </button>
    </div>
  );
}
export default TitlesManager;
