import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavCard from './components/NavCard';
import MenuIcon from './components/MenuIcon';
import BlocHausLeichhardt from './components/BlocHausLeichhardt';
import BlocHausMarrickville from './components/BlocHausMarrickville';

import './App.css';

const Pages = () => {
  const [isLandscape, setIsLandscape] = useState(window.innerWidth / window.innerHeight > 1);
  const [sectorClicked, setSectorClicked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth / window.innerHeight > 1);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (sectorClicked) {
      setMenuOpen(false);
    }
  }, [sectorClicked]);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <>
      {!isLandscape ? (
        <>
          <nav className="bg-[#616161] w-screen h-[12vw] fixed flex items-center top-0 justify-between pl-7 pr-7 z-20 text-[3vw] text-white">
            <NavCard
              open={menuOpen}
              setOpen={setMenuOpen}
              isLandscape={isLandscape}
            />

            <MenuIcon
              toggleMenu={toggleMenu}
              menuOpen={menuOpen}
            />

            <div className="flex flex-col text-[2.7vw]">
              <span className="text-right">when is my</span>
              <span className="text-right">project being reset?</span>
            </div>
          </nav>

          <div className="bg-[#282828] w-screen top-[10vw] h-[calc(100vh-12vw)] relative flex justify-center items-center">
            <div className="relative max-h-[90vh] max-w-[90vh] h-[100vw] w-[100%]">
            <Routes>
              <Route path="/" element={<BlocHausLeichhardt menuOpen={menuOpen} setSectorClicked={setSectorClicked}/>} />
              <Route path="/BlocHausLeichhardt" element={<BlocHausLeichhardt menuOpen={menuOpen} setSectorClicked={setSectorClicked}/>} />
              <Route path="/BlocHausMarrickville" element={<BlocHausMarrickville menuOpen={menuOpen} setSectorClicked={setSectorClicked}/>} />
            </Routes>
            </div>
          </div>
        </>
      ) : (
        <>
          <nav className="bg-[transparent] w-screen fixed flex items-center justify-between p-5 z-20 text-[2vw] text-white">
            <NavCard
              open={menuOpen}
              setOpen={setMenuOpen}
              isLandscape={isLandscape}
            />

            <MenuIcon
              toggleMenu={toggleMenu}
              menuOpen={menuOpen}
            />
          </nav>

          <div className={`bg-[#282828] ${sectorClicked || menuOpen ? "w-[60vw]" : "w-screen"} ${menuOpen ? "left-[40vw]" : "left-0"} h-screen relative flex justify-center items-center transition-all duration-300 ease-in-out`}>
            <div className={`relative max-h-[90vh] max-w-[90vh] ${sectorClicked || menuOpen ? "h-[60vw]" : "h-[100vw]"} w-[100%] transition-all duration-300 ease-in-out`}>
              <Routes>
                <Route path="/" element={<BlocHausLeichhardt menuOpen={menuOpen} setSectorClicked={setSectorClicked}/>} />
                <Route path="/BlocHausLeichhardt" element={<BlocHausLeichhardt menuOpen={menuOpen} setSectorClicked={setSectorClicked}/>} />
                <Route path="/BlocHausMarrickville" element={<BlocHausMarrickville menuOpen={menuOpen} setSectorClicked={setSectorClicked}/>} />
              </Routes>
            </div>

            <div
              className={`flex flex-col absolute bottom-12 left-12 text-white text-[2vw] drop-shadow-lg transition-all duration-300 ease-in-out
                ${menuOpen || sectorClicked ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <span className="text-left">when is my</span>
              <span className="text-left">project being reset?</span>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Pages