import React, { useEffect, useRef } from "react";
import Message from "./Message";

export default function TempletForMessages({ consoleMessageData }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Automatically scroll to the last item on mount and when new items are added
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);
  return (
    <div className="overflow-hidden relative  rounded-md mt-5  bg-[#161c31] text-[#ffffff] font-thin text-sm w-full ">
      <p className=" font-light w-fit  cursor-default text-gray-300    px-6 text-sm mt-2 mb-2  ">
        Execution Log
      </p>
      <div
        ref={containerRef}
        style={{ aspectRatio: "16/13" }}
        className="customsScrollbar1 relative pl-1 pb-5 w-full space-y-3 bg-[#111525]  aspect-vi deo overflow-auto"
      >
        {consoleMessageData.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <div className=" w-full absolute bottom-0 left-0">
        <div className=" w-20 border-gray-800 mx-auto border-t"></div>
      </div>
    </div>
  );
}
