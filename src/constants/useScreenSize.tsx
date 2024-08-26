import { useState, useEffect } from "react";

const useScreenSize = () => {
  const getScreenCategory = (width) => {
    if (width < 768) {
      return "small";
    } else if (width >= 768 && width < 1024) {
      return "medium";
    } else {
      return "large";
    }
  };
  const [screenSizeCategory, setScreenSizeCategory] = useState(
    getScreenCategory(window.innerWidth)
  );
  useEffect(() => {
    const handleResize = () => {
      setScreenSizeCategory(getScreenCategory(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { screenSizeCategory };
};

export default useScreenSize;
