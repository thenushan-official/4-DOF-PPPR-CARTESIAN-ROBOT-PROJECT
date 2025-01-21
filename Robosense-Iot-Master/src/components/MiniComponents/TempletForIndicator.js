import React from "react";

export default function TempletForIndicator({ item, index }) {
  return (
    <div
      key={index}
      className={`${
        item.attribute === "Current" ? "hidden" : ""
      } font-bold w-max  bg-[#161c31] text-gray-300 rounded overflow-hidden `}
    >
      <div className="cursor-default w-full text-sm   flex items-center justify-between p-2">
        <p
          className={` ${index === 2 ? "px-3" : " px-5 sm:px-7"} font-light  `}
        >
          {item.attribute} Status
        </p>
      </div>
      <div
        className={`${
          item.value >= item.warningValue
            ? "alert"
            : item.value > item.alertValue
            ? "alert2"
            : item.value < item.lowValue
            ? "text-orange-400"
            : "text-green-500"
        }  font-medium  text-gray-500 cursor-default   px-5 whitespace-nowrap pb-5 flex items-center justify-center `}
      >
        {item.value >= item.warningValue
          ? "Warning!.."
          : item.value > item.alertValue
          ? "Alert!.."
          : item.value < item.lowValue
          ? "Droped"
          : "Normal"}
      </div>
    </div>
  );
}
