import { useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";

function App() {
  const [eventKey, setEventKey] = useState();

  const handleKeyDown = (e) => {
    setEventKey(e.key);
  };
  return (
    <div className="App" tabIndex="0" onKeyDown={handleKeyDown}>
      <header className="App-header">
        <h1>React Calculator</h1>
        <Calculator keyPress={eventKey} />
      </header>
    </div>
  );
}

export default App;
