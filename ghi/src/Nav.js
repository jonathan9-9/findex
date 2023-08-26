import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav>
        <div>
            <div className="w-[1440px] h-[80px] left-0 top-0 absolute border border-neutral-600"></div>
            <ul className="flex justify-end items-center space-y-6 space-x-6 h-full">
                <div className="w-[71px] h-[71px] left-2 top-0 absolute bg-blue-400 rounded-[44.50px]"></div>
                <div className="left-[102px] top-[-30px] absolute"><span className="text-neutral-500 text-[39px] font-semibold">Fin</span><span className="text-emerald-300 text-[39px] font-semibold">Dex</span></div>

                <div className="left-[155px] top-[10px] absolute text-neutral-500 text-[25px] font-normal">financial index generator</div>
                <li>
                <NavLink className="text-neutral-500 text-[27px] font-normal" to="/">Home</NavLink>
                </li>
                <li>
                <NavLink className="text-neutral-500 text-[27px] font-normal" to="/income">Income</NavLink>
                </li>
                <li>
                <NavLink className="text-neutral-500 text-[27px] font-normal" to="/expenses">Expenses</NavLink>
                </li>
                <li>
                <NavLink className="text-neutral-500 text-[27px] font-normal" to="/analyzer">Analyzer</NavLink>
                </li>
                <li>
                <NavLink className="text-neutral-500 text-[27px] font-normal" to="/signup">Sign Up</NavLink>
                </li>
            </ul>
        </div>
    </nav>
  );
}

export default Nav;
