'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Key, Cpu, Check, ShieldCheck, Save, Sun, Moon, Coffee } from 'lucide-react';
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
      <div className="border-b border-[var(--border-color)] pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-subtle)] mb-2">
          <Settings className="h-4 w-4" />
          SYSTEM CONFIGURATION
        </div>
        <h1 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight">Platform Settings & BYOK Keys</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">
          Configure active AI plugins, encryption keys for BYOK, theme preferences, and canvas settings.
        </p>
      </div>

      {/* Theme Preferences */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-4">
          <Sun className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-bold text-[var(--text-main)]">Appearance & Theme</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setTheme('dark')}
            className={cn(
              'flex items-center gap-3 rounded-xl border p-4 text-left transition-all',
              theme === 'dark'
                ? 'border-violet-500 bg-violet-500/10 text-[var(--text-main)] font-bold ring-2 ring-violet-500/30'
                : 'border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)]'
            )}
          >
            <Moon className="h-5 w-5 text-indigo-400" />
            <div>
              <div className="text-sm font-semibold">Dark Theme</div>
              <div className="text-xs text-[var(--text-subtle)]">Sleek dark UI</div>
            </div>
          </button>

          <button
            onClick={() => setTheme('light')}
            className={cn(
              'flex items-center gap-3 rounded-xl border p-4 text-left transition-all',
              theme === 'light'
                ? 'border-emerald-500 bg-emerald-500/10 text-[var(--text-main)] font-bold ring-2 ring-emerald-500/30'
                : 'border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)]'
            )}
          >
            <Sun className="h-5 w-5 text-amber-500" />
            <div>
              <div className="text-sm font-semibold">Light Theme</div>
              <div className="text-xs text-[var(--text-subtle)]">Clean bright paper UI</div>
            </div>
          </button>

          <button
            onClick={() => setTheme('coffee')}
            className={cn(
              'flex items-center gap-3 rounded-xl border p-4 text-left transition-all',
              theme === 'coffee'
                ? 'border-amber-500 bg-amber-500/10 text-[var(--text-main)] font-bold ring-2 ring-amber-500/30'
                : 'border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)]'
            )}
          >
            <Coffee className="h-5 w-5 text-amber-600" />
            <div>
              <div className="text-sm font-semibold">Warm Coffee</div>
              <div className="text-xs text-[var(--text-subtle)]">Monkeytype espresso UI</div>
            </div>
          </button>
        </div>
      </div>

      {/* Writing Coach AI Settings */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 backdrop-blur-xl space-y-6">
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-4">
          <Key className="h-5 w-5 text-[var(--brand-violet)]" />
          <h2 className="text-lg font-bold text-[var(--text-main)]">Writing Coach AI Provider (BYOK)</h2>
        </div>

        {/* Provider Selector */}
        <div className="space-y-3">
          <label className="text-xs font-mono text-[var(--text-subtle)] uppercase">Active AI Plugin</label>
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
                    ? 'border-violet-500 bg-violet-500/10 text-[var(--text-main)] shadow-md font-semibold'
                    : 'border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-muted)] hover:border-[var(--border-hover)]'
                )}
              >
                <div className="font-bold text-sm">{p.label}</div>
                <div className="text-xs text-[var(--text-subtle)] mt-1">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* OpenAI Key Input */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-[var(--text-subtle)] flex items-center justify-between">
            <span>OpenAI API Key (sk-...)</span>
            <span className="text-[11px] text-[var(--brand-emerald)] flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> AES-GCM Encrypted in Browser Storage
            </span>
          </label>
          <input
            type="password"
            value={openaiKey}
            onChange={(e) => setOpenaiKey(e.target.value)}
            placeholder="sk-proj-..."
            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-2.5 text-sm text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:border-[var(--brand-violet)] focus:outline-none font-mono"
          />
        </div>

        {/* DeepSeek Key Input */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-[var(--text-subtle)] flex items-center justify-between">
            <span>DeepSeek API Key (sk-...)</span>
            <span className="text-[11px] text-[var(--brand-emerald)] flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> AES-GCM Encrypted in Browser Storage
            </span>
          </label>
          <input
            type="password"
            value={deepseekKey}
            onChange={(e) => setDeepseekKey(e.target.value)}
            placeholder="sk-..."
            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-2.5 text-sm text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:border-[var(--brand-violet)] focus:outline-none font-mono"
          />
        </div>

        {/* Ollama Base URL Input */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-[var(--text-subtle)] flex items-center justify-between">
            <span>Ollama Base URL</span>
            <span className="text-[11px] text-[var(--text-subtle)]">Default: http://localhost:11434</span>
          </label>
          <input
            type="text"
            value={ollamaBaseUrl}
            onChange={(e) => setOllamaBaseUrl(e.target.value)}
            placeholder="http://localhost:11434"
            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-2.5 text-sm text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:border-[var(--brand-violet)] focus:outline-none font-mono"
          />
        </div>

        {/* Save CTA */}
        <div className="flex items-center justify-between pt-2">
          {savedStatus ? (
            <span className="text-xs font-mono text-[var(--brand-emerald)] flex items-center gap-1.5 font-semibold">
              <Check className="h-4 w-4" /> {savedStatus}
            </span>
          ) : (
            <span className="text-xs text-[var(--text-subtle)]">Keys are stored client-side only.</span>
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
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-4">
          <Cpu className="h-5 w-5 text-[var(--brand-emerald)]" />
          <h2 className="text-lg font-bold text-[var(--text-main)]">Typing Studio Preferences</h2>
        </div>

        {/* Strict Mode Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)]">
          <div>
            <div className="font-semibold text-[var(--text-main)] text-sm">Strict Match Mode</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">
              Halt cursor progression immediately when a typo occurs. Forces backspacing to fix mistakes.
            </div>
          </div>
          <button
            onClick={toggleStrictMode}
            className={cn(
              'rounded-lg px-4 py-2 text-xs font-mono font-bold transition-all border',
              strictMode
                ? 'bg-emerald-500/15 text-[var(--brand-emerald)] border-emerald-500/30'
                : 'bg-[var(--bg-card-hover)] text-[var(--text-muted)] border-[var(--border-color)]'
            )}
          >
            {strictMode ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>

        {/* Character Box Background Square Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)]">
          <div>
            <div className="font-semibold text-[var(--text-main)] text-sm">Character Background Boxes</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">
              Draw rounded background boxes around typed characters. Turn OFF for a clean plain-text appearance.
            </div>
          </div>
          <button
            onClick={toggleCharBoxes}
            className={cn(
              'rounded-lg px-4 py-2 text-xs font-mono font-bold transition-all border',
              showCharBoxes
                ? 'bg-violet-500/15 text-[var(--brand-violet)] border-violet-500/30'
                : 'bg-[var(--bg-card-hover)] text-[var(--text-muted)] border-[var(--border-color)]'
            )}
          >
            {showCharBoxes ? 'BOXES ON' : 'BOXES OFF'}
          </button>
        </div>

        {/* Active Character Box Highlight Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)]">
          <div>
            <div className="font-semibold text-[var(--text-main)] text-sm">Active Character Green Box</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">
              Highlights the current character to type with a green rectangle border. Turn OFF for cursor line only.
            </div>
          </div>
          <button
            onClick={useStudioStore.getState().toggleActiveHighlight}
            className={cn(
              'rounded-lg px-4 py-2 text-xs font-mono font-bold transition-all border',
              useStudioStore(state => state.showActiveHighlight)
                ? 'bg-emerald-500/15 text-[var(--brand-emerald)] border-emerald-500/30'
                : 'bg-[var(--bg-card-hover)] text-[var(--text-muted)] border-[var(--border-color)]'
            )}
          >
            {useStudioStore(state => state.showActiveHighlight) ? 'BOX ON' : 'BOX OFF'}
          </button>
        </div>
      </div>

    </div>
  );
}

