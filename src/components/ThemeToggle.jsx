import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={onToggle}
      type="button"
      className="p-2 rounded-xl transition-all duration-200 border text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      aria-label="Toggle dark/light mode"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 transition-transform rotate-0 hover:rotate-90 duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700 transition-transform -rotate-12 hover:rotate-0 duration-300" />
      )}
    </button>
  );
}

