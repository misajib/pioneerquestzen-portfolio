import { createContext, useContext, useEffect, useMemo, useState } from "react";

const THEME_STORAGE_KEY = "portfolio-theme";

export const themeTokens = {
  dark: {
    pageBg: "#0B0F19",
    pageBgAlt: "#111827",
    navBg: "rgba(11,15,25,0.85)",
    surface: "rgba(255,255,255,0.03)",
    surfaceStrong: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.07)",
    borderSoft: "rgba(255,255,255,0.12)",
    textPrimary: "#F9FAFB",
    textSecondary: "#9CA3AF",
    textMuted: "#4B5563",
    inputBg: "rgba(255,255,255,0.04)",
    inputBorder: "rgba(255,255,255,0.10)",
    sectionBg: "rgba(17,24,39,0.40)",
    overlay: "rgba(2,6,23,0.60)",
    shadow: "0 20px 60px rgba(0,0,0,0.30)",
  },
  light: {
    pageBg: "#F8FAFC",
    pageBgAlt: "#EEF2F7",
    navBg: "rgba(248,250,252,0.86)",
    surface: "rgba(255,255,255,0.85)",
    surfaceStrong: "rgba(255,255,255,0.94)",
    border: "rgba(0,0,0,0.08)",
    borderSoft: "rgba(0,0,0,0.12)",
    textPrimary: "#111827",
    textSecondary: "#374151",
    textMuted: "#6B7280",
    inputBg: "rgba(255,255,255,0.95)",
    inputBorder: "rgba(0,0,0,0.12)",
    sectionBg: "rgba(241,245,249,0.88)",
    overlay: "rgba(15,23,42,0.22)",
    shadow: "0 18px 40px rgba(15,23,42,0.10)",
  },
};

const ThemeContext = createContext(null);

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  } catch {
    return "dark";
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures.
    }
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    resolvedTheme: themeTokens[theme],
    isDark: theme === "dark",
    isLight: theme === "light",
    setTheme,
    toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}