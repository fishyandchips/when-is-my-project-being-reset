import { useEffect, useState } from 'react';
import axios from 'axios';

import SectorModal from './SectorModal';
import SectorInfoCard from './SectorInfoCard';

const NomadAnnandale = ({ menuOpen, setSectorClicked }) => {
  const [open, setOpen] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [sectorColours, setSectorColours] = useState(Array(9).fill(''));
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
    getSectors('NomadAnnandale');
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
        className="absolute w-[7.6%] bottom-[27%] left-[7.9%]"
        viewBox="0 0 15.488797 59.962502"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3-8" transform="translate(-88.31838,-99.259329)">
          <path
            d="m 88.818603,158.78933 h 14.556077 v -53.98755 l -12.112004,-4.888193 0.706093,14.230073 -1.955276,25.85311 0.977638,3.91055 z"
            id="path25" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[0],
              stroke: sectorColours[0],
              strokeWidth: 1.0,
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
        className="absolute w-[23%] bottom-[53.3%] left-[9%]"
        viewBox="0 0 46.767605 36.562046"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3-8" transform="translate(-90.822572,-68.695339)">
          <path
            d="m 103.37468,104.80178 22.81144,-5.322695 10.97156,-20.204751 V 71.45345 l -7.061,-2.17253 v 2.172414 h -4.56232 l -4.01918,8.364355 -0.32588,3.476048 -4.23644,5.105448 C 98.467085,88.326766 91.454085,99.125488 91.454085,99.125488 Z"
            id="path35" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[1],
              stroke: sectorColours[1],
              strokeWidth: 1.0,
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
        className="absolute w-[41.0%] bottom-[60%] left-[27.5%]"
        viewBox="0 0 85.3769 41.84153"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3-8" transform="translate(-127.60027,-50.164661)">
          <path
            d="m 128.03277,50.597161 v 6.952097 l 25.8531,21.725076 h 17.27162 l 3.36742,4.019 h 12.27479 l 7.71248,8.256017 18.0325,-2.281156 V 71.344334 h -6.95259 l -4.1e-4,5.757693 -7.92933,1.520772 -3.80192,-8.255465 h -15.64222 l -5.53995,-5.757 h -18.032 L 139.6558,52.226558 v -1.629397 z"
            id="path26" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[2],
              stroke: sectorColours[2],
              strokeWidth: 1.0,
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
        className="absolute w-[22.5%] bottom-[48%] left-[70%]"
        viewBox="0 0 46.387703 66.367004"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3-8" transform="translate(-215.15319,-50.055834)">
          <path
            d="m 215.58573,50.488334 -5e-5,11.949117 6.19176,4.127883 h 24.87524 V 81.66434 l -10.537,9.341879 v 24.984111 h 11.732 V 97.415182 l 9.12474,-7.603855 4.12781,-25.853106 -2.38978,-9.993639 -18.24926,-0.651758 -2.60703,1.30352 -9.45051,-0.217255 -6.08308,-2.389783 1.1e-4,-1.520972 z"
            id="path27" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[3],
              stroke: sectorColours[3],
              strokeWidth: 1.0,
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
        className="absolute w-[22%] bottom-[20%] left-[24%]"
        viewBox="0 0 46.103039 26.067917"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3-8" transform="translate(-120.21714,-146.99326)">
          <path
            d="m 127.71268,172.62833 -6.9898,3.3e-4 2.30432,-14.67033 h 12.28968 l 9.83175,-6.683 20.73905,-3.764 v 14.36386 l -18.97241,5.29993 -3.91733,3.45621 h -15.28526 z"
            id="path30" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[4],
              stroke: sectorColours[4],
              strokeWidth: 1.0,
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
        className="absolute w-[20%] bottom-[30%] left-[26%]"
        viewBox="0 0 40.749897 44.17836"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3-8" transform="translate(-125.57028,-107.56014)">
          <path
            d="m 130.09377,108.10733 12.36649,4.609 -3.14923,11.06083 4.91588,10.59985 21.66077,9.14045 v 3.99387 l -20.739,3.764 -14.59405,-12.98098 -4.53182,-21.04609 z"
            id="path31" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[5],
              stroke: sectorColours[5],
              strokeWidth: 1.0,
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

      <svg
        style={{ pointerEvents: 'none' }}
        className="absolute w-[35%] bottom-[38.5%] left-[28%]"
        viewBox="0 0 72.802658 46.45166"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3-8" transform="translate(-129.49919,-88.534182)">
          <path
            d="m 130.09377,108.10733 3.53328,-7.37333 14.20995,-11.675204 19.35668,11.014334 5.069,17.12875 10.98397,6.83645 17.50433,6.375 -17.9653,3.917 -11.13741,-5.68368 -13.28823,-12.13606 -0.23043,-2.45794 -5.29993,-6.37527 -5.53035,-1.30578 -4.83865,6.14473 z"
            id="path32" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[6],
              stroke: sectorColours[6],
              strokeWidth: 1.0,
              opacity: 1,
              fillOpacity: 0,
              transition: 'fill-opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.fillOpacity = 0.2}
            onMouseLeave={(e) => e.target.style.fillOpacity = 0}
            onClick={() => handleSectorClick(6)}
          />
        </g>
      </svg>

      <svg
        style={{ pointerEvents: 'none' }}
        className="absolute w-[31.4%] bottom-[40.3%] left-[45.8%]"
        viewBox="0 0 64.013832 39.086826"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3-8" transform="translate(-166.67336,-92.011076)">
          <path
            d="m 167.19368,100.27333 17.28194,-7.75806 5.53036,4.532064 h 13.97952 l 26.26918,7.527186 v 3.99381 h -9.617 v 7.584 l -18.957,14.461 -18.434,-6.375 c 0,0 -10.984,-7.14324 -10.984,-6.836 0,0.30724 -5.069,-17.129 -5.069,-17.129 z"
            id="path33" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[7],
              stroke: sectorColours[7],
              strokeWidth: 1.0,
              opacity: 1,
              fillOpacity: 0,
              transition: 'fill-opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.fillOpacity = 0.2}
            onMouseLeave={(e) => e.target.style.fillOpacity = 0}
            onClick={() => handleSectorClick(7)}
          />
          <path
            d="m 179.25016,104.8561 -0.76039,6.08308 7.54955,3.20448 13.74125,2.33547 4.01918,-3.04154 2.38978,-4.61663 -5.92014,-2.28115 -6.68053,0.21725 -11.73166,-5.37701 z"
            id="path34" 
            style={{
              fill: '#282828',
              stroke: sectorColours[7],
              strokeWidth: 1.0,
              opacity: 1
            }}
          />
        </g>
      </svg>

      <svg
        style={{ pointerEvents: 'none' }}
        className="absolute w-[22.2%] bottom-[21%] left-[53.5%]"
        viewBox="0 0 45.966122 55.678562"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3-8" transform="translate(-181.42962,-115.71983)">
          <path
            d="m 182.78579,134.53033 2.45794,18.35802 -3.30285,9.83175 11.13752,8.0651 3.91734,-5.83787 27.7286,2.7e-4 2.22751,-13.82589 -6.14484,-18.43453 3.49997,-16.53485 h -3.6693 l -18.957,14.46095 z"
            id="path28" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[8],
              stroke: sectorColours[8],
              strokeWidth: 1.0,
              opacity: 1,
              fillOpacity: 0,
              transition: 'fill-opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.fillOpacity = 0.2}
            onMouseLeave={(e) => e.target.style.fillOpacity = 0}
            onClick={() => handleSectorClick(8)}
          />
          <path
            d="m 199.56368,143.63576 -3.6e-4,7.76657 h 9.50436 v -7.76657 z"
            id="path29" 
            style={{
              fill: '#282828',
              stroke: sectorColours[8],
              strokeWidth: 1.0,
              opacity: 1
            }}
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

export default NomadAnnandale
