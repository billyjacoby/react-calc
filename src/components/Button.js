import React from "react";

const Button = ({ type, onClick = () => null, label }) => {
  return (
    <button className={type} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
