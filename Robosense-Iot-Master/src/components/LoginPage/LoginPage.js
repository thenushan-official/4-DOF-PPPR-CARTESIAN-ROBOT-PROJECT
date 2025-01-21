import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";

export default function LoginPage({ isLogged, setIsLogged }) {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});
  const [loginState, setLoginState] = useState("non");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState, // Spread the previous state
      [name]: value, // Update the specific field
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.username === "admin" && data.password === "4dofpppr") {
      setIsLogged(true);
      setLoginState("success");
      console.log("okay");
    } else {
      setLoginState("faild");
    }
  };

  return (
    <div
      className={` ${
        isLogged ? "loginPage" : ""
      } overflow-hidden w-full h-screen z-20 fixed top-0 left-0 `}
    >
      <div className=" bg-[#111525] w-full h-full relative " >
        <div className="h-full  relative flex items-center justify-center  px-5">
          <div className={` bg-[#111525] border border-gray-500 w-full sm:w-fit sm:px-5 shadow-sm shadow-gray-400 py-6 rounded-md w-fit `}>
            <p className="  pb-10 text-center text-gray-300 font-montserrat text-3xl">
              Robo-Sense-IOT
            </p>
            <form action="" className=" w-full px-5 sm:px-0 "  onSubmit={handleSubmit}>
            
            <div className=" w-full flex items-center justify-center">
            <input
                type="text"
                name="username"
                placeholder=" username"
                autoFocus
                required
                onChange={handleOnChange}
                className={`  ${
                  loginState === "faild"
                    ? " border-red-500"
                    : loginState === "success"
                    ? " border-gray-600"
                    : " border-gray-600"
                } mb-2  text-base focus:border-gray-400 hover:border-gray-400 duration-300   mx-auto  w-full sm:w-96 text-white font-thin tracking-wider pt-2 pb-[2px] outline-none bg-transparent border rounded-md px-3 `}
              />
            </div>
           
              <div className=" mb-5 mx-auto relative w-full sm:w-96">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder=" password"
                  required
                  onChange={handleOnChange}
                  className={`  ${
                    loginState === "faild"
                      ? " border-red-500"
                      : loginState === "success"
                      ? " border-gray-600"
                      : " border-gray-600"
                  } focus:border-gray-400 hover:border-gray-400 duration-300   w-full  text-white font-thin tracking-wider pt-2 pb-[2px] outline-none bg-transparent border rounded-md px-3 `}
                />
                <FaRegEye
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className=" absolute top-1/2 right-2 -translate-y-1/2 size-5 text-gray-400 hover:text-gray-200 duration-300 cursor-pointer"
                />
              </div>
              {loginState === "faild" && (
                <p className="   pb-1 text-red-300 tracking-wide text-sm font-thin">
                  Please check your usaername & password{" "}
                </p>
              )}
            <div className=" w-full flex items-center justify-center">

              <button className="text-white font-medium  py-2 duration-300  shadow-white hover:shadow-md bg-[#2d259e] mx-auto rounded-md  w-full  sm:w-96">
                Login
              </button>
          </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
