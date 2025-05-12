
import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "neon" | "cosmic" | "retro";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("neon");

  useEffect(() => {
    // Check for saved theme in local storage
    const savedTheme = localStorage.getItem("echoTheme") as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("echoTheme", newTheme);
    
    // Apply theme-specific classes to the body
    document.body.classList.remove("theme-neon", "theme-cosmic", "theme-retro");
    document.body.classList.add(`theme-${newTheme}`);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
