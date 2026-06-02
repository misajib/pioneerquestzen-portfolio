import { useTheme } from "./theme-context";

export default function ThemeToggleButton({ className = "", compact = false }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={!isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`theme-toggle ${compact ? "theme-toggle--compact" : ""} ${className}`.trim()}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isDark ? "☾" : "☀"}
      </span>
      <span className="theme-toggle__label">{isDark ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}