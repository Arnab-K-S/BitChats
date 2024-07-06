// src/components/FlippingCard.jsx
import React, { useState } from 'react';

const FlippingCard = () => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 perspective">
        <div className={`relative w-full h-full transition-transform duration-700 transform ${flipped ? 'rotate-y-180' : ''}`}>
          <div className="absolute w-full h-full bg-blue-500 text-white rounded-lg shadow-lg flex items-center justify-center backface-hidden">
            <p>Front Content</p>
          </div>
          <div className="absolute w-full h-full bg-red-500 text-white rounded-lg shadow-lg flex items-center justify-center backface-hidden transform rotate-y-180">
            <p>Back Content</p>
          </div>
        </div>
      </div>
      <button 
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg"
        onClick={handleFlip}
      >
        Flip Card
      </button>
    </div>
  );
};

export default FlippingCard;
