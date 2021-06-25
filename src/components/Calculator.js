import React, { useState } from "react";
import "./Calculator.css";
import Button from "./Button";

const Calculator = () => {
  const [curValue, setCurValue] = useState(0);
  const [clearState, setClearState] = useState("AC");
  const [prevValue, setPrevValue] = useState();
  const [storedOp, setStoredOp] = useState();
  const [activeOp, setActiveOp] = useState();

  const [buttonHeight, setButtonHeight] = useState("4rem");

  const setCurValueFunction = (value) => {
    if (curValue === 0) {
      if (typeof value === "number") {
        setCurValue(value);
        setClearState("C");
      } else if (value === ".") {
        setCurValue("0.");
        setClearState("C");
      }
    } else {
      // TODO: add use case for not clearing screen when there is s storedOp.
      setCurValue("" + curValue + value);
      setClearState("C");
    }
  };

  const clearValue = () => {
    if (clearState === "AC") {
      setCurValue(0);
      setPrevValue(undefined);
      setActiveOp();
      setStoredOp();
    }
    if (clearState === "C") {
      setCurValue(0);
      setClearState("AC");
    }
  };

  const startOperation = (operation, opType) => {
    setActiveOp(opType);
    setPrevValue(parseFloat(curValue));
    setStoredOp(() => operation);
    setCurValue(0);
  };

  const completeOperation = (operation) => {
    setCurValue(operation(curValue));
  };

  const onSliderChange = (e) => {
    console.log(e.target.value);
    const newHeight = e.target.value + "rem";

    setButtonHeight(newHeight);
  };

  const equalPressed = () => {
    // TODO: Figure out how to only perform the last op on subsequent equals button presses
    if (typeof storedOp === "function") {
      setCurValue(storedOp(prevValue, curValue));
      setPrevValue(curValue);
      setActiveOp();
    }
  };
  return (
    <>
      <div className="slider-container">
        <label>Adjust Size:</label>
        <br />
        <input
          type="range"
          min="2"
          max="10"
          defaultValue="4"
          onChange={(e) => onSliderChange(e)}
        />
      </div>

      <div className="wrapper" style={{ "--buttonHeight": buttonHeight }}>
        <div className="display">
          <span>{curValue}</span>
        </div>
        <div className="button-row">
          <Button
            type="function"
            onClick={() => clearValue()}
            label={clearState}
          />
          <Button
            type="function"
            label="+/-"
            onClick={() => completeOperation((value) => value * -1)}
          />
          <Button
            type="function"
            label="%"
            onClick={() => completeOperation((value) => value * 0.01)}
          />
          <Button
            type="operation"
            active={activeOp === "division"}
            onClick={() =>
              startOperation(
                (prevValue, value) => prevValue / value,
                "division"
              )
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
            active={activeOp === "multiplication"}
            onClick={() =>
              startOperation(
                (prevValue, value) => prevValue * value,
                "multiplication"
              )
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
            active={activeOp === "subtract"}
            onClick={() =>
              startOperation(
                (prevValue, value) => prevValue - value,
                "subtract"
              )
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
            active={activeOp === "addition"}
            onClick={() =>
              startOperation(
                (prevValue, value) => prevValue + value,
                "addition"
              )
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
    </>
  );
};

export default Calculator;
