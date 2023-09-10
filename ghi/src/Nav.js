import React from "react";
import { NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./Nav.css";


function Nav() {
  const { token, logout } = useToken();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="mt-2 mb-2">
      <div className="py-2 px-2">
        <ul className="flex justify-end items-center space-y-6 space-x-6 h-full relative">
          <NavLink to="/" className="flex items-center ml-2">
            <img
              className="w-[65px] h-[65px] object-contain"
              src="/FinDex.png"
              alt="FinDex"
            />
            <div className="ml-1 pt-5">
              <span className="text-slate-50 text-[30px] font-semibold custom-text-color">
                Fin
              </span>
              <span className="text-emerald-300 text-[30px] font-semibold">
                Dex
              </span>
            </div>
          </NavLink>
          <div className="flex-grow"></div>

          {!token ? (
            <>
              <li className="animated-link">
                <NavLink

                  className="text-[18px] font-sans font-medium pr-4 hover:text-blue-500 active:text-green-500 custom-text-color"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li className="animated-link">
                <NavLink

                  className="text-[18px] font-sans font-medium pr-4 hover:text-blue-500 active:text-green-500 custom-text-color"
                  to="/signup"
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="animated-link">
                <button
                  className="text-[18px] font-sans font-medium pr-4 hover:text-blue-500 active:text-green-500 custom-text-color"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
              <li className="animated-link">
                <NavLink
                  className="text-[18px] font-sans font-medium pr-4 hover:text-blue-500 active:text-green-500 custom-text-color"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="animated-link">
                <NavLink
                  className="text-[18px] font-sans font-medium pr-4 hover:text-blue-500 active:text-green-500 custom-text-color"
                  to="/income"
                >
                  Income
                </NavLink>
              </li>
              <li className="animated-link">
                <NavLink
                  className="text-[18px] font-sans font-medium pr-4 hover:text-blue-500 active:text-green-500 custom-text-color"
                  to="/expenses"
                >
                  Expenses
                </NavLink>
              </li>
              <li className="animated-link">
                <NavLink
                  className="text-[18px] font-sans font-medium pr-4 hover:text-blue-500 active:text-green-500 custom-text-color"
                  to="/analyzer"
                >
                  Analyzer
                </NavLink>
              </li>

              {/* New Links */}
              <li className="animated-link">
                <NavLink
                  className="text-[18px] font-sans font-medium pr-4 hover:text-blue-500 active:text-green-500 custom-text-color"
                  to="/analyzer2"
                >
                  Time Analysis
                </NavLink>
              </li>
                <li className="animated-link">
                  <NavLink
                    className="text-[18px] font-sans font-medium pr-4 hover:text-blue-500 active:text-green-500 custom-text-color"
                    to="/analyzer3"
                  >
                    Doughnut
                  </NavLink>
                </li>
              {/* End of New Links */}
            </>
          )}
          {/* End of New Links */}
        </ul>
        <div className="fixed bottom-0 left-0 w-full h-[1px] bg-neutral-600 opacity-70" />
      </div>
    </nav>
  );
}

export default Nav;
