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
      className={`w-[148px] h-[76px] ${bgColor} text-black font-extrabold text-2xl rounded-md shadow-md`}
    >
      {label}
    </button>
  );
};

export default Button;
