import React from "react";
import Button from "./Button";

const PrimaryButton = ({ children, onClick }) => {
  return (
    <Button onClick={onClick} className="bg-blue-500 hover:bg-blue-600">
      {children}
    </Button>
  );
};

export default PrimaryButton;
