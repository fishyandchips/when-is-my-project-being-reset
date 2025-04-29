import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const SectorModal = ({ open, handleClose, name, images, resetDate }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    height: '85%',
    bgcolor: '#616161',
    color: '#ffffff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
    display: 'flex', 
    flexDirection: 'column', 
    gap: 2,
    overflowY: 'auto',
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
            <h1 className="text-[6rem]">{name}</h1>
            <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer', ml: 1, fontSize: 80 }}>Close</CloseIcon>
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
                    <img src={image.src} className="d-block w-100 object-contain max-h-[60vh]" alt={image.alt} />
                  </div>
                ))}
              </div>
            </div>
          ) : images.length === 1 ? (
            <div>
              <img src={images[0].src} className="d-block w-100 object-contain max-h-[60vh]" alt={images[0].alt} />
            </div>
          ) : (
            <div className="flex flex-col gap-4 justify-center items-center min-h-[60vh] bg-[#282828]">
              <ImageNotSupportedIcon sx={{ ml: 1, fontSize: 80, opacity: 0.5 }}></ImageNotSupportedIcon>
              <h1 className="opacity-50">No images to display</h1>
            </div>
          )}
          <h3 className="text-center opacity-50">NOTE: Images may not always be accurate.</h3>

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <h2 className="text-[4rem] text-center">will be reset on</h2>
            <h2 className="text-[4rem] text-center">{resetDate}.</h2>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default SectorModal
