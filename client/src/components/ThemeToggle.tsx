import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="theme-toggle"
      onClick={toggleTheme}
    >
      <span className="theme-toggle-thumb" aria-hidden="true">
        <span className="theme-toggle-thumb-icon theme-toggle-thumb-sun"><Sun size={17}/></span>
        <span className="theme-toggle-thumb-icon theme-toggle-thumb-moon"><MoonStar size={17}/></span>
      </span>
    </button>
  );
}
