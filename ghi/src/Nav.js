import React from "react";
import { NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Nav() {
  const { token, logout } = useToken();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="pt-2 pb-8">
      <div className="py-2 px-2">
        <ul className="flex justify-end items-center space-y-6 space-x-6 h-full relative">
          <div className="w-[69px] h-[69px] left-2 top-0 absolute">
            <img
              className="w-full h-full object-contain"
              src="/FinDex Logo.png"
              alt="FinDex Logo"
            />
          </div>
          <div className="left-[58px] absolute">
            <span className="text-slate-50 text-[32px] font-semibold">
              Fin
            </span>
            <span className="text-emerald-300 text-[32px] font-semibold">
              Dex
            </span>
          </div>

          {!token ? (
            <>
              <li>
                <NavLink
                  className="text-[18px] text-slate-50 font-sans font-medium pr-4"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="text-slate-50 text-[18px] font-sans font-medium pr-4"
                  to="/signup"
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button
                className="text-slate-50 text-[18px] font-sans font-medium pr-4"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}

          <li>
            <NavLink
              className="text-slate-50 text-[18px] font-sans font-medium pr-4"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-slate-50 text-[18px] font-sans font-medium pr-4"
              to="/income"
            >
              Income
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-slate-50 text-[18px] font-sans font-medium pr-4"
              to="/expenses"
            >
              Expenses
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-slate-50 text-[18px] font-sans font-medium pr-4"
              to="/analyzer"
            >
              Analyzer
            </NavLink>
          </li>
        </ul>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-600 opacity-70" />
      </div>
    </nav>
  );
}

export default Nav;
