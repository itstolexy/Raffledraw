"use client";

import { useState, useEffect } from "react";
import Boxes from "./components/box";
import Button from "./components/buttons";
import CountdownTimer from "./components/countdown";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [numbers, setNumbers] = useState<number[]>([]); // Explicit number array
  const [currentName, setCurrentName] = useState<string | null>(null); // Stores current winner's name
  const [shuffling, setShuffling] = useState(false); // Controls shuffling state
  const [winner, setWinner] = useState<{ name: string; number: number[] }>({
    name: "",
    number: [],
  }); // Explicit winner type
  const [timerKey, setTimerKey] = useState(0); // Used to reset the countdown timer
  const [showName, setShowName] = useState(false); // Controls when the winner's name should be shown

  // Array of random names and numbers
  const namesAndNumbers = [
    { name: "John Doe", number: [1, 2, 3, 4, 5, 6, 7] },
    { name: "Jane Smith", number: [7, 6, 5, 4, 3, 2, 1] },
    { name: "Alice Johnson", number: [9, 8, 7, 6, 5, 4, 3] },
    { name: "Michael Brown", number: [0, 2, 4, 6, 8, 1, 3] },
    { name: "Emily Davis", number: [3, 3, 7, 8, 2, 9, 4] },
    { name: "Odusanya Omotola", number: [5, 3, 9, 8, 2, 9, 4] },
    { name: "Tola Daniel", number: [6, 5, 9, 8, 2, 9, 4] },
    { name: "Tayo Ade", number: [9, 5, 3, 8, 2, 6, 4] },
    { name: "Chinelo Okoye", number: [2, 7, 9, 3, 5, 8, 1] },
    { name: "Emeka Ugo", number: [4, 8, 6, 1, 3, 7, 9] },
    { name: "Amaka Nwosu", number: [0, 2, 9, 4, 5, 3, 8] },
    { name: "David Olatunji", number: [5, 3, 1, 7, 8, 9, 4] },
    { name: "Bola Johnson", number: [6, 9, 2, 1, 4, 8, 7] },
    { name: "Ngozi Anya", number: [3, 5, 7, 6, 9, 2, 0] },
    { name: "Efe Omoruyi", number: [1, 9, 8, 2, 3, 5, 7] },
    { name: "Seyi Martins", number: [7, 3, 4, 2, 6, 1, 9] },
    { name: "Ifeanyi Eze", number: [0, 4, 6, 9, 2, 5, 1] },
    { name: "Tosin Adeyemi", number: [9, 7, 3, 5, 1, 8, 4] },
    { name: "Femi Adebayo", number: [2, 8, 6, 9, 0, 7, 3] },
    { name: "Miriam Akin", number: [4, 1, 5, 2, 9, 7, 8] },
    { name: "Chikezie Ude", number: [6, 2, 9, 3, 8, 5, 4] },
    { name: "Folake Ope", number: [1, 7, 4, 5, 9, 2, 0] },
    { name: "Gbenga Olufemi", number: [8, 5, 6, 2, 1, 9, 4] },
    { name: "Yetunde Ogundipe", number: [3, 9, 2, 8, 7, 6, 1] },
    { name: "Olumide Bakare", number: [4, 7, 1, 6, 9, 0, 3] },
    { name: "Patience Ayo", number: [9, 6, 8, 3, 1, 5, 7] },
    { name: "Aisha Mohammed", number: [2, 4, 7, 5, 9, 0, 6] },
    { name: "Uzochi Opara", number: [1, 8, 3, 6, 9, 2, 7] },
    // Continue to fill out 50 names and numbers
  ];

  // Effect to handle shuffling logic
  useEffect(() => {
    let shuffleInterval: NodeJS.Timeout;

    if (shuffling) {
      shuffleInterval = setInterval(() => {
        const randomNumbers = Array.from({ length: 7 }, () =>
          Math.floor(Math.random() * 10)
        );
        setNumbers(randomNumbers);
      }, 50); // Faster shuffling interval

      setTimeout(() => {
        setShuffling(false);
      }, 10000);
    }

    return () => clearInterval(shuffleInterval);
  }, [shuffling]);

  const handleStart = () => {
    setIsReset(false);
    setShuffling(true); // Start shuffling first
    setIsRunning(false); // Stop any previous countdown
    setTimerKey((prevKey) => prevKey + 1); // Reset countdown timer
    setCurrentName(null); // Clear winner name
    setWinner({ name: "", number: [] }); // Clear winner data
    setShowName(false); // Hide the name display initially

    setTimeout(() => {
      // Pick a random winner from the array
      const randomWinner =
        namesAndNumbers[Math.floor(Math.random() * namesAndNumbers.length)];

      setNumbers(randomWinner.number);
      setCurrentName(randomWinner.name);
      setWinner({ name: randomWinner.name, number: randomWinner.number });

      setShuffling(false);
      setShowName(true);

      setTimeout(() => {
        setIsRunning(true);
      }, 1000);
    }, 2000);
  };

  const handleClear = () => {
    setIsRunning(false);
    setIsReset(true);
    setNumbers([]);
    setShuffling(false);
    setCurrentName(null);
    setWinner({ name: "", number: [] });
    setShowName(false); // Hide the name display when cleared
  };

  const handleComplete = () => {
    setIsRunning(false);
  };

  return (
    <main className="bg-[url('/images/bg.jpg')] bg-cover bg-center min-h-screen flex flex-col items-center">
      <CountdownTimer
        key={timerKey}
        isRunning={isRunning}
        onReset={isReset}
        onComplete={handleComplete}
        initialTime={60}
      />
      <Boxes numbers={numbers} winnerNumber={null} />

      {showName && (
        <div className="border h-[101px] w-1/2 border-white mt-6 flex items-center justify-center">
          <p className="font-bold text-5xl text-green-500 p2 text-center">
            {currentName || "Shuffling..."}
          </p>
        </div>
      )}

      <div className="flex space-x-44 mt-11">
        <Button label="START" bgColor="bg-[#F0D503]" onClick={handleStart} />
        <Button label="CLEAR" bgColor="bg-[#F16C70]" onClick={handleClear} />
      </div>
    </main>
  );
}
