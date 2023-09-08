import React from "react";
import { NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";


function Nav() {
  const { token, logout } = useToken();




  const handleLogout = () => {
    logout();
  };






  return (
    <nav>
      <div className="border border-neutral-600 py-2 px-2">
        <ul className="flex justify-end items-center space-y-6 space-x-6 h-full">
          <div className="w-[71px] h-[71px] left-2 top-0 absolute bg-red-600 rounded-[44.50px]"></div>
          <div className="left-[102px] top-[-30px] absolute">
            <span className="text-black text-[39px] font-semibold">
              Fin
            </span>
            <span className="text-red-500 text-[39px] font-semibold">
              Dex
            </span>
          </div>


          <div className="left-[155px] top-[10px] absolute text-gray-700 text-[25px] font-serif">
            financial index generator
          </div>


          {!token ? (
            <>
              <li>
                <NavLink
                  className="text-[18px] text-black font-weather no-underline hover:underline hover:text-red-500 hover:duration-500"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="text-black text-[22px] font-weather no-underline hover:underline hover:text-red-400 hover:duration-500"
                  to="/signup"
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button
                className="text-black text-[16px] font-weather no-underline hover:underline hover:text-red-400 hover:duration-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}


          <li>
            <NavLink
              className="text-black text-[16px] font-weather no-underline hover:underline hover:text-red-400 hover:duration-500"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-black text-[16px] font-weather no-underline hover:underline hover:text-red-400 hover:duration-500"
              to="/income"
            >
              My Income
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-black text-[16px] font-weather no-underline hover:underline hover:text-red-400 hover:duration-500"
              to="/expenses"
            >
              Expenses
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-black text-[16px] font-weather no-underline hover:underline hover:text-red-400 hover:duration-500"
              to="/analyzer"
            >
              Analyzer 1
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-black text-[16px] font-weather no-underline hover:underline hover:text-red-400 hover:duration-500"
              to="/analyzer2"
            >
              Analyzer 2
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}


export default Nav;
