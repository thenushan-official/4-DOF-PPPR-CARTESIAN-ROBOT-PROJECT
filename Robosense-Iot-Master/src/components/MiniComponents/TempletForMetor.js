import React, { useState, useEffect, useRef } from "react";
import HalfCircleProgressBar from "./HalfCircleProgressBar";

export default function TempletForMetor({ item }) {
  const containerRef = useRef(null); // Ref for the div
  const [divWidth, setDivWidth] = useState(99); // State to store the width

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setDivWidth(containerRef.current.offsetWidth); // Update width
      }
    };

    // Update width on initial render
    updateWidth();

    // Add event listener for window resize
    window.addEventListener("resize", updateWidth);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div
      className={` ${
        item.attribute === "Vibration" ? "hidden" : ""
      } w-full my-3  border-[#111525] border-r border-l sm:border-r-2 sm:border-l-2 px-4 overflow-hidden `}
    >
      <div className=" cursor-default w-full text-sm font-thin text-white flex items-center justify-between px-2">
        <p>{item.attribute}</p>
      </div>
      <div
        ref={containerRef}
        className="w-full h-full relative flex items-center justify-center"
      >
        {item.wanningValue < item.value ? (
          <p className=" mx-auto w-8/12 text-center font-semibold text-red-400">
            Something Wrong!..
          </p>
        ) : (
          <HalfCircleProgressBar
            divWidth={divWidth}
            value={item.value}
            maxValue={item.maxValue}
            type={item.attribute}
            alertValue={item.alertValue}
            warningValue={item.warningValue}
          />
        )}
      </div>
    </div>
  );
}
