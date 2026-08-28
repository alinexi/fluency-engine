'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Keyboard, Sparkles, Settings, Sun, Moon, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useThemeStore();
  const { user, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

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

        {/* Action Controls: User Profile, Theme Toggle & Settings */}
        <div className="flex items-center gap-2">
          
          {/* User Profile / Login Link */}
          {user ? (
            <Link
              href="/profile"
              className={cn(
                'flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-mono font-semibold transition-all border',
                pathname === '/profile'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800'
              )}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-zinc-950 font-bold text-[10px]">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span>{user.username}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className={cn(
                'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-mono font-medium transition-all border',
                pathname === '/login'
                  ? 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
              )}
            >
              <User className="h-3.5 w-3.5" />
              <span>Log In</span>
            </Link>
          )}

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
