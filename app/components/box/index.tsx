import React from "react";

interface BoxesProps {
  numbers: number[];
  winnerNumber: number | null; // Update to accept winnerNumber
}

const Boxes: React.FC<BoxesProps> = ({ numbers = [], winnerNumber = null }) => {
  const displayNumbers = numbers.length === 7 ? numbers : new Array(7).fill('');
  
  return (
    <div className="flex md:space-x-4 space-x-2 mt-8 md:p-4">
      {displayNumbers.map((number, index) => (
        <div
          key={index}
          className={`md:w-24 md:h-24 p-4 rounded-xl border border-black bg-white flex-shrink-0 flex items-center shadow-lg justify-center text-xl md:text-4xl font-bold ${number === winnerNumber ? 'bg-yellow-500' : ''}`} // Highlight winnerNumber
        >
          {number !== '' ? number : ''}
        </div>
      ))}
    </div>
  );
};

export default Boxes;
