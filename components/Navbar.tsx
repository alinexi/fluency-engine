'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Keyboard, Sparkles, Settings, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/themeStore';

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-white transition-opacity hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 via-teal-500 to-indigo-600 text-zinc-950 font-mono font-extrabold text-lg">
            FC
          </div>
          <span>Fluency<span className="text-emerald-500 dark:text-emerald-400 font-mono">Engine</span></span>
        </Link>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 rounded-xl bg-zinc-100 dark:bg-zinc-900/90 p-1.5 border border-zinc-200 dark:border-zinc-800">
          <Link
            href="/studio"
            className={cn(
              'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
              pathname.startsWith('/studio')
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
            )}
          >
            <Keyboard className="h-4 w-4" />
            <span>Typing Studio</span>
          </Link>

          <Link
            href="/coach"
            className={cn(
              'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
              pathname.startsWith('/coach')
                ? 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/30 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
            )}
          >
            <Sparkles className="h-4 w-4" />
            <span>Writing Coach</span>
          </Link>
        </nav>

        {/* Action Controls: Theme Toggle & Settings */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-lg p-2.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-indigo-600" />}
          </button>

          {/* Settings */}
          <Link
            href="/settings"
            className={cn(
              'flex items-center gap-2 rounded-lg p-2.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors',
              pathname === '/settings' && 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800'
            )}
            title="Settings & BYOK Keys"
          >
            <Settings className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
