import React from "react";

const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-white font-semibold ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
