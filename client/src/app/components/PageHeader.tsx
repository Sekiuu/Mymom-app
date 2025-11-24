import React from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function PageHeader({ title, subtitle, className = "" }: PageHeaderProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h1>{title}</h1>
      {subtitle && (
        <span className="font-bold text-2xl my-2 border-b-4 border-gray-200/80 pb-2 w-4/5 text-center mx-auto block">
          {subtitle}
        </span>
      )}
    </div>
  );
}

