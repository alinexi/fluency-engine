'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { User, Lock, ShieldCheck, UserPlus, LogIn, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { user, login, signup, isLoading, error } = useAuthStore();
  const router = useRouter();

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!username.trim() || !password) {
      setFormError('Please enter both username and password.');
      return;
    }

    if (!isLoginTab) {
      if (username.trim().length < 3) {
        setFormError('Username must be at least 3 characters long.');
        return;
      }
      if (password.length < 6) {
        setFormError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setFormError('Passwords do not match.');
        return;
      }
    }

    try {
      if (isLoginTab) {
        await login(username.trim(), password);
      } else {
        await signup(username.trim(), password);
      }
      router.push('/profile');
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Authentication failed';
      setFormError(errMsg);
    }
  };


  return (
    <div className="py-12 max-w-md mx-auto px-4 w-full flex-1 flex flex-col justify-center">
      
      {/* Brand Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-violet-600 text-white font-mono font-extrabold text-xl shadow-lg">
          FC
        </div>
        <h1 className="text-2xl font-extrabold text-[var(--text-main)]">
          {isLoginTab ? 'Welcome Back to FluencyEngine' : 'Create Your Profile'}
        </h1>
        <p className="text-xs text-[var(--text-muted)]">
          {isLoginTab ? 'Sign in to access your test history and progress stats.' : 'Register a profile to save your copywork & AI essay reports.'}
        </p>
      </div>

      {/* Auth Card */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 backdrop-blur-xl shadow-xl space-y-6">
        
        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)] text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setIsLoginTab(true); setFormError(null); }}
            className={`py-2 rounded-lg transition-all ${
              isLoginTab
                ? 'bg-[var(--bg-card)] text-[var(--text-main)] shadow-sm font-bold border border-[var(--border-color)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setIsLoginTab(false); setFormError(null); }}
            className={`py-2 rounded-lg transition-all ${
              !isLoginTab
                ? 'bg-[var(--bg-card)] text-[var(--text-main)] shadow-sm font-bold border border-[var(--border-color)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Error */}
        {(formError || error) && (
          <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 p-3.5 border border-rose-500/20 text-rose-500 text-xs">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{formError || error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-[var(--brand-emerald)]" /> Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. john_doe"
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-2.5 text-sm text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:border-[var(--brand-emerald)] focus:outline-none font-mono"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-[var(--brand-violet)]" /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-2.5 text-sm text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:border-[var(--brand-violet)] focus:outline-none font-mono"
            />
          </div>

          {/* Confirm Password (Signup only) */}
          {!isLoginTab && (
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[var(--brand-violet)]" /> Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-2.5 text-sm text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:border-[var(--brand-violet)] focus:outline-none font-mono"
              />
            </div>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 shadow-lg shadow-emerald-500/10 disabled:opacity-50"
          >
            {isLoginTab ? (
              <>
                <LogIn className="h-4 w-4" />
                <span>Log In to Profile</span>
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>Create New Profile</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-[var(--text-subtle)] flex items-center justify-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-emerald)]" />
          <span>SHA-256 Web Crypto Hashed · Pluggable DB Adapter Ready</span>
        </div>
      </div>

    </div>
  );
}

