import React from "react";
import { NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Nav({ }) {
  const { token, logout } = useToken();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <div className="border border-neutral-600 py-2 px-2">
        <ul className="flex justify-end items-center space-y-6 space-x-6 h-full">
          <div className="w-[71px] h-[71px] left-2 top-0 absolute bg-customGreen rounded-[44.50px]"></div>
          <div className="left-[102px] top-[-30px] absolute">
            <span className="text-slate-50 text-[39px] font-semibold">
              Fin
            </span>
            <span className="text-emerald-300 text-[39px] font-semibold">
              Dex
            </span>
          </div>

          <div className="left-[155px] top-[10px] absolute text-slate-50 text-[25px] font-serif">
            financial index generator
          </div>

          {!token ? (
            <>
              <li>
                <NavLink
                  className="text-[22px] text-slate-50 font-weather"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="text-slate-50 text-[22px] font-weather"
                  to="/signup"
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button
                className="text-slate-50 text-[22px] font-weather"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}

          <li>
            <NavLink
              className="text-slate-50 text-[22px] font-weather"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-slate-50 text-[22px] font-weather"
              to="/income"
            >
              My Income
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-slate-50 text-[22px] font-weather"
              to="/expenses"
            >
              Expenses
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-slate-50 text-[22px] font-weather"
              to="/analyzer"
            >
              Analyzer
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
