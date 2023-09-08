import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from './images/hero.jpg';

function MainPage() {
  return (
    <div>

      <div className="relative">
        <img src={heroImage} alt="Hero" className="w-full h-auto" />

        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black opacity-50">
          <div className="text-white text-center">
            <h2 className="text-3xl font-semibold text-worksans mb-2">Take control of your finances and plan for your future.</h2>
            <p className="text-crimson text-lg">Gain financial clarity and reach your goals. Easily track your monthly income, expenses, and savings.</p>
            <div className="text-center">
              <Link to="/login" className="inline-block px-4 py-2 text-white bg-opacity-95 bg-black rounded-full text-[18px] font-sans font-medium hover:text-blue-500 active:text-green-500 custom-text-color">
                Login
              </Link>
              <Link to="/signup" className="inline-block px-4 py-2 text-white bg-opacity-95 bg-black rounded-full text-[18px] font-sans font-medium hover:text-blue-500 active:text-green-500 custom-text-color">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-black bg-opacity-75 p-4 text-white text-center">
        <p className="text-notosans text-base">Simplify your finances, FinDex provides customizable categories and robust graphical feedback designed to help you monitor your cash flow anytime, anywhere.</p>
      </div>


      <div className="bg-black bg-opacity-75 p-4 text-white text-center">
        <p className="text-notosans text-base">Sign up now to start your journey towards financial wellbeing. Log in to pick up where you left off.</p>
      </div>

    </div>
  );
}

export default MainPage;
