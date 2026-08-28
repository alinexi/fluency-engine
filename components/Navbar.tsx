'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Keyboard, Sparkles, Settings, Sun, Moon, Coffee, User, Library } from 'lucide-react';
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

  const getNextThemeLabel = () => {
    if (theme === 'dark') return 'Light theme';
    if (theme === 'light') return 'Warm Coffee theme';
    return 'Dark theme';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-xl transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3 tracking-tight focus-visible:outline-none">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--bg-input)] p-1 border border-[var(--border-color)] shadow-md shadow-emerald-500/10 group-hover:scale-105 transition-transform duration-200 overflow-hidden">
            <Image
              src="/logo-svg.svg"
              alt="FluencyEngine Logo"
              width={36}
              height={36}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold text-[var(--text-main)] tracking-tight flex items-center gap-1">
              Fluency<span className="text-[var(--brand-emerald)] font-mono font-bold">Engine</span>
            </span>
            <span className="text-[10px] font-mono text-[var(--text-subtle)] -mt-1 tracking-wider uppercase">TypeCoach OS</span>
          </div>
        </Link>

        {/* Centered Floating Navigation Pills */}
        <nav aria-label="Main Navigation" className="flex items-center gap-1.5 rounded-2xl bg-[var(--bg-input)] p-1.5 border border-[var(--border-color)] shadow-inner">
          <Link
            href="/studio"
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200',
              pathname.startsWith('/studio')
                ? 'bg-[var(--bg-card)] text-[var(--brand-emerald)] shadow-md border border-[var(--border-color)] font-bold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
            )}
          >
            <Keyboard className="h-4 w-4" />
            <span>Typing Studio</span>
          </Link>

          <Link
            href="/library"
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200',
              pathname.startsWith('/library')
                ? 'bg-[var(--bg-card)] text-amber-400 shadow-md border border-[var(--border-color)] font-bold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
            )}
          >
            <Library className="h-4 w-4" />
            <span>Library</span>
          </Link>

          <Link
            href="/coach"
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200',
              pathname.startsWith('/coach')
                ? 'bg-[var(--bg-card)] text-[var(--brand-violet)] shadow-md border border-[var(--border-color)] font-bold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
            )}
          >
            <Sparkles className="h-4 w-4" />
            <span>Writing Coach</span>
          </Link>
        </nav>

        {/* Right Controls: User Profile, Theme Switcher & Settings */}
        <div className="flex items-center gap-2">
          
          {/* Profile / Auth Button */}
          {user ? (
            <Link
              href="/profile"
              className={cn(
                'flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-mono font-semibold transition-all border border-[var(--border-color)]',
                pathname === '/profile'
                  ? 'bg-emerald-500/15 text-[var(--brand-emerald)] border-emerald-500/30 shadow-sm'
                  : 'bg-[var(--bg-input)] text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
              )}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-emerald)] text-white font-bold text-[10px]">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span>{user.username}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className={cn(
                'flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all border border-[var(--border-color)]',
                pathname === '/login'
                  ? 'bg-violet-500/15 text-[var(--brand-violet)] border-violet-500/30 font-bold'
                  : 'bg-[var(--bg-input)] text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
              )}
            >
              <User className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-xl h-9 w-9 text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)] border border-[var(--border-color)] transition-colors"
            title={`Switch theme (Current: ${theme}). Next: ${getNextThemeLabel()}`}
            aria-label={`Switch theme (Current: ${theme}). Next: ${getNextThemeLabel()}`}
          >
            {theme === 'dark' && <Sun className="h-4 w-4 text-amber-400" />}
            {theme === 'light' && <Coffee className="h-4 w-4 text-amber-700" />}
            {theme === 'coffee' && <Moon className="h-4 w-4 text-indigo-400" />}
          </button>

          {/* Settings */}
          <Link
            href="/settings"
            className={cn(
              'flex items-center justify-center rounded-xl h-9 w-9 text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)] border border-[var(--border-color)] transition-colors',
              pathname === '/settings' && 'text-[var(--text-main)] bg-[var(--bg-card-hover)] border-[var(--border-hover)]'
            )}
            title="Settings & BYOK Keys"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

