"use client";
import React, { useEffect } from "react";
import TextPost from "./textForm";
import TextView from "./textView";
// import { PostRecord } from "../../lib/schemas";
import { BackButton } from "../components/BackButton";
import { PageHeader } from "../components/PageHeader";
function Admin() {
  const [selectedText, setSelectedText] = React.useState(null);
  const [Reload, setReload] = React.useState(false);
  return (
    <main className="h-fit overflow-hidden">
      <BackButton href="/" />

      <PageHeader title="Admin Page" subtitle="Manage your feeds and settings here." />

      {/* Add admin functionalities here */}
      <div className="flex flex-col md:flex-row justify-start items-start mt-5 bg-black/20 p-5 rounded-lg shadow-lg gap-8 w-4/5 mx-auto">
        <div className="md:w-1/3 w-full">
          <TextPost initial={selectedText || null} onCancel={()=>{
            setSelectedText(null);
            setReload(!Reload);
          }} onSaved={(t)=>setReload(!Reload)} />
        </div>
        <div className="md:w-2/3 w-full">
          <TextView Reload={Reload} onSelect={(t)=> setSelectedText(t)} />
        </div>
      </div>
    </main>
  );
}
export default Admin;
