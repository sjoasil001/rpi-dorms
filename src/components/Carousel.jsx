<<<<<<< HEAD
import React, { useEffect, useState } from "react";

import dorm1 from "../assets/img1.jpeg";
import dorm2 from "../assets/img2.jpg";
import dorm3 from "../assets/img3.jpg";
import dorm4 from "../assets/img5.jpg";
import dorm5 from "../assets/img6.jpg";

const images = [dorm1, dorm2, dorm3, dorm4, dorm5];

export default function Carousel() {
  const [current, setCurrent] = useState(2); // center image index

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getTransformClass = (index) => {
    const total = images.length;
    let diff = index - current;
  
    // Wraparound logic for circular carousel
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
  
    // Center card
    if (diff === 0) return "z-30 scale-110 translate-z-[50px]";
  
    // First layer left/right
    if (diff === 1) return "z-20 scale-100 translate-x-[240px] translate-z-[-50px] rotate-y-[-30deg]";
    if (diff === -1) return "z-20 scale-100 -translate-x-[240px] translate-z-[-50px] rotate-y-[30deg]";
  
    // Second layer (deep background)
    if (diff === 2) return "z-10 scale-95 translate-x-[480px] translate-z-[-100px] rotate-y-[-45deg] opacity-50";
    if (diff === -2) return "z-10 scale-95 -translate-x-[480px] translate-z-[-100px] rotate-y-[45deg] opacity-50";
  
    return "hidden";
  };

  
  

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-visible perspective-[1000px]">
      {/* Decorative lines */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-16 h-1 bg-red-600 rounded-full" />
      <div className="absolute left-[05%] top-1/2 -translate-y-1/2 w-1 h-16 bg-red-600 rounded-full" />
      <div className="absolute right-[05%] top-1/2 -translate-y-1/2 w-1 h-16 bg-red-600 rounded-full" />
  
      {/* Carousel images */}
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute transition-all duration-700 ease-in-out rounded-2xl overflow-hidden shadow-xl transform-style-preserve-3d ${getTransformClass(index)}`}
        >
          <img
            src={src}
            alt={`image-${index}`}
            className="rounded-[40px] object-cover w-[300px] h-[300px] transition-all duration-700 shadow-2xl"
          />
        </div>
      ))}
    </div>

    

    
  );
}
=======
import React, { useEffect, useState } from "react";

import dorm1 from "../assets/img1.jpeg";
import dorm2 from "../assets/img2.jpg";
import dorm3 from "../assets/img3.jpg";
import dorm4 from "../assets/img5.jpg";
import dorm5 from "../assets/img6.jpg";

const images = [dorm1, dorm2, dorm3, dorm4, dorm5];

export default function Carousel() {
  const [current, setCurrent] = useState(2); // center image index

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getTransformClass = (index) => {
    const total = images.length;
    let diff = index - current;
  
    // Wraparound logic for circular carousel
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
  
    // Center card
    if (diff === 0) return "z-30 scale-110 translate-z-[50px]";
  
    // First layer left/right
    if (diff === 1) return "z-20 scale-100 translate-x-[240px] translate-z-[-50px] rotate-y-[-30deg]";
    if (diff === -1) return "z-20 scale-100 -translate-x-[240px] translate-z-[-50px] rotate-y-[30deg]";
  
    // Second layer (deep background)
    if (diff === 2) return "z-10 scale-95 translate-x-[480px] translate-z-[-100px] rotate-y-[-45deg] opacity-50";
    if (diff === -2) return "z-10 scale-95 -translate-x-[480px] translate-z-[-100px] rotate-y-[45deg] opacity-50";
  
    return "hidden";
  };

  
  

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-visible perspective-[1000px] mb-24 md:mb-32">
      {/* Decorative lines */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-16 h-1 bg-red-600 rounded-full" />
      <div className="absolute left-[05%] top-1/2 -translate-y-1/2 w-1 h-16 bg-red-600 rounded-full" />
      <div className="absolute right-[05%] top-1/2 -translate-y-1/2 w-1 h-16 bg-red-600 rounded-full" />
  
      {/* Carousel images */}
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute transition-all duration-700 ease-in-out rounded-2xl overflow-hidden shadow-xl transform-style-preserve-3d ${getTransformClass(index)}`}
        >
          <img
            src={src}
            alt={`image-${index}`}
            className="rounded-[40px] object-cover w-[300px] h-[300px] transition-all duration-700 shadow-2xl"
          />
        </div>
      ))}
    </div>

    

    
  );
}
>>>>>>> 5a630bccd0bf2f8901c0b3b4c16f6b76d2df010b
