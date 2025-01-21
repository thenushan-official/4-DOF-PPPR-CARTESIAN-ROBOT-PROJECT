import React from "react";
import logoImg from "../imgs/logo.png";

export default function Footer({ setIsLogged }) {
  return (
    <div className=" mt-10 border-t border-gray-800 w-full  pt-5 text-gray-200 ">
      <div className="  w-full sm:flex items-end justify-between ">
        <div className="     flex items-start gap-3">
          <img src={logoImg} className=" w-20 object-contain" alt="" />
          <div className=" font-thin">
            <p>Mechatronics - MMT</p>
            <p>Faculty of Technology</p>
            <p>University of Sri Jayewardenepura.</p>
            <p className=" font-thin mt-4">
              Project Repostory:{" "}
              <a
                href="https://github.com/thenushan-official/4-DOF-PPPR-CARTESIAN-ROBOT-PROJECT.git"
                className=" font-normal"
              >
                Get the code
              </a>
            </p>
          </div>
        </div>
        <div className=" w-full sm:w-fit sm:block flex items-center justify-end">
        <button
          onClick={() => {
            setIsLogged(false);
          }}
          className=" w-fit mt-5 sm:mt-0 hover:text-black duration-300 hover:bg-[#637adb] hover:border-transparent cursor-pointer text-white border rounded-full px-5 py-2"
        >
          Log out
        </button>
        </div>
      </div>
    </div>
  );
}
