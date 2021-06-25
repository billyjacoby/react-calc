import React from "react";

const Button = ({ type, onClick = () => null, label, active = false }) => {
  let className = type;
  if (active) {
    className = type + " active";
  }
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
