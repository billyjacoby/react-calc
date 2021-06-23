import React from "react";
import "./Calculator.css";

const Calculator = () => {
  return (
    <div className="wrapper">
      <div className="display">
        <span>0</span>
      </div>
      <div className="button-row">
        <button className="button function">AC</button>
        <button className="button function">+/-</button>
        <button className="button function">%</button>
        <button className="button operation">÷</button>
      </div>
      <div className="button-row">
        <button className="button number">7</button>
        <button className="button number">8</button>
        <button className="button number">9</button>
        <button className="button operation">×</button>
      </div>
      <div className="button-row">
        <button className="button number">4</button>
        <button className="button number">5</button>
        <button className="button number">6</button>
        <button className="button operation">-</button>
      </div>
      <div className="button-row">
        <button className="button number">1</button>
        <button className="button number">2</button>
        <button className="button number">3</button>
        <button className="button">÷</button>
      </div>
      <div className="button-row">
        <button className="button number double">0</button>
        <button className="button number">.</button>
        <button className="button operation">=</button>
      </div>
    </div>
  );
};

export default Calculator;
