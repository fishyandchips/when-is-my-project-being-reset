import { useEffect, useState } from 'react';
import axios from 'axios';

import SectorModal from './SectorModal';
import SectorInfoCard from './SectorInfoCard';

const NineDegreesWaterloo = ({ menuOpen, setSectorClicked }) => {
  const [open, setOpen] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [sectorColours, setSectorColours] = useState(Array(5).fill(''));
  const [sectorColour, setSectorColour] = useState('');
  const [sectorName, setSectorName] = useState('');
  const [sectorImages, setSectorImages] = useState([]);
  const [sectorResetDate, setSectorResetDate] = useState('');
  const [sectorCurrInterval, setSectorCurrInterval] = useState('');
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
    getSectors('NineDegreesWaterloo');
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
      } else if (daysSinceReset <= sectors[index].currInterval && daysSinceReset > sectors[index].currInterval - 7) {
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
    setSectorCurrInterval(sector.currInterval);

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
        currInterval={sectorCurrInterval}
      />

      <svg
        style={{ pointerEvents: 'none' }}
        className="absolute w-[23%] bottom-[46.2%] left-[16.8%]"
        viewBox="0 0 49.267185 107.53667"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3" transform="translate(-30.173673,-32.915836)">
          <path
            d="m 64.089634,33.348334 h 14.88183 l -2.17253,26.504866 -25.4186,30.524047 0.760386,15.642213 7.169348,10.86265 4.127807,14.66458 V 140.02 H 46.519299 L 46.519,135.94607 41.087979,120.30386 33.23971,109.06101 31.653165,101.64483 30.614584,89.403742 40.409058,68.977827 61.482597,39.431 h 2.607037 z"
            id="path24" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[0],
              stroke: sectorColours[0],
              strokeWidth: 1.3,
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
        className="absolute w-[19%] bottom-[32%] left-[31.8%]"
        viewBox="0 0 40.691261 93.868034"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3" transform="translate(-62.403883,-77.448739)">
          <path
            d="m 89.369,170.88424 -2.803529,-2.4e-4 -15.74616,-11.04128 -1.420993,-6.98976 3.878932,-9.02524 1.805046,-22.19824 L 62.86942,99.623262 65.788222,89.561081 88.14,78.155 v 8.334 l 14.511,27.222 -3.811,35.758 -9.471,12.102 z"            id="path23"
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[1],
              stroke: sectorColours[1],
              strokeWidth: 1.3,
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
        className="absolute w-[21.1%] bottom-[32%] left-[43.7%]"
        viewBox="0 0 45.000343 93.594292"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3" transform="translate(-87.628845,-77.473029)">
          <path
            d="m 88.140086,78.155 5.376739,-2.83e-4 37.406725,29.188003 1.34419,28.53511 -18.31931,21.35333 L 92.825529,170.884 H 89.369 v -9.313 L 98.84,149.469 102.651,113.711 88.14,86.489 Z"
            id="path22" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[2],
              stroke: sectorColours[2],
              strokeWidth: 1.3,
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
        className="absolute w-[21.5%] bottom-[5%] left-[61.7%]"
        viewBox="0 0 46.129898 91.482018"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3" transform="translate(-127.01058,-138.4215)">
          <path
            d="m 147.458,138.854 h 25.25 v 90.617 h -35.14 v -12.28918 l 4.49308,-3.22582 h 5.18492 v -11.52181 l -19.74051,-21.08449 8.48757,-24.19532 z"
            id="path21" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[3],
              stroke: sectorColours[3],
              strokeWidth: 1.3,
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
        className="absolute w-[14.2%] bottom-[47.3%] left-[69%]"
        viewBox="0 0 30.662453 110.50401"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3" transform="translate(-142.47805,-28.7825)">
          <path
            d="m 156.924,29.215 h 15.784 v 109.639 h -25.25 l 3.16741,-5.97178 -7.68106,-9.29407 4.53165,-21.43014 V 73.123631 l 9.448,-6.221653 z"
            id="path20" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[4],
              stroke: sectorColours[4],
              strokeWidth: 1.3,
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

      <SectorInfoCard
        open={infoOpen}
        onClose={() => {setInfoOpen(false); setSectorClicked(false);}}
        bgColor={sectorColour}
        name={sectorName}
        images={sectorImages}
        resetDate={sectorResetDate}
        currInterval={sectorCurrInterval}
      />
    </>
  )
}

export default NineDegreesWaterloo
