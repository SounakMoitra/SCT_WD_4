import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    // Apply to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      console.log('Dark mode enabled');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Dark mode disabled');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    console.log('Toggle dark mode clicked, current state:', isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  return { isDarkMode, toggleDarkMode };
} 