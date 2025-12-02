import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/next');
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Welcome
        </h1>
        <button
          onClick={handleClick}
          className="bg-[#c8102e] hover:bg-[#a50d26] text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          Go to Next Page
        </button>
      </div>
    </section>
  );
};

export default Button;
