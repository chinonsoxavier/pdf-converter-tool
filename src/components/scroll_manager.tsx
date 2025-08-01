import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollManager = ({ smoothRestore = false }) => {
  const { pathname } = useLocation();
  const positions = useRef({}); // store scroll positions per route
  const prevPath = useRef(pathname);

  useEffect(() => {
    // Save current scroll position for previous route
    positions.current[prevPath.current] = window.scrollY;

    // If we have a saved scroll position for this path (back/forward)
    if (positions.current[pathname] !== undefined) {
      window.scrollTo({
        top: positions.current[pathname],
        behavior: smoothRestore ? "smooth" : "auto", // smooth restore toggle
      });
    } else {
      // New page → always scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    prevPath.current = pathname;
  }, [pathname, smoothRestore]);

  return null;
};


export default ScrollManager;