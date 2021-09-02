import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {MdKeyboardArrowRight, MdKeyboardArrowLeft} from 'react-icons/md';

// Slides are the SliderData array, which stores the image objects
const ImageSlider = (props) => {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    setSlides(props.slides);
  }, [props.slides]);

  // Sets the current slide to the next
  // If the current is the last one, than sets it to the first
  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  }

  // Sets the current slide to the previous
  // If the current slide is the first one, than sets it to the last
  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  }

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className="slider">
      <MdKeyboardArrowLeft className="left-arrow" onClick={prevSlide} />
      <MdKeyboardArrowRight className="right-arrow" onClick={nextSlide} />
      {slides.map((slide, index) => {
        return (
          <div className={index === current ? "active slide" : "slide"} key={index}>
            {/* Render the image, if that is the current */}
            {index === current && (<img src={slide.picture} alt={index} className="image" />)}
          </div>
        );
      })}
    </div>
  );
}

ImageSlider.propTypes = {
  slides: PropTypes.object.isRequired,
}

export default ImageSlider;
