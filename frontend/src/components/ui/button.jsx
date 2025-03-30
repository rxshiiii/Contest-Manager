import React from "react";

const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-white shadow-md transition ${className}`}
  >
    {children}
  </button>
);

export { Button };
