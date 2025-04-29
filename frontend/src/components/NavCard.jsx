import Link from '@mui/material/Link';

const NavCard = ({ open, isLandscape }) => {
  return (
    <>
      {isLandscape ? (
        <div
          className={`fixed top-0 left-0 h-screen w-[40vw] bg-[#616161] text-white p-4 flex flex-col justify-between gap-2 shadow-lg z-30 transition-transform duration-300 ease-in-out ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mt-[7rem] text-center flex flex-col gap-4">
            <h1 className="border-b border-white pb-2"><strong>gyms</strong></h1>
            <Link href="#" underline="hover" sx={{ color: 'white' }}>blochaus leichhardt</Link>
            <Link href="#" underline="hover" sx={{ color: 'white' }}>blochaus marrickville</Link>
            <Link href="#" underline="hover" sx={{ color: 'white' }}>9 degrees waterloo</Link>
          </div>

          <div>
            <h2>
              something not quite right? email us here:
              <a href="mailto:wimpbr@gmail.com" className="underline ml-1 text-white">wimpbr@gmail.com</a>
            </h2>
          </div>
        </div>
      ) : (
        <div
          className={`fixed top-0 left-0 w-screen h-screen bg-[#616161] text-white p-10 flex flex-col justify-between gap-2 shadow-lg z-30 transition-transform duration-300 ease-in-out ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="mt-[7rem] text-center flex flex-col gap-4">
            <h1 className="border-b border-white pb-3 text-[5rem]"><strong>gyms</strong></h1>
            <Link href="#" underline="hover" sx={{ color: 'white', fontSize: 60 }}>blochaus leichhardt</Link>
            <Link href="#" underline="hover" sx={{ color: 'white', fontSize: 60 }}>blochaus marrickville</Link>
            <Link href="#" underline="hover" sx={{ color: 'white', fontSize: 60 }}>9 degrees waterloo</Link>
          </div>

          <div>
            <h2 className="text-[3rem]">
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
