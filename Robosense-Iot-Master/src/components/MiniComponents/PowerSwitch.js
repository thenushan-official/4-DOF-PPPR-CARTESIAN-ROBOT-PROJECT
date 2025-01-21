import React, { useEffect, useState } from "react";
import { controlRequestToRobot } from "./ControlRobotStatus";

export default function PowerSwitch({ robotStatus }) {
  const [switchState, setSwitchState] = useState(robotStatus);
  useEffect(() => {
    if (switchState) {
      controlRequestToRobot({ status: 1, rebootState: 0 });
    } else {
      controlRequestToRobot({ status: 0, rebootState: 0 });
    }
  }, [switchState]);

  return (
    <div
      onClick={() => {
        setSwitchState(!switchState);
      }}
      className=" text-xs font-bold relative "
    >
      <div
        className={`  h-7 w-[65px] cursor-pointer element ${
          switchState
            ? "bg-[#637adb]  border border-transparent"
            : " border border-[#637adb]"
        }   text-white relative py-2  rounded-full flex items-center justify-center gap-2 `}
      >
        <div
          className={`h-full element absolute top-0 left-0  aspect-square ${
            !switchState
              ? "bg-[#637adb] "
              : " border bg-[#637adb] border-[#000000]"
          }  ${
            switchState
              ? " sm:translate-x-[140%] translate-x-[140%]"
              : "translate-x-[1px]"
          }  rounded-full overflow-hidden scale-[0.85]`}
        ></div>
      </div>
      {switchState ? (
        <p className=" absolute top-1/2 -translate-y-1/2 left-2 cursor-default  pointer-events-none z-20 text-[#0e111e]">
          OFF
        </p>
      ) : (
        <p className=" absolute top-1/2 -translate-y-1/2 right-2 cursor-default pointer-events-none  font-thin z-20 text-white">
          ON
        </p>
      )}
    </div>
  );
}
