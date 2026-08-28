'use client';

import React, { useEffect } from 'react';

import { useThemeStore, Theme } from '@/store/themeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem('typecoach_theme') as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'coffee') {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('typecoach_theme', theme);
    root.classList.remove('dark', 'light', 'coffee');
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}


