'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Key, Cpu, Check, ShieldCheck, Save, Sun, Moon, Square } from 'lucide-react';
import { saveEncryptedApiKey, getDecryptedApiKey } from '@/lib/crypto/keyStore';
import { useCoachStore } from '@/store/coachStore';
import { useStudioStore } from '@/store/studioStore';
import { useThemeStore } from '@/store/themeStore';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { activeProvider, setActiveProvider, ollamaBaseUrl, setOllamaBaseUrl } = useCoachStore();
  const { strictMode, toggleStrictMode, showCharBoxes, toggleCharBoxes } = useStudioStore();
  const { theme, setTheme } = useThemeStore();

  const [openaiKey, setOpenaiKey] = useState('');
  const [deepseekKey, setDeepseekKey] = useState('');
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  useEffect(() => {
    async function loadKeys() {
      const oKey = await getDecryptedApiKey('openai');
      const dKey = await getDecryptedApiKey('deepseek');
      if (oKey) setOpenaiKey(oKey);
      if (dKey) setDeepseekKey(dKey);
    }
    loadKeys();
  }, []);

  const handleSaveKeys = async () => {
    await saveEncryptedApiKey('openai', openaiKey);
    await saveEncryptedApiKey('deepseek', deepseekKey);
    setSavedStatus('Settings & encrypted keys saved successfully!');
    setTimeout(() => setSavedStatus(null), 3000);
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
      
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-2">
          <Settings className="h-4 w-4" />
          SYSTEM CONFIGURATION
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Platform Settings & BYOK Keys</h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
          Configure active AI plugins, encryption keys for BYOK, theme preferences, and canvas settings.
        </p>
      </div>

      {/* Theme Preferences */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-6 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <Sun className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Appearance & Theme</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTheme('dark')}
            className={cn(
              'flex items-center gap-3 rounded-xl border p-4 text-left transition-all',
              theme === 'dark'
                ? 'border-violet-500 bg-violet-500/10 text-white font-bold'
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            )}
          >
            <Moon className="h-5 w-5 text-indigo-400" />
            <div>
              <div className="text-sm font-semibold">Dark Theme</div>
              <div className="text-xs text-zinc-500">Sleek terminal dark UI</div>
            </div>
          </button>

          <button
            onClick={() => setTheme('light')}
            className={cn(
              'flex items-center gap-3 rounded-xl border p-4 text-left transition-all',
              theme === 'light'
                ? 'border-emerald-500 bg-emerald-500/10 text-zinc-900 font-bold'
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            )}
          >
            <Sun className="h-5 w-5 text-amber-500" />
            <div>
              <div className="text-sm font-semibold">Light Theme</div>
              <div className="text-xs text-zinc-500 font-normal">Clean bright paper UI</div>
            </div>
          </button>
        </div>
      </div>

      {/* Writing Coach AI Settings */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-6 backdrop-blur-xl space-y-6">
        <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <Key className="h-5 w-5 text-violet-500 dark:text-violet-400" />
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Writing Coach AI Provider (BYOK)</h2>
        </div>

        {/* Provider Selector */}
        <div className="space-y-3">
          <label className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase">Active AI Plugin</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'openai', label: 'OpenAI (GPT-4o)', desc: 'Official API' },
              { id: 'deepseek', label: 'DeepSeek Chat', desc: 'Cost-Effective' },
              { id: 'ollama', label: 'Ollama (Local)', desc: 'Offline / OSS' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveProvider(p.id)}
                className={cn(
                  'rounded-xl border p-4 text-left transition-all',
                  activeProvider === p.id
                    ? 'border-violet-500 bg-violet-500/10 text-zinc-900 dark:text-white shadow-md font-semibold'
                    : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-700'
                )}
              >
                <div className="font-bold text-sm">{p.label}</div>
                <div className="text-xs text-zinc-500 mt-1">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* OpenAI Key Input */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
            <span>OpenAI API Key (sk-...)</span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> AES-GCM Encrypted in Browser Storage
            </span>
          </label>
          <input
            type="password"
            value={openaiKey}
            onChange={(e) => setOpenaiKey(e.target.value)}
            placeholder="sk-proj-..."
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-violet-500 focus:outline-none font-mono"
          />
        </div>

        {/* DeepSeek Key Input */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
            <span>DeepSeek API Key (sk-...)</span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> AES-GCM Encrypted in Browser Storage
            </span>
          </label>
          <input
            type="password"
            value={deepseekKey}
            onChange={(e) => setDeepseekKey(e.target.value)}
            placeholder="sk-..."
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-violet-500 focus:outline-none font-mono"
          />
        </div>

        {/* Ollama Base URL Input */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
            <span>Ollama Base URL</span>
            <span className="text-[11px] text-zinc-500">Default: http://localhost:11434</span>
          </label>
          <input
            type="text"
            value={ollamaBaseUrl}
            onChange={(e) => setOllamaBaseUrl(e.target.value)}
            placeholder="http://localhost:11434"
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-violet-500 focus:outline-none font-mono"
          />
        </div>

        {/* Save CTA */}
        <div className="flex items-center justify-between pt-2">
          {savedStatus ? (
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-semibold">
              <Check className="h-4 w-4" /> {savedStatus}
            </span>
          ) : (
            <span className="text-xs text-zinc-500">Keys are stored client-side only.</span>
          )}

          <button
            onClick={handleSaveKeys}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-all shadow-md shadow-violet-600/20"
          >
            <Save className="h-4 w-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* Typing Studio Preferences */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-6 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <Cpu className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Typing Studio Preferences</h2>
        </div>

        {/* Strict Mode Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60">
          <div>
            <div className="font-semibold text-zinc-900 dark:text-white text-sm">Strict Match Mode</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Halt cursor progression immediately when a typo occurs. Forces backspacing to fix mistakes.
            </div>
          </div>
          <button
            onClick={toggleStrictMode}
            className={cn(
              'rounded-lg px-4 py-2 text-xs font-mono font-bold transition-all border',
              strictMode
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700'
            )}
          >
            {strictMode ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>

        {/* Character Box Background Square Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60">
          <div>
            <div className="font-semibold text-zinc-900 dark:text-white text-sm">Character Background Boxes</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Draw rounded background boxes around typed characters. Turn OFF for a clean plain-text appearance.
            </div>
          </div>
          <button
            onClick={toggleCharBoxes}
            className={cn(
              'rounded-lg px-4 py-2 text-xs font-mono font-bold transition-all border',
              showCharBoxes
                ? 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700'
            )}
          >
            {showCharBoxes ? 'BOXES ON' : 'BOXES OFF'}
          </button>
        </div>
      </div>

    </div>
  );
}
