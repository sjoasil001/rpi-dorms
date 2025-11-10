import React from "react";

const Dorms = () => {
  const dormNames = [
    "Blitman","BarH Residence","Sharp","Davison","Crockett","Hall","Barton","Nason","North",
    "E-Complex","Polytechnic","City Station","Bryckwyck","Stackwyck","Bray","Warren","Nugent",
    "Quad","RAPHS A","RAPHS B"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO — matches Home vibe: white card, big dark title, red accent */}
      <section className="max-w-8xl mx-auto px-6">
        <div className="mt-20 md:mt-28 rounded-3xl shadow-lg border border-gray-100 bg-white overflow-hidden">
          <div className="px-6 sm:px-10 py-12 sm:py-16 text-center">
            <h1 className="font-extrabold leading-tight tracking-tight text-[clamp(2rem,6vw,4.25rem)] text-[#0f1a2b]">
              Explore RPI Dorms
            </h1>
            <p className="mt-4 text-[clamp(.95rem,2vw,1.125rem)] text-gray-600">
              Your guide to RPI housing: honest reviews, real photos, and authentic stories
            </p>
            <div className="mx-auto mt-6 h-1 w-14 rounded-full bg-[#c8102e]" />
          </div>
        </div>
      </section>

      {/* X-style crossing marquees */}
{/* Refined X-style crossing marquees with better contrast */}
<section className="max-w-8xl mx-auto px-6">
  <div className="relative h-48 md:h-52 mt-8">
    {/* Upper ribbon — soft gray background, dark text */}
    <div className="absolute inset-x-[-8rem] md:inset-x-[-12rem] top-4 -rotate-3 overflow-hidden">
      <div className="relative h-16 md:h-20 bg-[#f8f8f8] shadow-sm ring-1 ring-black/5 flex items-center">
        {/* edge fades */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-24 md:w-36 bg-gradient-to-r from-[#f8f8f8] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-24 md:w-36 bg-gradient-to-l from-[#f8f8f8] to-transparent z-10" />

        <div className="pause-on-hover w-full">
          <div className="animate-marquee flex whitespace-nowrap">
            {[...dormNames, ...dormNames].map((d, i) => (
              <span
                key={`r1-${i}`}
                className="uppercase mx-8 md:mx-12 text-[clamp(1rem,2vw,1.4rem)] font-extrabold tracking-wide text-[#0f1a2b] hover:text-[#c8102e] transition-colors"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Lower ribbon — RPI red background, white text */}
    <div className="absolute inset-x-[-8rem] md:inset-x-[-12rem] bottom-4 rotate-3 overflow-hidden">
      <div className="relative h-16 md:h-20 bg-[#c8102e] shadow-md ring-1 ring-black/10 flex items-center">
        {/* edge fades */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-24 md:w-36 bg-gradient-to-r from-[#c8102e] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-24 md:w-36 bg-gradient-to-l from-[#c8102e] to-transparent z-10" />

        <div className="pause-on-hover w-full">
          <div className="animate-marquee-reverse flex whitespace-nowrap">
            {[...dormNames, ...dormNames].map((d, i) => (
              <span
                key={`r2-${i}`}
                className="uppercase mx-8 md:mx-12 text-[clamp(1rem,2vw,1.4rem)] font-extrabold tracking-wide text-white hover:text-gray-100 transition-colors"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* styles */}
      <style>{`
        /* Marquee animations */
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes marqueeReverse { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
        .animate-marquee { animation: marquee 36s linear infinite; will-change: transform; }
        .animate-marquee-reverse { animation: marqueeReverse 36s linear infinite; will-change: transform; }
        .pause-on-hover:hover .animate-marquee,
        .pause-on-hover:hover .animate-marquee-reverse { animation-play-state: paused; }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee, .animate-marquee-reverse { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default Dorms;
