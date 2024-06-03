import React, { useState, useEffect } from 'react';
import { baseURL } from '../../Axios/axios';

const Carousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0); 

  const prevSlide = () => {
    const index = activeIndex === 0 ? props.slides.length - 1 : activeIndex - 1;
    setActiveIndex(index);
  };

  const nextSlide = () => {
    const index = activeIndex === props.slides.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div
      id="carouselExampleControls"
      className="relative"
      data-twe-carousel-init
      data-twe-ride="carousel"
    >
      <div
        className="relative w-full overflow-hidden after:clear-both after:block after:content-['']"
      >
        {props.slides.map((slide, index) => (
          <div
            key={index}
            className={`relative float-left w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ${index === activeIndex ? 'block' : 'hidden'}`}
            data-twe-carousel-item
            data-twe-carousel-active={index === activeIndex}
          > 
            <div className="md:h-72 sm:h-36 h-36 flex">
            <img
              src={`${baseURL}/media/${slide.image}`}
              className="w-full h-full"
              alt={`Slide ${index + 1}`}
            />
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-twe-target="#carouselExampleControls"
        data-twe-slide="prev"
        onClick={prevSlide}
      >
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Previous
        </span>
      </button>

      <button
        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-twe-target="#carouselExampleControls"
        data-twe-slide="next"
        onClick={nextSlide}
      >
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Next
        </span>
      </button>
    </div>
  );
};

export default Carousel;
