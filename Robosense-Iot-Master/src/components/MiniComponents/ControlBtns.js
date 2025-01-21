import React, { useEffect, useState } from "react";
import { controlRequestToRobot } from "./ControlRobotStatus";
import { GoStop } from "react-icons/go";
import { RiRestartLine } from "react-icons/ri";

export default function ControlBtns({ robotStatus }) {
  const [isRebootButtonDisabled, setIsRebootButtonDisabled] = useState(false);
  const [isStopButtonDisabled, setIsStopButtonDisabled] = useState(false);

  useEffect(() => {
    if (robotStatus === 0) {
      setIsStopButtonDisabled(true);
    } else {
      setIsStopButtonDisabled(false);
    }
  }, [robotStatus]);

  const handleClickReboot = () => {
    // Disable both buttons immediately after the first click
    setIsRebootButtonDisabled(true);
    setIsStopButtonDisabled(true);

    // Make the first request
    controlRequestToRobot({ status: 0, rebootState: 1 });

    // After 20 seconds, update and send the second set of values
    setTimeout(() => {
      controlRequestToRobot({ status: robotStatus, rebootState: 0 });

      // Re-enable both buttons after the 20-second delay
      setIsRebootButtonDisabled(false);
      setIsStopButtonDisabled(false);
    }, 20000); // 20 seconds delay
  };

  const handleClickStop = () => {
    // Disable the button immediately after the first click
    setIsStopButtonDisabled(true);

    // Make the first request
    controlRequestToRobot({ status: 0, rebootState: 0 });

    // After 20 seconds, update and send the second set of values
    setTimeout(() => {
      // Re-enable the button after the 20-second delay
      setIsStopButtonDisabled(false);
    }, 20000); // 20 seconds delay
  };

  return (
    <div className=" flex w-full items-end sm:w-fit justify-center gap-3">
      <button
        onClick={handleClickStop}
        disabled={isStopButtonDisabled}
        className={`${
          isStopButtonDisabled
            ? "text-gray-600 border-gray-600"
            : "border-red-500 text-red-200 hover:bg-red-500"
        } border flex items-center justify-center  gap-2 bg-[#161c31] h-fit w-full sm:w-fit  rounded-md  px-5 sm:px-3 py-1 duration-300`}
      >
        <GoStop className=" size-5" />
        E-Stop
      </button>
      <button
        onClick={handleClickReboot}
        disabled={isRebootButtonDisabled}
        className={`${
          isRebootButtonDisabled
            ? "text-gray-700 border-gray-700"
            : "border-[#637adb] text-red-200 bg-[#161c31] hover:bg-[#637adb]"
        } border flex items-center justify-center gap-2 w-full sm:w-fit rounded-md px-4 py-1 duration-300`}
      >
        <RiRestartLine className=" size-5" />
        Reboot
      </button>
    </div>
  );
}
