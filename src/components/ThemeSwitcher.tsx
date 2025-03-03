
import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check for saved theme preference or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // Default theme
  });

  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "flex items-center justify-center rounded-full p-2 transition-colors",
        "hover:bg-secondary",
        "focus:outline-none focus:ring-2 focus:ring-primary"
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={18} className="text-foreground" />
      ) : (
        <Sun size={18} className="text-foreground" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
