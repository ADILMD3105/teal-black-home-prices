
import React from 'react';

const Header = () => {
  return (
    <header className="w-full py-6 bg-teal text-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">MA House Prediction</h1>
          <p className="text-sm md:text-base opacity-90">Accurate Housing Price Estimates</p>
        </div>
        <div className="hidden md:block">
          <p className="text-sm bg-black-light bg-opacity-50 px-3 py-1 rounded-full">
            Powered by Advanced Machine Learning
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
