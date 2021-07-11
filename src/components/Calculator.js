import React, { useState, useEffect } from "react";
import Button from "./Button";
import Display from "./Display";
import "./Calculator.css";

const Calculator = ({ buttonWidth }) => {
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

  useEffect(() => {
    //* Method to listen for keydown presses anywhere on page
    const handleKeyDown = (e) => {
      console.log(e.key);
      if (!isNaN(parseInt(e.key))) {
        setCurValueFunction(parseInt(e.key));
      } else {
        switch (e.key) {
          case ".":
            setCurValueFunction(".");
            break;
          case "*":
            multiply();
            break;
          case "+":
            add();
            break;
          case "-":
            subtract();
            break;
          case "/":
            divide();
            break;
          case "Enter":
            equalPressed();
            break;
          case "Clear":
            clearValue();
            break;
          case "Delete":
          case "Backspace":
            let newValue = curValue?.substring(0, curValue.length - 1);
            if (newValue === "") newValue = "0";
            if (curValue === "0") setCurValueFunction(newValue);
            setCurValue(newValue);
            break;
          default:
            break;
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const setCurValueFunction = (value) => {
    if (curValue === 0 || curValue === "0") {
      if (typeof value === "number") {
        setCurValue(value);
        setClearState("C");
      } else if (value === ".") {
        setCurValue("0.");
        setClearState("C");
      }
    } else {
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

  const multiply = () => {
    startOperation((prevValue, value) => prevValue * value, "multiplication");
  };

  const divide = () => {
    startOperation((prevValue, value) => prevValue / value, "division");
  };

  const add = () => {
    startOperation((prevValue, value) => prevValue + value, "addition");
  };

  const subtract = () => {
    startOperation((prevValue, value) => prevValue - value, "subtract");
  };

  return (
    <>
      <div className="wrapper" style={{ "--buttonWidth": buttonWidth }}>
        <Display curValue={curValue} />
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
            onClick={divide}
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
            onClick={multiply}
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
            onClick={subtract}
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
            onClick={add}
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
