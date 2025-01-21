import React, { useState } from "react";
import TempletForMetor from "../MiniComponents/TempletForMetor";
import TempletForLineChart from "../MiniComponents/TempletForLineChart";
import LoginPage from "../LoginPage/LoginPage";
import TempletForIndicator from "../MiniComponents/TempletForIndicator";
import TitleText from "../MiniComponents/TitleText";
import TempletForMessages from "../MiniComponents/TempletForMessages";
import PowerSwitch from "../MiniComponents/PowerSwitch";
import ControlBtns from "../MiniComponents/ControlBtns";
import Footer from "../MiniComponents/Footer";

export default function HomePage({
  dataForIndicators,
  kwh,
  lineChartData,
  consoleMessageData,
  robotStatus,
}) {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      {isLogged ? (
        <>
          <div className=" py-3 bg-[#0e111e] w-full fixed  text-[#f0f0f0] top-0 left-0 z-20 flex items-center justify-between sm:px-10 px-3">
            <p
              onClick={() => {
                console.log(robotStatus);
              }}
              className="  font-montserrat uppercase py-2 text-3xl tracking-wide scale-y-150"
            >
              Robo-Sense-IOT
            </p>
            <div className=" sm:flex gap-3">
              <PowerSwitch robotStatus={robotStatus} />
            </div>
          </div>
          <div
            className={`    w-full h-screen overflow-auto pb-5 customsScrollbar bg-[#111525] sm:px-10 px-3 pt-[70px]`}
          >
            <div className=" relative">
              <TitleText />
              <div className=" w-full  flex-wrap gap-3  mt-8 flex">
                <div className="font-bold  bg-[#161c31] w-full sm:w-max text-white rounded overflow-hidden ">
                  <div className="cursor-default w-full text-sm  flex items-center justify-between p-2">
                    <p className=" font-light text-gray-300 mx-auto">Status</p>
                  </div>
                  {robotStatus ? (
                    <div className="text-green-500  font-semibold font-montserrat tracking-wider w-full cursor-default sm:w-36 pb-5 flex items-center justify-center">
                      Running
                    </div>
                  ) : (
                    <div className="text-red-400  font-semibold font-montserrat tracking-wider w-full cursor-default sm:w-36 pb-5 flex items-center justify-center">
                      Stopped
                    </div>
                  )}
                </div>
                <div className=" sm:hidden h-full bg-[#161c31]  rounded-md  w-full  text-sm font-light text-gray-300">
                  <p className=" w-full text-center pt-1 pb-3 cursor-default">
                    Control Buttons
                  </p>
                  <div className=" px-5 items-end  flex pb-4">
                    <ControlBtns robotStatus={robotStatus} />
                  </div>
                </div>
                <div className="font-bold w-[50%] bg-[#161c31] sm:w-max text-white rounded overflow-hidden ">
                  <div className="cursor-default w-full text-sm  flex items-center justify-between p-2">
                    <p className=" font-light text-gray-300 text-center mx-auto">Kwh</p>
                  </div>
                  <div className=" w-full cursor-default  font-light sm:w-36 pb-5 flex items-center justify-center">
                    {kwh}
                  </div>
                </div>
                {dataForIndicators.map((item, index) => (
                  <TempletForIndicator item={item} index={index} key={index} />
                ))}
                <div className=" h-full hidden sm:block bg-[#161c31]  rounded-md   text-sm font-light text-gray-300">
                  <p className=" w-full text-center pt-1 pb-3 cursor-default">
                    Control Buttons
                  </p>
                  <div className=" px-5 items-end flex pb-4">
                    <ControlBtns robotStatus={robotStatus} />
                  </div>
                </div>
              </div>

              <div className=" w-full sm:grid gap-3 grid-cols-1 pt-6 lg:grid-cols-4">
                <div className="  rounded-md   w-full lg:col-span-3">
                  <div className="bg-[#161c31] rounded-md grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
                    {dataForIndicators.map((item, index) => (
                      <TempletForMetor key={index} item={item} />
                    ))}

                    <TempletForMetor
                      item={{
                        attribute: "Power",
                        value:
                          dataForIndicators[0].value *
                          dataForIndicators[1].value,
                        lowValue: 0,
                        alertValue:
                          dataForIndicators[0].alertValue *
                          dataForIndicators[1].alertValue,
                        warningValue:
                          dataForIndicators[0].warningValue *
                          dataForIndicators[1].warningValue,
                        maxValue:
                          dataForIndicators[0].maxValue *
                          dataForIndicators[1].maxValue,
                      }}
                    />
                  </div>
                  <div className=" bg-[#161c31] mt-6 rounded-md  w-full ">
                    <div className=" w-full grid grid-cols-1 md:grid-cols-2    ">
                      {lineChartData.map((item, index) => (
                        <TempletForLineChart key={index} item={item} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="   w-full overflow-hidden mt-3 lg:mt-0 rounded-md ">
                  <div className=" rounded-md overflow-hidden w-full bg-[#161c31]">
                    <p className=" font-light w-fit  text-gray-300   cursor-default  px-6 text-sm my-2  ">
                      <span className=" text-red-500">Live</span> Stream
                    </p>
                    <div className=" w-full aspect-video">
                      <iframe
                        src="https://www.youtube.com/embed/ZEir102PxJ8"
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                        title="4DOF Cartesian Robot Work"
                      ></iframe>
                    </div>
                  </div>
                  <TempletForMessages consoleMessageData={consoleMessageData} />
                </div>
              </div>
            </div>
            <Footer setIsLogged={setIsLogged} />
          </div>
        </>
      ) : (
        <LoginPage isLogged={isLogged} setIsLogged={setIsLogged} />
      )}
    </>
  );
}
