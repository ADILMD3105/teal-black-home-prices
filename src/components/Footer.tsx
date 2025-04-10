
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-black-dark text-white text-sm mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>© 2025 MA House Prediction | Using Kaggle House Prices Dataset</p>
        <p className="text-teal-light mt-1">
          <a href="https://www.kaggle.com/c/house-prices-advanced-regression-techniques/data" 
             className="hover:underline" 
             target="_blank" 
             rel="noopener noreferrer">
            Data Source
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
