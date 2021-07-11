import { useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";

function App() {
  //! VARIABLES THAT AFFECT CSS:
  const [buttonWidth, setButtonWidth] = useState("8vw");

  const onSliderChange = (e) => {
    console.log(e.target.value);
    const newWidth = e.target.value + "vw";

    setButtonWidth(newWidth);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Calculator</h1>
        <div className="slider-container">
          <label>Adjust Size:</label>
          <br />
          <input
            type="range"
            min="5"
            max="24"
            defaultValue="8"
            onChange={(e) => onSliderChange(e)}
          />
        </div>
        <Calculator buttonWidth={buttonWidth} />
      </header>
    </div>
  );
}

export default App;
