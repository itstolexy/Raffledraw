import { useEffect, useState } from "react";

interface CountdownTimerProps {
  isRunning: boolean;
  onReset: boolean;
  initialTime?: number;
  onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  isRunning,
  onReset,
  initialTime = 60, // Updated to 60 seconds
  onComplete,
}) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 1) return prevTime - 1;

          clearInterval(timer);
          onComplete();
          return 0;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, time, onComplete]);

  useEffect(() => {
    if (onReset) setTime(initialTime);
  }, [onReset, initialTime]);

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  // Apply red text if the countdown is running
  const textColorClass = isRunning ? "text-red-500" : "text-black";

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center mt-24">
        <div className="flex flex-col items-center mx-2">
          <div
            className={`bg-white ${textColorClass} font-bold md:text-4xl text-3xl flex items-center justify-center md:w-24 w-fit p-4 md:h-24 rounded-lg`}
          >
            {minutes}
          </div>
          <p className="text-[#F16C70] mt-2">Minutes</p>
        </div>
        <span className="md:text-4xl -mt-10 mx-2 text-[#F16C70]">:</span>
        <div className="flex flex-col items-center mx-2">
          <div
            className={`bg-white ${textColorClass} font-bold md:text-4xl text-3xl flex items-center justify-center md:w-24 w-fit p-4 md:h-24 rounded-lg`}
          >
            {seconds}
          </div>
          <p className="text-[#F16C70] mt-2">Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
