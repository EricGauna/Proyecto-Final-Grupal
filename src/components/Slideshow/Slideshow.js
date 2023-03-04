import React from 'react';
import Slider from 'react-slick';

function Slideshow(props) {
  const { images } = props;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {images.map((filename, index) => (
        <div key={index}>
          <img src={filename} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
}

export default Slideshow;