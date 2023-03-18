import React, { useState } from 'react';
import './index.css';

function SlideShow({ images, problema }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(previousIndex);
  };

  return (
    <div className="slider-container">
      <div className={`slider-image-wrapper`}>
        {images.map((image, index) => (
          <div key={index}>
            {images.length > 1 && (
              <div className="slider-controls">
                <button className='Previous' onClick={handlePrevious}></button>
                <button className='Next' onClick={handleNext}></button>
                <p className="Detalle-Barrio">{problema.barrio}</p>
                <p className="Detalle-Ciudad">- {problema.ciudad}</p>
                <p className="Detalle-Likes">{problema.likes}</p>
                <p className="Detalle-Barrio">{problema.barrio}</p>
              </div>
            )}
            <div
              key={`image-${index}`}
              className={`slider-image ${index === currentIndex ? 'active' : ''}`}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(62,41,146,0) 55%, rgba(0, 0, 0, 0.9) 99%), url(${image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                transform: `translateX(${(index - currentIndex) * 100}%)`,
                transition: 'transform 0.5s ease'
              }}
            >
            </div>
          </div>
        ))}
      </div>
      <div className='Text-Box'>
        <p className="Detalle-Description">{problema.description}</p>
      </div>
    </div>
  );
}

export default SlideShow;
