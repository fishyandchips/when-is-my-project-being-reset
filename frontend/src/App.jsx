import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import BlochausLeichhardt from './components/BlochausLeichhardt';

import './App.css';

function App() {
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {!isLandscape ? (
        <>
          <nav className="bg-[#616161] w-screen fixed flex items-center justify-between p-5 z-20 text-white">
            <MenuIcon sx={{ fontSize: "4rem" }}/>
            <div className="flex flex-col">
              <span className="text-right">when is my</span>
              <span className="text-right">project being reset?</span>
            </div>
          </nav>

          <div className="bg-[#282828] w-screen h-screen relative flex justify-center items-center">
            <div className="relative max-h-[100vh] max-w-[100vh] h-[100vw] w-[100%]">
              <BlochausLeichhardt />
            </div>
          </div>
        </>
      ) : (
        <>
          <nav className="bg-[transparent] w-screen fixed flex items-center justify-between p-5 z-20 text-[2rem] text-white">
            <MenuIcon sx={{ fontSize: "4rem" }}/>
          </nav>

          <div className="bg-[#282828] w-screen h-screen relative flex justify-center items-center">
            <div className="relative max-h-[100vh] max-w-[100vh] h-[100vw] w-[100%]">
              <BlochausLeichhardt />
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
