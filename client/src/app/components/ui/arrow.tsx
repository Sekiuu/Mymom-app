import React from "react";
function Arrow({
  right,
  size,
  autoSize,
  style,
}: {
  right?: boolean;
  size: string;
  autoSize?: boolean;
  style?: string;
}) {
  const svgStyle = autoSize
    ? {
        transform: right ? "rotate(0deg)" : "rotate(180deg)",
        width: "100%",
        height: "100%",
      }
    : { transform: right ? "rotate(0deg)" : "rotate(180deg)" };

  return (
    <div style={{ width: size, height: size }} className={style + " w-fit"}>
      <svg
        width={autoSize ? "100%" : size}
        height={autoSize ? "100%" : size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={svgStyle}
      >
        <path
          d="M5 12H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 5L19 12L12 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
export default Arrow;
