import { useEffect, useState } from 'react';
import axios from 'axios';

import SectorModal from './SectorModal';
import SectorInfoCard from './SectorInfoCard';

const BlocHausMarrickville = ({ menuOpen, setSectorClicked }) => {
  const [open, setOpen] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [sectorColours, setSectorColours] = useState(Array(11).fill(''));
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
    getSectors('BlocHausMarrickville');
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
        className="absolute w-[14.3%] bottom-[9%] left-[15.5%]"
        viewBox="0 0 32.361347 71.531731"
        version="1.1"
        id="svg1"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer2" transform="translate(-24.876747,-155.95962)">
          <path
            d="m 36.160844,156.39565 20.430877,0.1808 -7.232169,17.35721 -7.774583,35.79924 0.180806,13.0179 -13.198708,4.1585 -0.361608,-8.4978 -1.446435,-0.54242 -1.446433,-19.52685 2.892868,-13.74112 5.424125,-10.66745 1.446434,-4.88172 z"
            id="path1" 
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
        className="absolute w-[14.8%] bottom-[40.4%] left-[19.7%]"
        viewBox="0 0 33.017292 57.131699"
        version="1.1"
        id="svg1"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer2" transform="translate(-34.312771,-99.879868)">
          <path
            d="m 36.251247,156.39565 7.232169,-11.11946 2.350455,-1.98885 -11.029058,-26.57821 9.853829,-13.65072 4.881713,-2.71207 9.401821,2.80247 1.71764,3.16407 -0.0904,-2.35045 6.328148,0.0904 v 2.53126 l -8.045788,43.93542 -2.531258,6.05694 z"
            id="path2"
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
        className="absolute w-[20.5%] bottom-[72%] left-[43%]"
        viewBox="0 0 46.59687 22.750048"
        version="1.1"
        id="svg1"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer2" transform="translate(-85.544279,-63.217636)">
          <path
            d="m 87.256185,85.530239 -1.086707,-3.771514 -0.191773,-11.762006 0.831011,-3.132273 35.669564,-3.196196 9.0772,10.547451 -10.48353,10.803146 z"
            id="path3" 
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
        className="absolute w-[25%] bottom-[59.5%] left-[59%]"
        viewBox="0 0 55.986664 67.285583"
        version="1.1"
        id="svg1"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer2" transform="translate(-121.83534,-46.340132)">
          <path
            d="m 122.41435,63.66825 10.6753,-11.506311 24.03541,-5.369612 8.05441,3.387971 8.43797,15.149975 3.70758,23.076543 0.0639,8.629731 -6.07278,15.980983 -15.46959,-8.05441 6.77594,-18.729719 -1.53418,-13.487953 -9.39682,-7.606948 -20.26389,9.077201 z"
            id="path10" 
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
        className="absolute w-[26.5%] bottom-[46.1%] left-[54.7%]"
        viewBox="0 0 60.321365 47.26664"
        version="1.1"
        id="svg1"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer2" transform="translate(-111.86005,-96.644104)">
          <path
            d="m 156.03404,104.86645 15.18756,8.04579 -9.04022,4.3393 -15.72996,-0.0904 -18.89404,-5.69533 -0.81362,6.78016 3.34488,7.23217 6.96096,6.32815 2.07925,-1.44644 5.69533,8.13619 -5.15292,3.79689 -8.769,1.17523 -18.53244,-6.59935 9.31142,-39.505728 6.87056,4.791308 17.89962,4.2489 z"
            id="path11"
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
        className="absolute w-[18%] bottom-[27.1%] left-[66.7%]"
        viewBox="0 0 39.659241 65.209618"
        version="1.1"
        id="svg1"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer2" transform="translate(-138.5539,-120.51986)">
          <path
            d="m 144.74481,138.44447 -5.59427,-8.03836 11.84029,-8.6358 3.6933,-0.8147 11.84029,0.8147 7.06072,7.44091 3.58468,13.68694 0.59744,5.81151 -8.36424,12.81793 0.76039,4.61663 -6.46328,11.73166 h -3.09585 l -1.95528,2.33547 0.16294,2.55272 -6.08308,2.33547 0.0543,-21.88824 11.62303,-9.77638 -0.76038,-10.91697 -2.93292,-6.24602 -3.91055,-2.71566 -9.07031,1.52077 z"
            id="path12"
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

      <svg
        style={{ pointerEvents: 'none' }}
        className="absolute w-[22%] bottom-[20%] left-[48.8%]"
        viewBox="0 0 48.672585 62.99588"
        version="1.1"
        id="svg1"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer2" transform="translate(-99.404665,-138.13963)">
          <path
            d="m 111.88529,138.71604 18.62945,6.95209 9.34188,-0.32588 2.76997,2.00959 4.99682,27.4282 -4.01918,7.0064 -14.88183,12.32911 -17.16299,6.51759 -11.677346,-11.40578 z"
            id="path16" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[6],
              stroke: sectorColours[6],
              strokeWidth: 0.865,
              opacity: 1,
              fillOpacity: 0,
              transition: 'fill-opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.fillOpacity = 0.2}
            onMouseLeave={(e) => e.target.style.fillOpacity = 0}
            onClick={() => handleSectorClick(6)}
          />
          <path
            d="m 114.27507,184.82798 0.3802,-11.78597 5.53995,-14.44732 1.41214,-1.1949 -2.44409,-5.7572 5.64858,-1.41214 6.02877,3.74761 1.35783,8.74443 3.47605,6.08309 z"
            id="path17"
            style={{
              fill: '#282828',
              stroke: sectorColours[10],
              strokeWidth: 0.865,
              opacity: 1,
            }}
          />
        </g>
      </svg>

      <svg
        style={{ pointerEvents: 'none' }}
        className="absolute w-[23%] bottom-[21%] left-[27%]"
        viewBox="0 0 51.487278 55.277252"
        version="1.1"
        id="svg1"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer2" transform="translate(-51.07218,-143.69694)">
          <path
            d="m 94.016093,188.41624 -42.399415,9.98537 4.14777,-22.65911 9.985369,-24.57937 1.113753,-6.83614 6.605704,3.03402 -10.484638,28.07425 4.301392,4.53182 9.063643,0.15362 6.605704,-4.68544 4.685443,-16.20702 1.728237,-8.56438 12.673735,3.34126 z"
            id="path15"
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[7],
              stroke: sectorColours[7],
              strokeWidth: 0.865,
              opacity: 1,
              fillOpacity: 0,
              transition: 'fill-opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.fillOpacity = 0.2}
            onMouseLeave={(e) => e.target.style.fillOpacity = 0}
            onClick={() => handleSectorClick(7)}
          />
        </g>
      </svg>

      <svg
        style={{ pointerEvents: 'none' }}
        className="absolute w-[12%] bottom-[44%] left-[33.8%]"
        viewBox="0 0 27.058065 57.090412"
        version="1.1"
        id="svg1"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer2" transform="translate(-66.340781,-90.972028)">
          <path
            d="M 73.546085,147.43782 66.825163,144.4038 73.43087,106.99707 87.256764,91.404534 h 4.915877 l 0.768104,7.604244 -9.754936,5.760792 -3.533286,10.06218 -1.53621,10.59985 0.307242,7.45062 -3.917339,8.91002 z"
            id="path13" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[8],
              stroke: sectorColours[8],
              strokeWidth: 0.865,
              opacity: 1,
              fillOpacity: 0,
              transition: 'fill-opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.fillOpacity = 0.2}
            onMouseLeave={(e) => e.target.style.fillOpacity = 0}
            onClick={() => handleSectorClick(8)}
          />
        </g>
      </svg>

      <svg
        style={{ pointerEvents: 'none' }}
        className="absolute w-[11.8%] bottom-[41.1%] left-[43.9%]"
        viewBox="0 0 26.528154 63.719776"
        version="1.1"
        id="svg1"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer2" transform="translate(-88.846645,-90.893375)">
          <path
            d="m 92.134234,91.481345 0.844918,7.527433 1.651425,-1.036942 h 3.110826 l 1.15216,1.344184 -9.548268,51.45756 12.659095,3.30835 12.90417,-56.378932 -4.76226,-6.375275 z"
            id="path14" 
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[9],
              stroke: sectorColours[9],
              strokeWidth: 0.865,
              opacity: 1,
              fillOpacity: 0,
              transition: 'fill-opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.fillOpacity = 0.2}
            onMouseLeave={(e) => e.target.style.fillOpacity = 0}
            onClick={() => handleSectorClick(9)}
          />
        </g>
      </svg>

      <svg
        style={{ pointerEvents: 'none' }}
        className="absolute w-[18.6%] bottom-[62.6%] left-[58.7%]"
        viewBox="0 0 42.209286 42.222748"
        version="1.1"
        id="svg1"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <defs id="defs1" />
        <g id="layer2" transform="translate(-120.9003,-64.617695)">
          <path
            d="m 121.3358,84.837295 0.21725,12.492046 7.06072,4.888189 17.86906,4.18212 9.50482,-1.57508 6.68053,-18.738071 -1.57508,-13.306745 -9.34188,-7.658169 -20.42178,9.124625 z"
            id="path18"
            style={{
              pointerEvents: 'visiblePainted',
              fill: sectorColours[10],
              stroke: sectorColours[10],
              strokeWidth: 0.865,
              opacity: 1,
              fillOpacity: 0,
              transition: 'fill-opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.fillOpacity = 0.2}
            onMouseLeave={(e) => e.target.style.fillOpacity = 0}
            onClick={() => handleSectorClick(10)}
          />
          <path
            d="m 133.26628,88.754571 9.21726,-11.444769 6.37527,-0.499269 1.07535,5.146305 -2.34272,5.952818 -8.64119,4.032551 -3.37966,-0.0384 z"
            id="path19" 
            style={{
              fill: '#282828',
              stroke: sectorColours[10],
              strokeWidth: 0.865,
              opacity: 1,
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
      />
    </>
  )
}

export default BlocHausMarrickville
