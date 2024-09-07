import { createContext, useContext, useState } from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};
const ThemeContext = createContext("light");

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const themeStyle =
    theme === "dark"
      ? {
          sideBarBackground: "#383939",
          pageBackgroundColor: "#0d0d0d",
          textColorBlack: "black",
          textColorWhite: "white",
          boxBackgroundColor: "#2a2a2a",
          boxBackgroundColor2: "#1e1e1e",
        }
      : {};
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyle }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  return useContext(ThemeContext);
};
export { useTheme, ThemeProvider };
