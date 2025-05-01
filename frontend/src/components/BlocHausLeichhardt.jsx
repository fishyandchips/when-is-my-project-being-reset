import { useEffect, useState } from 'react';
import axios from 'axios';

import SectorModal from './SectorModal';
import SectorInfoCard from './SectorInfoCard';

const BlocHausLeichhardt = ({ menuOpen, setSectorClicked }) => {
  const [open, setOpen] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [sectorColours, setSectorColours] = useState(Array(6).fill(''));
  const [sectorColour, setSectorColour] = useState('');
  const [sectorName, setSectorName] = useState('');
  const [sectorImages, setSectorImages] = useState([]);
  const [sectorResetDate, setSectorResetDate] = useState('');
  const [infoOpen, setInfoOpen] = useState(false);
  const [isLandscape, setIsLandscape] = useState(window.innerWidth / window.innerHeight > 1);
  
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth / window.innerHeight > 1);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    getSectors('BlocHausLeichhardt');
  }, []);

  useEffect(() => {
    if (sectors.length === 0) {
      return;
    }

    const date = new Date();
    const currentColours = [...sectorColours];

    currentColours.forEach((_, index) => {
      const resetDate = new Date(sectors[index].lastReset);
      const daysSinceReset = (date - resetDate) / (1000 * 60 * 60 * 24);
      
      if (sectors[index].hasEvent) {
        currentColours[index] = '#777bf7';
      } else if (daysSinceReset <= 42 && daysSinceReset > 35) {
        currentColours[index] = '#f77f77';
      } else if (daysSinceReset <= 7) {
        currentColours[index] = '#f7b777';
      } else {
        currentColours[index] = '#ffffff';
      }
    });

    setSectorColours(currentColours);
  }, [sectors]);

  useEffect(() => {
    if (menuOpen) {
      setInfoOpen(false);
      setSectorClicked(false);
    }
  }, [menuOpen]);

  const getSectors = async (gymName) => {
    try {
      const response = await axios.get(`https://when-is-my-project-being-reset.onrender.com/sectors/${gymName}`);
      setSectors(response.data.sectors);
    } catch (err) {
      console.error(err.response.data.error);
    }
  }

  const handleSectorClick = (index) => {
    const sector = sectors[index];
    setSectorColour(sectorColours[index]);
    setSectorName(sector.name);
    setSectorImages(sector.images);
    setSectorResetDate(sector.lastReset);

    if (!isLandscape) {
      handleOpen(); 
    } else {
      setInfoOpen(true);
      setSectorClicked(true);
    }
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <SectorModal 
        open={open}
        handleClose={handleClose}
        bgColor={sectorColour}
        name={sectorName}
        images={sectorImages}
        resetDate={sectorResetDate}
      />

      <svg
        style={{ pointerEvents: 'none' }}
        className="absolute w-[29%] bottom-[19%] left-[11%]"
        viewBox="0 0 45.946663 51.465473"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer1" transform="translate(-41.256573,-130.35785)">
          <path
            d="m 41.689075,130.88008 5.267899,0.99908 20.163343,0.27248 2.452298,1.63487 8.719286,38.05603 7.992676,7.17525 -10.899106,2.36147 -5.449551,-1.36239 -2.724777,-5.17707 -6.721115,-30.51749 -2.17982,-1.54404 -10.989929,0.0908 -5.631204,-4.26881 z"
            id="path4"
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[0],
              stroke: sectorColours[0],
              strokeWidth: 0.865,
              opacity: 1,
              fillOpacity: 0,
              transition: 'fill-opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.fillOpacity = 0.2}
            onMouseLeave={(e) => e.target.style.fillOpacity = 0}
            onClick={() => handleSectorClick(0)}
          />
        </g>
      </svg>

      <svg
        style={{ pointerEvents: 'none' }}
        className="absolute w-[41%] bottom-[21%] left-[11%]"
        viewBox="0 0 64.584068 65.438507"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer1" transform="translate(-41.427401,-113.55304)">
          <path
            d="m 41.870725,125.06722 0.181652,-7.26607 5.903682,-3.81468 24.613812,0.18165 4.632118,2.08899 4.995424,3.81469 2.452298,2.90643 8.628457,20.16334 6.993592,10.71745 3.26973,7.3569 1.99817,9.71837 -6.266984,5.9945 -11.080758,1.63487 6.266987,-1.54404 -0.817433,-9.35507 -0.908259,-4.08716 -12.170666,-16.07618 V 143.959 l -5.540378,-12.35231 -4.722947,-3.36056 -12.624795,-2.99726 z"
            id="path5"
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[1],
              stroke: sectorColours[1],
              strokeWidth: 0.865,
              opacity: 1,
              fillOpacity: 0,
              transition: 'fill-opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.fillOpacity = 0.2}
            onMouseLeave={(e) => e.target.style.fillOpacity = 0}
            onClick={() => handleSectorClick(1)}
          />
        </g>
      </svg>

      <svg
        style={{ pointerEvents: 'none' }}
        className="absolute w-[35%] bottom-[49.7%] left-[18.8%]"
        viewBox="0 0 54.870342 39.013981"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer1" transform="translate(-53.146958,-95.111759)">
          <path
            d="m 53.768915,105.81214 -0.181652,-10.263326 26.430327,0.272478 24.70464,13.351408 2.8156,22.07068 -11.171583,2.36147 -1.816516,-15.07709 -17.62022,-9.53672 -18.346825,-0.0908 z"
            id="path6"
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[2],
              stroke: sectorColours[2],
              strokeWidth: 0.865,
              opacity: 1,
              fillOpacity: 0,
              transition: 'fill-opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.fillOpacity = 0.2}
            onMouseLeave={(e) => e.target.style.fillOpacity = 0}
            onClick={() => handleSectorClick(2)}
          />
        </g>
      </svg>

      <svg
        style={{ pointerEvents: 'none' }}
        className="absolute w-[28%] bottom-[34%] left-[46%]"
        viewBox="0 0 43.439644 62.099747"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer1" transform="translate(-95.685808,-95.841033)">
          <path
            d="m 96.366247,133.51403 11.989013,19.98169 4.63212,3.99634 12.80645,-1.27156 6.90277,-7.26608 5.9945,-15.34957 -0.27248,-11.98901 -12.44314,-25.340419 -12.9881,0.09083 14.44131,28.065189 0.18166,7.3569 -4.72295,11.35323 -5.81285,2.99725 -9.53672,-15.07709 z"
            id="path7"
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[3],
              stroke: sectorColours[3],
              strokeWidth: 0.865,
              opacity: 1,
              fillOpacity: 0,
              transition: 'fill-opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.fillOpacity = 0.2}
            onMouseLeave={(e) => e.target.style.fillOpacity = 0}
            onClick={() => handleSectorClick(3)}
          />
        </g>
      </svg>

      <svg
        style={{ pointerEvents: 'none' }}
        className="absolute w-[31%] bottom-[8.2%] left-[55.6%]"
        viewBox="0 0 48.928085 59.126949"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer1" transform="translate(-110.41162,-139.21703)">
          <path
            d="m 144.21242,139.73774 14.44681,5.11392 -3.57974,5.11391 -1.91772,-0.25569 -0.63924,0.76708 -2.04557,14.31897 1.78988,4.09113 -1.91772,1.27848 -4.47468,8.18226 -1.02278,13.55188 -13.04049,3.83544 -2.04556,2.04557 -18.92149,0.12784 v -9.33289 l 3.96328,-3.4519 17.51517,-2.6848 8.43795,-37.45943 z"
            id="path8"
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[4],
              stroke: sectorColours[4],
              strokeWidth: 0.865,
              opacity: 1,
              fillOpacity: 0,
              transition: 'fill-opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.fillOpacity = 0.2}
            onMouseLeave={(e) => e.target.style.fillOpacity = 0}
            onClick={() => handleSectorClick(4)}
          />
        </g>
      </svg>

      <svg
        style={{ pointerEvents: 'none' }}
        className="absolute w-[16.5%] bottom-[42%] left-[70%]"
        viewBox="0 0 26.064533 75.075119"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer1" transform="translate(-133.02719,-70.390264)">
          <path
            d="m 158.65923,144.85166 v -21.86199 l -12.91264,-32.089821 2.04557,0.511392 0.12785,-20.327815 -6.3924,-0.255696 -4.73037,2.940502 -3.32404,19.432878 10.86707,29.02147 v 17.51516 z"
            id="path9"
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[5],
              stroke: sectorColours[5],
              strokeWidth: 0.865,
              opacity: 1,
              fillOpacity: 0,
              transition: 'fill-opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.fillOpacity = 0.2}
            onMouseLeave={(e) => e.target.style.fillOpacity = 0}
            onClick={() => handleSectorClick(5)}
          />
        </g>
      </svg>

      <SectorInfoCard
        open={infoOpen}
        onClose={() => {setInfoOpen(false); setSectorClicked(false);}}
        bgColor={sectorColour}
        name={sectorName}
        images={sectorImages}
        resetDate={sectorResetDate}
      />
    </>
  )
}

export default BlocHausLeichhardt
