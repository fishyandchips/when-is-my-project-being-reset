import { useEffect, useState } from 'react';
import BlochausLeichhardt from './components/BlochausLeichhardt';
import NavCard from './components/NavCard';

import './App.css';

const App = () => {
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
  const [sectorClicked, setSectorClicked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
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
          <nav className="bg-[#616161] w-screen fixed flex items-center justify-between p-5 z-20 text-white">
            <NavCard
              open={menuOpen}
              isLandscape={isLandscape}
            />
            <div className="relative w-10 h-10 z-50 cursor-pointer" onClick={toggleMenu}>
              <span
                className={`block absolute h-1 w-10 bg-white transform transition duration-300 ease-in-out ${
                  menuOpen ? 'rotate-45 top-4' : 'top-1'
                }`}
              />
              <span
                className={`block absolute h-1 w-10 bg-white transition-opacity duration-300 ease-in-out ${
                  menuOpen ? 'opacity-0' : 'top-4'
                }`}
              />
              <span
                className={`block absolute h-1 w-10 bg-white transform transition duration-300 ease-in-out ${
                  menuOpen ? '-rotate-45 bottom-5' : 'bottom-2'
                }`}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-right">when is my</span>
              <span className="text-right">project being reset?</span>
            </div>
          </nav>

          <div className="bg-[#282828] w-screen h-screen relative flex justify-center items-center">
            <div className="relative max-h-[100vh] max-w-[100vh] h-[100vw] w-[100%]">
              <BlochausLeichhardt setSectorClicked={setSectorClicked}/>
            </div>
          </div>
        </>
      ) : (
        <>
          <nav className="bg-[transparent] w-screen fixed flex items-center justify-between p-5 z-20 text-[2rem] text-white">
            <NavCard
              open={menuOpen}
              isLandscape={isLandscape}
            />
            <div className="relative w-10 h-10 z-50 cursor-pointer" onClick={toggleMenu}>
              <span
                className={`block absolute h-1 w-10 bg-white transform transition duration-300 ease-in-out ${
                  menuOpen ? 'rotate-45 top-4' : 'top-1'
                }`}
              />
              <span
                className={`block absolute h-1 w-10 bg-white transition-opacity duration-300 ease-in-out ${
                  menuOpen ? 'opacity-0' : 'top-4'
                }`}
              />
              <span
                className={`block absolute h-1 w-10 bg-white transform transition duration-300 ease-in-out ${
                  menuOpen ? '-rotate-45 bottom-5' : 'bottom-2'
                }`}
              />
            </div>
          </nav>

          <div className={`bg-[#282828] ${sectorClicked || menuOpen ? "w-[60vw]" : "w-screen"} ${menuOpen ? "left-[40vw]" : "left-0"} h-screen relative flex justify-center items-center transition-all duration-300 ease-in-out`}>
            <div className={`relative max-h-[100vh] max-w-[100vh] ${sectorClicked || menuOpen ? "h-[60vw]" : "h-[100vw]"} w-[100%] transition-all duration-300 ease-in-out`}>
              <BlochausLeichhardt menuOpen={menuOpen} setSectorClicked={setSectorClicked}/>
            </div>

            <div className="flex flex-col absolute bottom-12 left-12 text-white text-[2rem]">
              <span className="text-left">when is my</span>
              <span className="text-left">project being reset?</span>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default App
