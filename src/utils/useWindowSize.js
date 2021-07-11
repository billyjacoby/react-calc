//* Ended up not needing this function. Left here just in case I change my mind...
import { useState, useEffect } from "react";

function getWindowSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return { width, height };
}

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}
