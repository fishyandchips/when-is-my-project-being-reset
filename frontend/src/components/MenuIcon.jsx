const MenuIcon = ({ toggleMenu, menuOpen, isLandscape }) => {
  return (
    <>
      {isLandscape ? (
        <div className="relative w-[3vw] h-[3vw] z-50 cursor-pointer" onClick={toggleMenu}>
          <span
            className={`block absolute h-[0.3vw] w-full bg-white transform transition duration-300 ease-in-out ${
              menuOpen ? 'rotate-45 top-[1.2vw]' : 'top-[0.4vw]'
            }`}
          />
          <span
            className={`block absolute h-[0.3vw] w-full bg-white transition-opacity duration-300 ease-in-out ${
              menuOpen ? 'opacity-0 top-[1.2vw]' : 'top-[1.2vw]'
            }`}
          />
          <span
            className={`block absolute h-[0.3vw] w-full bg-white transform transition duration-300 ease-in-out ${
              menuOpen ? '-rotate-45 top-[1.2vw]' : 'bottom-[0.6vw]'
            }`}
          />
        </div>
      ) : (
        <div className="relative w-[6vw] h-[6vw] z-50 cursor-pointer m-3" onClick={toggleMenu}>
          <span
            className={`block absolute h-[0.6vw] w-full bg-white transform transition duration-300 ease-in-out ${
              menuOpen ? 'rotate-45 top-[2.4vw]' : 'top-[0.8vw]'
            }`}
          />
          <span
            className={`block absolute h-[0.6vw] w-full bg-white transition-opacity duration-300 ease-in-out ${
              menuOpen ? 'opacity-0 top-[2.4vw]' : 'top-[2.4vw]'
            }`}
          />
          <span
            className={`block absolute h-[0.6vw] w-full bg-white transform transition duration-300 ease-in-out ${
              menuOpen ? '-rotate-45 top-[2.4vw]' : 'bottom-[1.2vw]'
            }`}
          />
        </div>
      )}
    </>
  );
};

export default MenuIcon
