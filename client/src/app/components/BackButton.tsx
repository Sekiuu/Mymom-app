import React from "react";
import Link from "next/link";
import Arrow from "./ui/arrow";

type BackButtonProps = {
  href?: string;
  label?: string;
  className?: string;
};

export function BackButton({ href = "/", label = "Back", className = "" }: BackButtonProps) {
  return (
    <header className={`md:fixed flex max-md:order-last md:top-10 md:left-10 max-md:left-5 ${className}`}>
      <Link
        href={href}
        className="flex items-center transform hover:scale-110 max-md:hover:scale-100 duration-500 shadow-lg rounded-full p-2 bg-white/50 text-black px-5 max-md:scale-75 z-20"
      >
        <Arrow size="2em" />
        <h3 className="ml-2">{label}</h3>
      </Link>
    </header>
  );
}

