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
      const response = await axios.get(`http://localhost:5000/sectors/${gymName}`);
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
        className="absolute w-[19%] bottom-[46.2%] left-[20.8%]"
        viewBox="0 0 40.78677 107.53622"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3" transform="translate(-38.654092,-32.915835)">
          <path
            d="m 64.089634,33.348334 h 14.88183 l -2.17253,26.504866 -25.4186,30.524047 0.760386,15.642213 7.169348,10.86265 4.127807,14.66458 v 8.47287 H 52.14072 l 0.108625,-4.01919 -5.21407,-15.96809 -7.929734,-11.40578 1.955276,-14.230073 6.843469,-13.361059 21.39942,-25.309975 1.303517,-15.859469 -6.517589,-0.434504 z"
            id="path24" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[0],
              stroke: sectorColours[0],
              strokeWidth: 1.2,
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
        className="absolute w-[12.7%] bottom-[32%] left-[32%]"
        viewBox="0 0 27.402361 93.856186"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3" transform="translate(-62.403881,-77.460566)">
          <path
            d="m 89.369055,170.88424 h -2.803584 l -15.74616,-11.04152 -1.420993,-6.98976 3.878932,-9.02524 1.805046,-22.19824 -12.212876,-22.006218 2.918802,-10.062181 21.545353,-11.387159 0.09601,8.18032 -14.344365,7.469825 -0.883322,1.805048 6.605706,10.446235 5.914411,13.28822 -2.304317,28.4583 -3.418067,7.94989 10.273407,6.20245 z"
            id="path23"
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[1],
              stroke: sectorColours[1],
              strokeWidth: 1.2,
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
        className="absolute w-[20.9%] bottom-[32%] left-[43.7%]"
        viewBox="0 0 45.078999 93.90274"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3" transform="translate(-87.628845,-77.473029)">
          <path
            d="m 88.140086,77.924286 5.376739,0.230431 37.406725,29.188003 1.34419,28.53511 -18.31931,21.35333 -21.122901,13.71068 -3.456474,-0.0384 0.07681,-9.33248 16.399055,-10.56145 15.86137,-18.70337 -0.80651,-20.93087 -32.836503,-24.88661 z"
            id="path22" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[2],
              stroke: sectorColours[2],
              strokeWidth: 1.2,
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
        className="absolute w-[19.5%] bottom-[5%] left-[61.7%]"
        viewBox="0 0 41.949642 91.674316"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3" transform="translate(-127.01078,-138.07818)">
          <path
            d="m 147.45799,138.51422 20.66107,0.30161 -17.29553,23.73591 -1.88791,2.59091 -6.10643,18.35771 17.24396,19.35626 7.94989,14.17154 -5.26152,8.10351 -17.43599,-0.0768 -0.0384,4.26299 -7.71946,-0.0384 -0.11522,-12.09766 4.60863,-3.22604 5.18471,0.0384 -0.0768,-11.55999 -19.6635,-21.08449 8.48757,-24.19532 z"
            id="path21" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[3],
              stroke: sectorColours[3],
              strokeWidth: 1.2,
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
        className="absolute w-[12.2%] bottom-[47.5%] left-[69%]"
        viewBox="0 0 26.450081 109.70098"
        version="1.1"
        id="svg1"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer3" transform="translate(-142.47924,-28.755504)">
          <path
            d="m 156.92392,29.188002 h 9.67813 l -0.30724,23.427214 1.15215,17.512802 -4.99268,3.226041 -0.30724,26.576445 -4.22458,20.738846 10.52304,4.30139 0.0496,13.04767 -20.61158,-0.26225 2.74189,-4.87394 -7.68106,-9.29407 4.3782,-21.43014 0.15362,-29.034382 8.83322,-6.221653 z"
            id="path20" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[4],
              stroke: sectorColours[4],
              strokeWidth: 1.2,
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
