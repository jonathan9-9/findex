import { React, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import heroImage from './images/hero.jpg';
import lineGraph from './images/linegraph-example.png'
import Doughnut from './images/doughnut-example.png'
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./MainPage.css";
import inDex from './images/index.png'
import kingDex from './images/kingdex.png'
import chinDex from './images/chindex.png'
import binDex from './images/bindex.png'
import winDex from './images/windex.png'
import spinDex from './images/spindex.png'
import him from './images/him.png'

function MainPage() {
  const { token, logout } = useToken();
  const [currentText, setCurrentText] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [showHim, setShowHim] = useState(false);

  const toggleHim = () => {
    setShowHim(!showHim);
  };

  // const wordVariations = [
  //   "individuals.",
  //   "teams.",
  //   "professionals.",
  // ];

  //previous version^^
  //es lint wants me to use usememo so it can be entered as dependency
  // wordVariations is contains no changing elements but am doing it just
  //to pass the pipeline
  const wordVariations = useMemo(
    () => ["individuals.", "teams.", "professionals."],
    []
  );


  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (currentLetter === wordVariations[currentText].length) {
        clearInterval(typingEffect); ////pause

        setTimeout(() => {
          /////timeout until continue
          setCurrentText(
            (lastIndex) =>
              lastIndex === wordVariations.length - 1 ? 0 : lastIndex + 1
          );
          setCurrentLetter(0);
        }, 1500); ///// 1.5 sec
      } else {
        setCurrentLetter((lastIndex) => lastIndex + 1);
      }
    }, 90); /////milliseconds

    return () => clearInterval(typingEffect);
  }, [currentText, currentLetter, wordVariations]);






  const handleScroll = () => {
    const maxScroll = 475;
    const minScroll = 0;
    const newY = window.scrollY;


    const newScrollY = Math.min(maxScroll, Math.max(minScroll, newY));

    const shiftImages = document.querySelectorAll('.shift-bg');
    shiftImages.forEach((shiftImage, index) => {
      if (index === 0) {
        shiftImage.style.transform = `translateY(${newScrollY * 0.33}px)`;
      } else {
        shiftImage.style.transform = `translateY(-${newScrollY * 0.2}px)`;
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="relative">
        <div className="shift-bg">
          <img src={heroImage} alt="hero" className="w-full h-full" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center gradient-background">
          <div className="text-white text-center">
            <h2 className="text-3xl font-semibold text-worksans mb-2">Take control of your finances, plan for your future.</h2>
            <p className="text-crimson text-lg">Gain financial clarity and reach your goals. Track your monthly income, expenses, and savings - Easily.</p>
            {!token ? (
              <div className="text-center">
                <Link to="/login" className="inline-block px-4 py-2 text-white m-5 ml-6 mr-6 rounded-full text-[18px] font-sans font-medium hover:text-blue-500 active:text-green-500 custom-text-color gradient-background2">
                  Login
                </Link>
                <Link to="/signup" className="inline-block px-4 py-2 text-white m-5 ml-6 mr-6 rounded-full text-[18px] font-sans font-medium hover:text-blue-500 active:text-green-500 custom-text-color gradient-background2">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="text-center">
                <Link to="/analyzer" className="inline-block px-4 py-2 text-white m-5 ml-6 mr-6 rounded-full text-[18px] font-sans font-medium hover:text-blue-500 active:text-green-500 custom-text-color gradient-background2">
                  Bar Graph
                </Link>
                <Link to="/analyzer2" className="inline-block px-4 py-2 text-white m-5 ml-6 mr-6 rounded-full text-[18px] font-sans font-medium hover:text-blue-500 active:text-green-500 custom-text-color gradient-background2">
                  Time Analysis
                </Link>
                <Link to="/analyzer3" className="inline-block px-4 py-2 text-white m-5 ml-6 mr-6 rounded-full text-[18px] font-sans font-medium hover:text-blue-500 active:text-green-500 custom-text-color gradient-background2">
                  Doughnut Chart
                </Link>
                <button
                  onClick={logout}
                  className="inline-block px-4 py-2 text-white m-5 ml-6 mr-6 rounded-full text-[18px] font-sans font-medium hover:text-blue-500 active:text-green-500 custom-text-color gradient-background2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative shift-bg">
        <div className="bg-white p-4 text-black text-center">
          <h2 className="text-worksans text-4xl text-slate-600 font-semibold text-base p-20">Keep it Simple.</h2>
          <p className="text-notosans text-slate-500 text-base p-15">FinDex provides customizable categories and robust graphical feedback designed to help you monitor your cash flow anytime, anywhere.</p>
        </div>
        <div className="relative pb-40">
          <div className="bg-white bg-opacity-75 p-4 text-black text-center">
            <p className="text-notosans text-slate-500 text-base p-15">Sign up now to start your journey towards financial wellbeing. Log in to pick up where you left off.</p>
          </div>
        </div>
      </div>
      <div className="relative shift-bg rounded-full">
        <div>
          <img src={heroImage} alt="hero" className="w-auto h-auto flip-vertical" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center gradient-background3">
          <img src={lineGraph} alt="linegraph" className="relative w-auto h-96 rounded-md" />
        </div>
      </div>
      <div className="relative shift-bg">
        <div className="bg-white p-4 text-black text-center">
          <h2 className="text-worksans text-4xl text-slate-600 font-semibold text-base p-20">Intuitive Graphs</h2>
          <p className="text-notosans text-slate-500 text-base p-15">Simplicity matters- we use a streamlined graphical interfaces that are easy to interact with.</p>
        </div>
        <div className="relative pb-40">
          <div className="bg-white bg-opacity-75 p-4 text-black text-center">
            <p className="text-notosans text-slate-500 text-base p-15">No extra details, no extra calculations- Your convenience comes first.</p>
          </div>
        </div>
      </div>
      <div className="relative shift-bg">
        <div>
          <img src={heroImage} alt="hero" className="w-auto h-auto flip-horizontal" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center gradient-background4">
          <img src={Doughnut} alt="doughnut" className="relative w-auto h-96 rounded-md" />
        </div>
      </div>
      <div className="relative shift-bg">
        <div className="bg-white p-4 text-black text-center">
          <div className="relative p-15">
            <h2 className="text-worksans text-4xl text-slate-600 font-semibold text-base pt-20">
              Trusted by
            </h2>
            <h2 className="text-worksans text-4xl text-slate-600 font-semibold text-base">
              <span className="text-[#ff6f61]">{wordVariations[currentText].substring(0, currentLetter)}|</span>
            </h2>
          </div>
          <p className="text-notosans text-slate-500 text-base pt-8 pb-20">FinDex is loved by individuals and professionals alike. Sign up today or Login to catch up on your goals.</p>
        </div>
      </div>
      <div className="relative shift-bg rounded-full">
        <div>
          <img src={heroImage} alt="hero" className="w-full h-60 flip-horizontal-vertical rounded-full" />
        </div>
        <div className="absolute top-0 left-0 w-full h-60 flex justify-center items-center gradient-background5  rounded-full">
          <img src={winDex} alt="windex" className="p-10 relative w-auto h-40 rounded-md" />
          <img src={spinDex} alt="spindex" className="p-10 relative w-auto h-40 rounded-md" />
          <img src={binDex} alt="bindex" className="p-10 relative w-auto h-40 rounded-md" />
          <img src={chinDex} alt="chindex" className="p-10 relative w-auto h-40 rounded-md" />
          <img src={kingDex} alt="kingdex" className="p-10 relative w-auto h-40 rounded-md" />
          <img src={inDex} alt="index" className="p-10 relative w-auto h-40 rounded-md" />
        </div>
        <p className="text-notosans text-slate-500 text-base pt-8 pb-20 flex justify-center items-center">Teams who love FinDex ☝️</p>
      </div>
      {showHim && (
        <img src={him} alt="him" className="fixed h-auto w-auto bottom-0 right-0" />
      )}
      <div className="relative flex justify-center">
        <button
          onClick={toggleHim}
          className="button-inline-block px-4 py-2 text-white m-5 ml-6 mr-6 rounded-full text-[18px] font-sans font-medium hover:text-blue-500 active:text-green-500 custom-text-color gradient-background2"
        >
          📑👀📊
        </button>
      </div>
    </div>
  );
}

export default MainPage;
