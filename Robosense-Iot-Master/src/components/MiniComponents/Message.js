import React from "react";

export default function Message({ message }) {
  const robotExecutionLogs = [
    "Normal",
    "High Voltage",
    "High Current",
    "Vibration X High",
    "Vibration Y High",
    "Vibration Z High",
    "High Temperature",
    "No Power-Supply to Robot",
    "Emergency Stopped",
    "Anomaly Sensor Reading Detected",
    "Premptive Collision Detection Activated",
    "Power Supply Falut",
  ];

  return (
    <div className="w-full flex  mt-4 gap-2 items-start ">
      <p className="text-gray-300 pt-1 leading-2">-</p>
      <p className={` px-2 pt-1 w-max  leading-5 message `}>
        <span className="   text-gray-300">{message.split(": ")[0]} : </span>
        <span
          className=" px-2 border tracking-wide border-transparent rounded-sm"
          style={{
            color: `${
              parseInt(message.split(": ")[1], 10) === 400
                ? "#66E66E"
                : parseInt(message.split(": ")[1], 10) === 401
                ? "#fff"
                : parseInt(message.split(": ")[1], 10) === 402
                ? "#fff"
                : parseInt(message.split(": ")[1], 10) === 406
                ? "#fff"
                : parseInt(message.split(": ")[1], 10) === 403
                ? "#FF6B6B"
                : parseInt(message.split(": ")[1], 10) === 404
                ? "#FF6B6B"
                : parseInt(message.split(": ")[1], 10) === 405
                ? "#FF6B6B"
                : parseInt(message.split(": ")[1], 10) >= 411
                ? "#fff"
                : "#FFD700"
            }`,
            backgroundColor: `${
              parseInt(message.split(": ")[1], 10) === 400
                ? ""
                : parseInt(message.split(": ")[1], 10) === 401
                ? "#cc1308"
                : parseInt(message.split(": ")[1], 10) === 402
                ? "#cc1308"
                : parseInt(message.split(": ")[1], 10) === 406
                ? "#cc1308"
                : parseInt(message.split(": ")[1], 10) === 403
                ? ""
                : parseInt(message.split(": ")[1], 10) === 404
                ? ""
                : parseInt(message.split(": ")[1], 10) === 405
                ? ""
                : parseInt(message.split(": ")[1], 10) >= 411
                ? "#FFD700"
                : ""
            }`,
          }}
        >
          {robotExecutionLogs[parseInt(message.split(": ")[1], 10) % 100] || ""}
        </span>
      </p>
    </div>
  );
}
