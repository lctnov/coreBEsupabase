"use client";

import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "@/theme.config";
import { Sun, Moon } from "lucide-react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // INIT & SYSTEM SYNC
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    document.documentElement.dataset.theme = initial;
    setMounted(true);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        document.documentElement.dataset.theme = newTheme;
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.dataset.theme = next;
  };

  if (!mounted) return <div className="min-h-screen bg-gray-50 dark:bg-gray-900" />;

  return (
    <ConfigProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <div
        className="min-h-screen transition-colors duration-300
          bg-background-light dark:bg-background-dark
          text-text-light dark:text-text-dark"
      >
        {children}
      </div>

      <button
        onClick={toggleTheme}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full z-50
          flex items-center justify-center shadow-xl border transition-all duration-300
          ${theme === "dark"
            ? "bg-gray-900 text-yellow-300 border-gray-700"
            : "bg-white text-gray-800 border-gray-300"}`}
      >
        {theme === "light" ? <Moon size={24} /> : <Sun size={26} />}
      </button>
    </ConfigProvider>
  );
}
