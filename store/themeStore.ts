import { create } from 'zustand';

export type Theme = 'dark' | 'light' | 'coffee';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'dark',
  setTheme: (theme: Theme) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('dark', 'light', 'coffee');
      root.classList.add(theme);
    }
    set({ theme });
  },
  toggleTheme: () => {
    const current = get().theme;
    const nextTheme: Theme = current === 'dark' ? 'light' : current === 'light' ? 'coffee' : 'dark';
    get().setTheme(nextTheme);
  },
}));

