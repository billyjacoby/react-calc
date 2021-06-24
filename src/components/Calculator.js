import React, { useState } from "react";
import "./Calculator.css";
import Button from "./Button";

const Calculator = () => {
  const [screen, setScreen] = useState(0);
  const [prevValue, setPrevValue] = useState();
  const [storedOp, setStoredOp] = useState();

  console.log("screen ", screen);
  console.log("prevValue ", prevValue);

  const setScreenFunction = (value) => {
    /* Disabling ES lint rule here due to clearing all state */
    if (value === "clear")
      // eslint-disable-next-line
      return setScreen(0), setPrevValue(undefined), setStoredOp();
    if (screen === 0) {
      if (typeof value === "number") {
        setScreen(value);
      }
    } else {
      setScreen("" + screen + value);
    }
  };

  const startOperation = (operation) => {
    setPrevValue(parseFloat(screen));
    if (operation === "equals") {
      // TODO: Must fix pressing equals sign in succession
      console.log("equals");
      if (typeof storedOp === "function") {
        setScreen(storedOp(prevValue, screen));
        setPrevValue(screen);
      }
    } else {
      setStoredOp(() => operation);
      setScreen(0);
    }
  };
  return (
    <div className="wrapper">
      <div className="display">
        <span>{screen}</span>
      </div>
      <div className="button-row">
        <Button
          type="function"
          onClick={() => setScreenFunction("clear")}
          label="AC"
        />
        <Button type="function" label="+/-" />
        <Button type="function" label="%" />
        <Button
          type="operation"
          onClick={() =>
            startOperation((prevValue, value) => prevValue / value)
          }
          label="÷"
        />
      </div>
      <div className="button-row">
        <Button type="number" onClick={() => setScreenFunction(7)} label="7" />
        <Button type="number" onClick={() => setScreenFunction(8)} label="8" />
        <Button type="number" onClick={() => setScreenFunction(9)} label="9" />
        <Button
          type="operation"
          onClick={() =>
            startOperation((prevValue, value) => prevValue * value)
          }
          label="×"
        />
      </div>
      <div className="button-row">
        <Button type="number" onClick={() => setScreenFunction(4)} label="4" />
        <Button type="number" onClick={() => setScreenFunction(5)} label="5" />
        <Button type="number" onClick={() => setScreenFunction(6)} label="6" />
        <Button
          type="operation"
          onClick={() =>
            startOperation((prevValue, value) => prevValue - value)
          }
          label="-"
        />
      </div>
      <div className="button-row">
        <Button type="number" onClick={() => setScreenFunction(1)} label="1" />
        <Button type="number" onClick={() => setScreenFunction(2)} label="2" />
        <Button type="number" onClick={() => setScreenFunction(3)} label="3" />
        <Button
          type="operation"
          onClick={() =>
            startOperation((prevValue, value) => prevValue + value)
          }
          label="+"
        />
      </div>
      <div className="button-row">
        <Button
          type="number double"
          onClick={() => setScreenFunction(0)}
          label="0"
        />
        <Button
          type="number"
          onClick={() => setScreenFunction(".")}
          label="."
        />
        <Button
          type="equals"
          onClick={() => startOperation("equals")}
          label="="
        />
      </div>
    </div>
  );
};

export default Calculator;
