import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [
    "https://source.unsplash.com/random/600x400",
    "https://picsum.photos/id/237/600/400",
    "https://loremflickr.com/600x400/abstract",
  ];
  
  const intervalTime = 3000;

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, intervalTime);
    return () => clearInterval(timer);
  }, [intervalTime]);

  return (
    <div id="indicators-carousel" className="relative w-full h-56 md:h-96 overflow-hidden rounded-lg">
      <div className="absolute inset-0 flex items-center justify-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transform duration-700 ease-in-out absolute w-full h-full ${index === activeIndex? "scale-100" : "scale-95"}`}
          >
            <img src={slide} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 space-x-3 flex">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 py-2 bg-blue-500 text-white rounded-l-lg hover:bg-blue-700 focus:outline-none"
        data-carousel-prev
        onClick={prevSlide}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none"
        data-carousel-next
        onClick={nextSlide}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Carousel;
