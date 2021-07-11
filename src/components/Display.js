//* I thought this was going to end up being a bit more complicated than it was.
import React from "react";

function Display({ curValue }) {
  return (
    <div className="display">
      <span>{curValue}</span>
    </div>
  );
}

export default Display;
