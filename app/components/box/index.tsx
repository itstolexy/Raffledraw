import React from "react";

interface BoxesProps {
  numbers: number[];
  winnerNumber: number | null; // Update to accept winnerNumber
}

const Boxes: React.FC<BoxesProps> = ({ numbers = [], winnerNumber = null }) => {
  const displayNumbers = numbers.length === 7 ? numbers : new Array(7).fill('');
  
  return (
    <div className="flex space-x-4 mt-8">
      {displayNumbers.map((number, index) => (
        <div
          key={index}
          className={`w-24 h-24 rounded-xl bg-white flex-shrink-0 flex items-center justify-center text-4xl font-bold ${number === winnerNumber ? 'bg-yellow-500' : ''}`} // Highlight winnerNumber
        >
          {number !== '' ? number : ''}
        </div>
      ))}
    </div>
  );
};

export default Boxes;
