import React from "react";

const Button = ({
  type,
  onClick = () => null,
  label,
  active = false,
  isKeyPressed = false,
}) => {
  let className = type;
  if (active || isKeyPressed) {
    className = type + " active";
  }
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
