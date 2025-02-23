import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollRestore() {
  const location = useLocation();

  useEffect(() => {
    // Custom scroll restoration logic, e.g., based on sessionStorage
    const savedPosition = sessionStorage.getItem(location.pathname);
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }

    // Save scroll position before leaving the page
    return () => {
      sessionStorage.setItem(location.pathname, window.scrollY.toString());
    };
  }, [location]);

  return null; // No UI to render, just managing the side-effect.
}

export default ScrollRestore;
