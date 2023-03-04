import { useState, useEffect } from "react";
import "./Slideshow.css";

const Slideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [images]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex + images.length - 1) % images.length);
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="Slideshow">
      <div className="Slideshow-wrapper">
        {images.length > 1 && (
          <div className="Slideshow-controls">
            <button onClick={handlePrev}>&lt;</button>
            <button onClick={handleNext}>&gt;</button>
          </div>
        )}
        <div className={`Slideshow-images ${isLoaded ? "loaded" : ""}`}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className={`Slideshow-image ${index === currentIndex ? "active" : ""}`}
              onLoad={handleImageLoad}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
