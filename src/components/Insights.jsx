import React from 'react';
import useScrollSlideUp from '../hooks/useScrollSlideUp';
import Form from '../components/form';

const Insights = () => {
  const [ref1, inView1] = useScrollSlideUp();
  const [ref2, inView2] = useScrollSlideUp();
  const [ref3, inView3] = useScrollSlideUp();

  return (
    <div className="pt-40 px-6 md:px-40 font-sans bg-white text-center">
      <h1 className="text-[#c8102e] mb-4 font-extrabold" style={{ fontSize: '100px' }}>
        RPI Says
      </h1>

      <div
        ref={ref1}
        className={`transition-all duration-700 ${
          inView1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
      </div>

      <div
        ref={ref2}
        className={`transition-all duration-700 ${
          inView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      ></div>

      <div
        ref={ref3}
        className={`transition-all duration-700 ${
          inView3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      ></div>

    </div>
  );
};

export default Insights;
