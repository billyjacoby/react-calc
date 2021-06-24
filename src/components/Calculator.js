import React, { useState } from "react";
import "./Calculator.css";
import Button from "./Button";

const Calculator = () => {
  const [curValue, setCurValue] = useState(0);
  const [prevValue, setPrevValue] = useState();
  const [storedOp, setStoredOp] = useState();

  console.log("curValue ", curValue);
  console.log("prevValue ", prevValue);

  const setCurValueFunction = (value) => {
    if (value === "clear")
      /* Disabling ES lint rule here due to clearing all state */
      // eslint-disable-next-line
      return setCurValue(0), setPrevValue(undefined), setStoredOp();
    if (curValue === 0) {
      if (typeof value === "number") {
        setCurValue(value);
      }
    } else {
      setCurValue("" + curValue + value);
    }
  };

  const startOperation = (operation) => {
    setPrevValue(parseFloat(curValue));
    setStoredOp(() => operation);
    setCurValue(0);
  };

  const equalPressed = () => {
    if (typeof storedOp === "function") {
      setCurValue(storedOp(prevValue, curValue));
      setPrevValue(curValue);
    }
  };
  return (
    <div className="wrapper">
      <div className="display">
        <span>{curValue}</span>
      </div>
      <div className="button-row">
        <Button
          type="function"
          onClick={() => setCurValueFunction("clear")}
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
        <Button
          type="number"
          onClick={() => setCurValueFunction(7)}
          label="7"
        />
        <Button
          type="number"
          onClick={() => setCurValueFunction(8)}
          label="8"
        />
        <Button
          type="number"
          onClick={() => setCurValueFunction(9)}
          label="9"
        />
        <Button
          type="operation"
          onClick={() =>
            startOperation((prevValue, value) => prevValue * value)
          }
          label="×"
        />
      </div>
      <div className="button-row">
        <Button
          type="number"
          onClick={() => setCurValueFunction(4)}
          label="4"
        />
        <Button
          type="number"
          onClick={() => setCurValueFunction(5)}
          label="5"
        />
        <Button
          type="number"
          onClick={() => setCurValueFunction(6)}
          label="6"
        />
        <Button
          type="operation"
          onClick={() =>
            startOperation((prevValue, value) => prevValue - value)
          }
          label="-"
        />
      </div>
      <div className="button-row">
        <Button
          type="number"
          onClick={() => setCurValueFunction(1)}
          label="1"
        />
        <Button
          type="number"
          onClick={() => setCurValueFunction(2)}
          label="2"
        />
        <Button
          type="number"
          onClick={() => setCurValueFunction(3)}
          label="3"
        />
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
          type="number double bottom-left"
          onClick={() => setCurValueFunction(0)}
          label="0"
        />
        <Button
          type="number"
          onClick={() => setCurValueFunction(".")}
          label="."
        />
        <Button
          type="operation bottom-right"
          onClick={equalPressed}
          label="="
        />
      </div>
    </div>
  );
};

export default Calculator;
