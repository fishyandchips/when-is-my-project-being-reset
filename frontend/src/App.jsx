import MenuIcon from '@mui/icons-material/Menu';
import BlochausLeichhardt from './components/BlochausLeichhardt';

import './App.css';

function App() {
  return (
    <>
      <nav className="bg-[#616161] w-screen fixed flex items-center justify-between p-5 z-20 text-[2rem] text-white">
        <MenuIcon sx={{ fontSize: "4rem" }}/>
        <div className="flex flex-col">
          <span className="text-right">when is my</span>
          <span className="text-right">project being reset?</span>
        </div>
      </nav>

      <div className="bg-[#282828] w-screen h-screen relative flex justify-center items-center">
        <div className="relative h-[100vw] w-[100%]">
          <BlochausLeichhardt />
        </div>
      </div>
    </>
  )
}

export default App
