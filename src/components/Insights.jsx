import React from 'react';
import useScrollSlideUp from '../hooks/useScrollSlideUp';

const Insights = () => {
  const [ref1, inView1] = useScrollSlideUp();
  const [ref2, inView2] = useScrollSlideUp();
  const [ref3, inView3] = useScrollSlideUp();

  return (
    <div className="pt-40 px-6 md:px-40 font-sans bg-white text-center">
      <h1 className="text-[#c8102e] mb-4 font-extrabold" style={{ fontSize: '100px' }}>
        RPI Says
      </h1>

    </div>
  );
};

export default Insights;
