import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "auto";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.remove("dark");
      root.classList.remove("light");
    }

    if (theme !== "auto") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <div className="flex items-center space-x-4 p-4">
      <button
        onClick={() => setTheme("light")}
        className={`py-2 px-4 rounded ${
          theme === "light"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`py-2 px-4 rounded ${
          theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        Dark
      </button>
      <button
        onClick={() => setTheme("auto")}
        className={`py-2 px-4 rounded ${
          theme === "auto" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        Auto
      </button>
    </div>
  );
};

export default ThemeToggle;
