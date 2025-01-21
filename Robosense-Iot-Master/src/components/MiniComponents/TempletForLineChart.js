import React, { useState } from "react";
import LineChart from "./LineChart";

export default function TempletForLineChart({ item }) {
  const timeDurations = ["LIVE", "20m", "40m", "60m"];
  const [selectedTime, setSelectedTime] = useState(0);
  return (
    <div
      className={` py-5 md:py-0 border-b md:border-b-transparent md:border-x border-[#111525] md:px-3 mx-3 md:mx-0  md:my-3  overflow-hidden `}
    >
      <div className="cursor-default w-full   font-thin text-[white] flex items-center justify-between p-2">
        <p>{item.attribute}</p>
      </div>

      <div className=" w-full pb-3  px-2  ">
        <div className=" w-full rounded-md bg-[#1f2539] grid grid-cols-4 p-[2px]  gap-1">
          {timeDurations.map((time, index) => (
            <p
              onClick={() => {
                setSelectedTime(index);
              }}
              key={index}
              className={` ${
                index === selectedTime
                  ? "bg-[#637adb] text-white"
                  : "bg-[#1f2539] text-gray-400"
              } w-full cursor-pointer duration-300 pb-[3px] pt-[4px] rounded hover:bg-[#36436c]  text-center  hover:text-white text-xs `}
            >
              {time}
            </p>
          ))}
        </div>
        <div className=" flex items-center justify-end pr-3 gap-5 mt-3">
          {item.attribute === "Temperature" ? (
            <div className=" flex items-center justify-center gap-1">
              <div className=" h-3 w-4 border border-[#1f2539] bg-[#637adb]"></div>
              <p className=" text-xs text-gray-500 leading-2 cursor-default pt-1">
                Temperature
              </p>
            </div>
          ) : (
            <>
              <div className=" flex items-center justify-center gap-1">
                <div className=" h-3 w-4 border border-[#1f2539] bg-[#637adb]"></div>
                <p className=" text-xs text-gray-500 leading-2 cursor-default pt-1">
                  X-Axis
                </p>
              </div>
              <div className=" flex items-center justify-center gap-1">
                <div className=" h-3 w-4 border border-[#1f2539] bg-[#ca682b]"></div>
                <p className=" text-xs text-gray-500 leading-2 cursor-default pt-1">
                  Y-Axis
                </p>
              </div>
              <div className=" flex items-center justify-center gap-1">
                <div className=" h-3 w-4 border border-[#1f2539] bg-[#23f538]"></div>
                <p className=" text-xs text-gray-500 leading-2 cursor-default pt-1">
                  Z-Axis
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-full px-2">
        <LineChart
          type={item.attribute}
          chartData={item.data[selectedTime].reading}
        />
      </div>
    </div>
  );
}
