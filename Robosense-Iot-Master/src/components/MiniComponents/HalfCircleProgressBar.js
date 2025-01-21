import React, { useState, useEffect, useRef } from "react";

export default function HalfCircleProgressBar({
  divWidth,
  value,
  maxValue,
  type,
  warningValue,
  alertValue,
}) {
  let componentWidth = (divWidth * 3) / 5;
  let radius = (divWidth * 3) / 5 / 2 - 10;
  const [strokeOffset, setStrokeOffset] = useState(0);
  const [finalValue, setFinalValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullStroke = (componentWidth / 2 - 10) * 2 * Math.PI;
      const calculatedOffset = fullStroke - (fullStroke * value) / 2 / maxValue;

      if (calculatedOffset < 0 || value > maxValue) {
        // If strokeOffset is negative, skip the calculation
        return;
      }

      // If not, update the strokeOffset
      setStrokeOffset(calculatedOffset);
    }, 0);

    // Cleanup timeout
    return () => clearTimeout(timeout);
  }, [value, componentWidth, maxValue]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFinalValue((prevValue) => {
        if (prevValue >= value) {
          clearInterval(interval);
          return prevValue;
        }
        return prevValue + 1;
      });
    }, 2);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [value]);
  return (
    <div
      onClick={() => {
        console.log(radius);
      }}
      className=" relative size-max translate-y-[5%] mb-2 sm:mb-0 "
    >
      <svg
        className="  flex items-center justify-center"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={`${componentWidth}px`}
        height={`${componentWidth}px`}
      >
        <circle
          style={{
            strokeDasharray: (componentWidth / 2 - 10) * 2 * Math.PI,
            strokeDashoffset: (componentWidth / 2 - 10) * Math.PI,
            stroke: "#1f2539",
          }}
          cx={componentWidth / 2}
          cy={componentWidth / 2}
          r={radius}
          strokeLinecap="round"
        />
      </svg>
      <svg
        className=" size-full absolute top-0 left-0 z-10"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <circle
          style={{
            stroke: `${
              value >= warningValue
                ? "red"
                : value > alertValue
                ? "orange"
                : "#637adb"
            } `,
            strokeDasharray: (componentWidth / 2 - 10) * 2 * Math.PI,
            strokeDashoffset: strokeOffset,
            transition: "stroke-dashoffset 400ms linear",
          }}
          cx={componentWidth / 2}
          cy={componentWidth / 2}
          r={radius}
          strokeLinecap="round"
        />
      </svg>
      <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <p className=" leading-1 tracking-widest  text-lg md:text-xl lg:text-2xl font-extralight pb-1 sm:pb-4 text-[#ffffff]">
          {value}
          <span className=" text-sm md:text-base lg:text-lg text-gray-300">
            {type === "Temperature"
              ? "C'"
              : type === "Voltage"
              ? "V"
              : type === "Current"
              ? "A"
              : type === "Power"
              ? "W"
              : ""}
          </span>
        </p>
      </div>
      <div className="  z-20 text-[10px] sm:text-xs md:text-xs text-[#726975] cursor-default absolute  top-5 left-0 w-full h-full flex items-center justify-between">
        <p className=" pl-1">0</p>
        <p>{maxValue}</p>
      </div>
      <div className=" w-full h-1/2 bg-[#161c31] absolute top-[50%]  translate-y-1  z-10 left-0"></div>
    </div>
  );
}
