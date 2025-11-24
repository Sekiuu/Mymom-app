import React from "react";

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
  className?: string;
};

export function ErrorMessage({ message, onRetry, className = "" }: ErrorMessageProps) {
  return (
    <div className={`rounded-2xl border border-rose-200 bg-rose-50 text-rose-700 p-4 ${className}`}>
      {message}
      {onRetry && (
        <button onClick={onRetry} className="underline ml-2">
          Try again
        </button>
      )}
    </div>
  );
}

