import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="">
      <button
        onClick={onClick}
        className="bg-green-500 hover:bg-green-700 text-center text-white font-bold py-6 px-16 rounded mt-2 inline-block"
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
