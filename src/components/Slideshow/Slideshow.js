import React, { useState } from 'react';
import './index.css';

function SlideShow({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleNext = () => {
    setDirection('next');
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    setDirection('previous');
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(previousIndex);
  };

  //Hover Effect // 

  const [ButtonState, SetButtonState] = useState(false);
  const [ButtonState2, SetButtonState2] = useState(false);
  const hoverL = () => {
    SetButtonState((ButtonState) => !ButtonState);
  };
  const hoverR = () => {
    SetButtonState2((ButtonState2) => !ButtonState2);
  };
  let ButtonStateCheck = ButtonState ? "NH" : "";
  let ButtonStateCheck2 = ButtonState2 ? "PH" : "";

  return (
    <div className="slider-container">
      <div className={`slider-image-wrapper ${direction}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`slider-image ${index === currentIndex ? 'active' : ''}`}
          >
            <div className="slider-image-inner">
              <img src={image} alt={image} />
              <div className="gradient-overlay"></div>
            </div>
            {images.length > 1 && (
              <div className="slider-controls">
                <button   onMouseEnter={hoverL} 
                          onMouseLeave={hoverL} onClick={handlePrevious} className={ButtonStateCheck}></button>
                <button   onMouseEnter={hoverR} 
                          onMouseLeave={hoverR} onClick={handleNext} className={ButtonStateCheck2}></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlideShow;
