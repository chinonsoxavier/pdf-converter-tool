import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollManager = ({ smoothRestore = false }) => {
  interface ScrollPositions {
    [key: string]: number; // Allow string keys with number values
  }
  const { pathname } = useLocation();
  const positions = useRef<ScrollPositions>({});
  const prevPath = useRef(pathname);

  useEffect(() => {
    // Save current scroll position for previous route
if (prevPath.current) {
  positions.current[prevPath.current] = window.scrollY; // Safe assignment
}
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