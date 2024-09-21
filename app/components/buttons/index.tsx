import React from "react";

interface ButtonProps {
  label: string;
  bgColor: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, bgColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`md:w-[148px] md:h-[76px] w-fit p-4 ${bgColor} text-black font-extrabold text-2xl rounded-md shadow-md`}
    >
      {label}
    </button>
  );
};

export default Button;
