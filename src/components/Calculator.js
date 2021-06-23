import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [screen, setScreen] = useState(0);

  const setScreenFunction = (value) => {
    if (value === "clear") return setScreen(0);
    if (screen === 0) {
      if (typeof value === "number") {
        setScreen(value);
      }
    } else {
      setScreen("" + screen + value);
    }
  };
  return (
    <div className="wrapper">
      <div className="display">
        <span>{screen}</span>
      </div>
      <div className="button-row">
        <button
          className="button function"
          onClick={() => setScreenFunction("clear")}
        >
          AC
        </button>
        <button className="button function">+/-</button>
        <button className="button function">%</button>
        <button className="button operation">÷</button>
      </div>
      <div className="button-row">
        <button className="button number" onClick={() => setScreenFunction(7)}>
          7
        </button>
        <button className="button number" onClick={() => setScreenFunction(8)}>
          8
        </button>
        <button className="button number" onClick={() => setScreenFunction(9)}>
          9
        </button>
        <button className="button operation">×</button>
      </div>
      <div className="button-row">
        <button className="button number" onClick={() => setScreenFunction(4)}>
          4
        </button>
        <button className="button number" onClick={() => setScreenFunction(5)}>
          5
        </button>
        <button className="button number" onClick={() => setScreenFunction(6)}>
          6
        </button>
        <button className="button operation">-</button>
      </div>
      <div className="button-row">
        <button className="button number" onClick={() => setScreenFunction(1)}>
          1
        </button>
        <button className="button number" onClick={() => setScreenFunction(2)}>
          2
        </button>
        <button className="button number" onClick={() => setScreenFunction(3)}>
          3
        </button>
        <button className="button">÷</button>
      </div>
      <div className="button-row">
        <button
          className="button number double"
          onClick={() => setScreenFunction(0)}
        >
          0
        </button>
        <button
          className="button number"
          onClick={() => setScreenFunction(".")}
        >
          .
        </button>
        <button className="button operation">=</button>
      </div>
    </div>
  );
};

export default Calculator;
