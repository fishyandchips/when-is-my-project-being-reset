import { Link } from 'react-router-dom';

const NavCard = ({ open, setOpen, isLandscape }) => {
  return (
    <>
      {isLandscape ? (
        <div
          className={`fixed top-0 left-0 w-[40vw] h-[100dvh] bg-[#616161] text-white p-4 flex flex-col justify-between shadow-lg z-30 overflow-y-auto transition-transform duration-300 ease-in-out ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mt-[5vw] text-center flex flex-col gap-[2vw]">
            <h1 className="border-b border-white pb-2 text-[3vw]"><strong>gyms</strong></h1>
            <Link to="/BlocHausLeichhardt" style={{ color: 'white' }} onClick={() => setOpen(false)}>blochaus leichhardt</Link>
            <Link to="/BlocHausMarrickville" style={{ color: 'white' }} onClick={() => setOpen(false)}>blochaus marrickville</Link>
          </div>

          <div className="text-center">
            <h2 className="text-[1.5vw]">
              something not quite right? email us here:
              <a href="mailto:wimpbr@gmail.com" className="underline ml-1 text-white">wimpbr@gmail.com</a>
            </h2>
          </div>
        </div>
      ) : (
        <div
          className={`fixed top-0 left-0 w-screen h-[100dvh] bg-[#616161] text-white p-10 flex flex-col justify-between gap-2 shadow-lg z-30 overflow-y-auto transition-transform duration-300 ease-in-out ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="mt-[5vw] text-center text-[5vw] flex flex-col gap-[2vw]">
            <h1 className="border-b border-white pb-3 text-[7vw]"><strong>gyms</strong></h1>
            <Link to="/BlocHausLeichhardt" style={{ color: 'white' }} onClick={() => setOpen(false)}>blochaus leichhardt</Link>
            <Link to="/BlocHausMarrickville" style={{ color: 'white' }} onClick={() => setOpen(false)}>blochaus marrickville</Link>
          </div>

          <div className="text-center">
            <h2 className="text-[4vw]">
              something not quite right? email us here:
              <a href="mailto:wimpbr@gmail.com" className="underline ml-1 text-white">wimpbr@gmail.com</a>
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default NavCard
