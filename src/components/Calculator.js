import React, { useState } from "react";
import Button from "./Button";
import "./Calculator.css";

const Calculator = ({ keyPress }) => {
  //* Value currently displayed on screen
  const [curValue, setCurValue] = useState(0);
  //* What state the clear button should be: AC or C
  const [clearState, setClearState] = useState("AC");
  //* Hold the previous value in order to perform operations using it
  const [prevValueState, setPrevValueState] = useState();
  //* Stores the operation intended to be performed
  const [storedOp, setStoredOp] = useState();
  //* Stores operation name, just for CSS styling purposes
  const [activeOp, setActiveOp] = useState();
  //* Stores a value in order to perform same operations on subsequent equals button presses
  const [storedValue, setStoredValue] = useState();

  //! VARIABLES THAT AFFECT CSS:
  const [buttonWidth, setButtonWidth] = useState("10vw");

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
      setPrevValueState(undefined);
      setActiveOp();
      setStoredOp();
    }
    if (clearState === "C") {
      setCurValue(0);
      setStoredValue();
      setClearState("AC");
    }
  };

  const startOperation = (operation, opType) => {
    setStoredValue();
    setActiveOp(opType);
    setPrevValueState(parseFloat(curValue));
    setStoredOp(() => operation);
    setCurValue(0);
  };

  const completeOperation = (operation) => {
    setCurValue(operation(curValue));
  };

  const onSliderChange = (e) => {
    console.log(e.target.value);
    const newWidth = e.target.value + "vw";

    setButtonWidth(newWidth);
  };

  const equalPressed = () => {
    if (storedValue) {
      setCurValue(storedOp(curValue, storedValue));
    }
    if (typeof storedOp === "function" && !storedValue) {
      setCurValue(storedOp(prevValueState, curValue));
      setStoredValue(curValue);
      setPrevValueState(curValue);
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
          min="10"
          max="24"
          defaultValue="10"
          onChange={(e) => onSliderChange(e)}
        />
      </div>

      <div className="wrapper" style={{ "--buttonWidth": buttonWidth }}>
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
            isKeyPressed={keyPress === "7"}
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
