import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Choose color theme"
      className="theme-toggle"
    >
      <button
        type="button"
        aria-pressed={theme === "light"}
        className={`theme-toggle-option${theme === "light" ? " is-active" : ""}`}
        onClick={() => setTheme?.("light")}
        title="Use light theme"
      >
        <Sun size={14}/>
        <span>Light</span>
      </button>
      <button
        type="button"
        aria-pressed={theme === "dark"}
        className={`theme-toggle-option${theme === "dark" ? " is-active" : ""}`}
        onClick={() => setTheme?.("dark")}
        title="Use dark theme"
      >
        <MoonStar size={14}/>
        <span>Dark</span>
      </button>
    </div>
  );
}
