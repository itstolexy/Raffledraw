// "use client";

// import { useState, useEffect } from "react";
// import Boxes from "../components/box";
// import Button from "../components/buttons";
// import CountdownTimer from "../components/countdown";

// export default function RaffleDraw() {
//   const [isRunning, setIsRunning] = useState(false);  // Controls countdown timer
//   const [isReset, setIsReset] = useState(false);      // Controls reset of countdown timer
//   const [numbers, setNumbers] = useState<number[]>(Array(7).fill(0)); // Stores shuffled numbers
//   const [shuffling, setShuffling] = useState(false);   // Controls shuffling state
//   const [winnerNumber, setWinnerNumber] = useState<number[]>([]); // Stores winner number as an array
//   const [timerKey, setTimerKey] = useState(0);  // Used to reset the countdown timer

//   // Effect to handle shuffling logic
//   useEffect(() => {
//     let shuffleInterval: NodeJS.Timeout;

//     if (shuffling) {
//       // Shuffle every 50 milliseconds for a faster effect
//       shuffleInterval = setInterval(() => {
//         const randomNumbers = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10));
//         setNumbers(randomNumbers);
//       }, 50);  // Faster shuffling interval (50ms)
      
//       // Stop shuffling after 10 seconds (10000ms)
//       setTimeout(() => {
//         setShuffling(false);
//       }, 10000);
//     }

//     return () => clearInterval(shuffleInterval);
//   }, [shuffling]);

//   const handleStart = async () => {
//     setIsReset(false);
//     setShuffling(true);    // Start shuffling first
//     setIsRunning(false);   // Stop any previous countdown
//     setTimerKey((prevKey) => prevKey + 1);  // Reset countdown timer
//     setWinnerNumber([]);  // Clear winner number array

//     // Fetch winner data and stop shuffling
//     try {
//       const response = await fetch("https://contractmanagementsystem.azure-api.net/flyingfishbe/draw/raffle-winner");
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const data = await response.json();

//       // Assume `data.winner.number` is an array of numbers (e.g., [1, 2, 3, 4, 5, 6, 7])
//       setWinnerNumber(data.winner.number);

//       // Stop shuffling after fetching winner details
//       setShuffling(false);

//       // Start countdown after the winner is displayed
//       setTimeout(() => {
//         setIsRunning(true); // Start countdown (60 seconds)
//       }, 1000);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleClear = () => {
//     setIsRunning(false);
//     setIsReset(true);
//     setNumbers(Array(7).fill(0)); // Clear all numbers
//     setShuffling(false);
//     setWinnerNumber([]); // Clear winner number array
//   };

//   const handleComplete = () => {
//     // When countdown ends, restart shuffling
//     setIsRunning(false);
//   };

//   // If winnerNumber is not empty, display the winner number array, else display shuffled numbers
//   const displayNumbers = winnerNumber.length ? winnerNumber : numbers;

//   return (
//     <main className="bg-[url('/images/bg.jpg')] bg-cover bg-center min-h-screen flex flex-col items-center">
//       <CountdownTimer
//         key={timerKey}
//         isRunning={isRunning}
//         onReset={isReset}
//         onComplete={handleComplete} // When countdown ends, restart shuffling
//         initialTime={60} // Countdown from 60 seconds
//       />
//       {/* Pass the updated numbers (either shuffled or winner) to the Boxes component */}
//       <Boxes numbers={displayNumbers} winnerNumber={null} />

//       <div className="flex space-x-44 mt-11">
//         <Button label="START" bgColor="bg-[#F0D503]" onClick={handleStart} />
//         <Button label="CLEAR" bgColor="bg-[#F16C70]" onClick={handleClear} />
//       </div>
//     </main>
//   );
// }
