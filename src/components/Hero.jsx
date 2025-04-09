import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import '@fontsource/anton';

const Hero = () => {
  return (
    <section className="w-full bg-white pt-50 pb-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-8xl font-extrabold leading-tight text-gray-900 mb-4">
          The Ultimate RPI Dorm Experience — <br className="hidden md:inline" />
          <span className="font-display text-[#c8102e] lowercase">
            <Typewriter
              words={['Reviewed', 'Rated', 'Real']}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={60}
              delaySpeed={1500}
            />
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 font-medium mb-8 tracking-wide">
          Made by Students. For Students.
        </p>

    
      </div>
    </section>
  );
};

export default Hero;
