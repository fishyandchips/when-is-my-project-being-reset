import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const SectorModal = ({ open, handleClose, bgColor, name, images, resetDate, currInterval }) => {
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
              <h2 className="text-[4vw] text-center">will be reset</h2>
              <h2 className="text-[4vw] text-center"><strong>today</strong>.</h2>
            </>
          ) : (
            <>
              <h2 className="text-[4vw] text-center">will be reset in</h2>
              <h2 className="text-[4vw] text-center"><strong>{daysUntilNextReset} day{daysUntilNextReset !== 1 ? 's' : ''}</strong>.</h2>
            </>
          )}
        </>
      );
    }
  
    if (diffInDays > 0 && diffInDays <= 7) {
      return (
        <>
          <h2 className="text-[4vw] text-center">was reset</h2>
          {diffInDays === 0 ? (
            <h2 className="text-[4vw] text-center"><strong>today</strong>!</h2>
          ): (
            <h2 className="text-[4vw] text-center"><strong>{diffInDays} day{diffInDays !== 1 ? 's' : ''}</strong> ago!</h2>
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
        <h2 className="text-[4vw] text-center">will be reset on</h2>
        <h2 className="text-[4vw] text-center"><strong>{day}/{month}</strong>.</h2>
      </>
    );
  };
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    height: '85%',
    bgcolor: bgColor === '#ffffff' ? '#616161' : bgColor,
    color: '#ffffff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
    display: 'flex', 
    flexDirection: 'column', 
    gap: 1,
    overflowY: 'auto',
    outline: 'none'
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-sector"
        aria-describedby="modal-sector"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="text-[5vw]">{name}</h1>
            <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer', ml: 1, fontSize: '8vw' }}>Close</CloseIcon>
          </Box>

          {images.length > 1 ? (
            <div id="carouselModal" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#carouselModal"
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

              <button className="carousel-control-prev" type="button" data-bs-target="#carouselModal" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselModal" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          ) : images.length === 1 ? (
            <div>
              <img src={images[0]} className="object-contain max-h-[50vh] border-4 border-white mx-auto border-opacity-50" alt="Slide 1" />
            </div>
          ) : (
            <div className="flex flex-col gap-4 justify-center items-center min-h-[50vh] bg-[#282828]">
              <ImageNotSupportedIcon sx={{ ml: 1, fontSize: 60, opacity: 0.5 }}></ImageNotSupportedIcon>
              <h2 className="opacity-50">No images to display</h2>
            </div>
          )}
          <h3 className="text-center opacity-50 text-[2.5vw]">NOTE: Images may not always be accurate.</h3>

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            {formatDate(resetDate)}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default SectorModal
