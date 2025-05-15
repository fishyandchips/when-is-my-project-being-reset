import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

const SectorInfoCard = ({ open, onClose, bgColor, name, images, resetDate, currInterval }) => {  
  const formatDate = (resetDate) => {
    const today = new Date();
    const lastReset = new Date(resetDate);
    const diffInDays = Math.round((today - lastReset) / (1000 * 60 * 60 * 24));
      
    if (diffInDays >= currInterval - 7 && diffInDays <= currInterval) {
      const daysUntilNextReset = currInterval - diffInDays;
      return (
        <>
          {daysUntilNextReset === 0 ? (
            <>
              <h2 className="text-[2vw] text-center">will be reset</h2>
              <h2 className="text-[2vw] text-center"><strong>today</strong>.</h2>
            </>
          ) : (
            <>
              <h2 className="text-[2vw] text-center">will be reset in</h2>
              <h2 className="text-[2vw] text-center"><strong>{daysUntilNextReset} day{daysUntilNextReset !== 1 ? 's' : ''}</strong>.</h2>
            </>
          )}
        </>
      );
    }
  
    if (diffInDays >= 0 && diffInDays <= 7) {
      return (
        <>
          <h2 className="text-[2vw] text-center">was reset</h2>
          {diffInDays === 0 ? (
            <h2 className="text-[2vw] text-center"><strong>today</strong>!</h2>
          ) : (
            <h2 className="text-[2vw] text-center"><strong>{diffInDays} day{diffInDays !== 1 ? 's' : ''}</strong> ago!</h2>
          )}
        </>
      );
    }
  
    const nextReset = new Date(lastReset);
    nextReset.setDate(nextReset.getDate() + currInterval);
  
    const day = String(nextReset.getDate()).padStart(2, '0');
    const month = String(nextReset.getMonth() + 1).padStart(2, '0');
  
    return (
      <>
        <h2 className="text-[2vw] text-center">will be reset on</h2>
        <h2 className="text-[2vw] text-center"><strong>{day}/{month}</strong>.</h2>
      </>
    );
  };
  
  return (
    <div
      style={{ backgroundColor: bgColor === '#ffffff' ? '#616161' : bgColor }}
      className={`fixed top-0 right-0 h-screen w-[40vw] text-white p-4 flex flex-col gap-2 shadow-lg z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="text-[3vw]">{name}</h1>
        <CloseIcon onClick={onClose} sx={{ cursor: 'pointer', ml: 1, fontSize: '5vw' }}>Close</CloseIcon>
      </Box>

      {images.length > 1 ? (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-touch="true">
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="carousel-inner">
            {images.map((image, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <img src={image} className="object-contain max-h-[50vh] border-4 border-white mx-auto border-opacity-50" alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      ) : images.length === 1 ? (
        <div>
          <img src={images[0]} className="object-contain max-h-[50vh] border-4 border-white mx-auto border-opacity-50" alt="Slide 1" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center min-h-[50vh] bg-[#282828]">
          <ImageNotSupportedIcon sx={{ ml: 1, fontSize: '5vw', opacity: 0.5 }}></ImageNotSupportedIcon>
          <h1 className="opacity-50 text-center text-[2vw]">No images to display</h1>
        </div>
      )}
      <h3 className="text-center opacity-50 text-[1.2vw]">NOTE: Images may not always be accurate.</h3>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        {formatDate(resetDate)}
      </Box>
    </div>
  );
};


export default SectorInfoCard
