import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-dark-100 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-dark-200 transition-colors shadow-sm focus:outline-none"
            aria-label="Toggle Theme"
        >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
};

export default ThemeToggle;
