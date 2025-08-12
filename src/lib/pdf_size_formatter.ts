import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};


export const Pdfwidth = (width:number) => {
    // const { width } = useWindowSize();
    // const pdfWidth = width;
    
    if (width < 360) {
        return 70;
    } else if (width < 1000) {
        return 120;
    } else {
        return 150;
    }
}