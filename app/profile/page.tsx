'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useCoachStore } from '@/store/coachStore';
import { useRouter } from 'next/navigation';
import { LogOut, Gauge, Target, Award, Calendar, History, ArrowRight } from 'lucide-react';
import { CoachHistoryRecord } from '@/lib/db/types';

export default function ProfilePage() {
  const { user, stats, studioHistory, coachHistory, logout, initializeAuth } = useAuthStore();
  const { setResult } = useCoachStore();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'studio' | 'coach'>('studio');

  useEffect(() => {
    initializeAuth();
  }, []);

  if (!user) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-main)]">Profile Access Required</h2>
        <p className="text-sm text-[var(--text-muted)]">Please log in or sign up to view your profile and test history.</p>
        <button
          onClick={() => router.push('/login')}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-all"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleViewCoachReport = (record: CoachHistoryRecord) => {
    setResult(record.result);
    router.push('/coach/results');
  };

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
      
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-violet-600 text-white font-extrabold text-2xl shadow-lg">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[var(--text-main)] flex items-center gap-2">
              <span>{user.username}</span>
              <span className="text-xs font-mono font-normal rounded-full bg-emerald-500/10 text-[var(--brand-emerald)] px-2.5 py-0.5 border border-emerald-500/20">
                PRO PROFILE
              </span>
            </h1>
            <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 mt-1">
              <Calendar className="h-3.5 w-3.5" />
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <button
          onClick={async () => {
            await logout();
            router.push('/');
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2 text-xs font-mono text-[var(--text-muted)] hover:bg-rose-500/10 hover:text-rose-600 hover:border-rose-500/30 transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 text-center shadow-sm">
          <div className="flex justify-center text-[var(--brand-emerald)] mb-1">
            <Gauge className="h-5 w-5" />
          </div>
          <div className="text-xs font-mono text-[var(--text-subtle)] uppercase">Best WPM</div>
          <div className="text-2xl font-extrabold font-mono text-[var(--brand-emerald)]">{stats?.bestWpm || 0}</div>
        </div>

        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 text-center shadow-sm">
          <div className="flex justify-center text-teal-500 mb-1">
            <Target className="h-5 w-5" />
          </div>
          <div className="text-xs font-mono text-[var(--text-subtle)] uppercase">Avg Accuracy</div>
          <div className="text-2xl font-extrabold font-mono text-teal-500">{stats?.avgAccuracy || 100}%</div>
        </div>

        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 text-center shadow-sm">
          <div className="flex justify-center text-[var(--brand-violet)] mb-1">
            <Award className="h-5 w-5" />
          </div>
          <div className="text-xs font-mono text-[var(--text-subtle)] uppercase">Avg Band Score</div>
          <div className="text-2xl font-extrabold font-mono text-[var(--brand-violet)]">{stats?.avgBandScore || 0}</div>
        </div>

        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 text-center shadow-sm">
          <div className="flex justify-center text-[var(--brand-amber)] mb-1">
            <History className="h-5 w-5" />
          </div>
          <div className="text-xs font-mono text-[var(--text-subtle)] uppercase">Total Tests</div>
          <div className="text-2xl font-extrabold font-mono text-[var(--brand-amber)]">
            {(stats?.totalStudioSessions || 0) + (stats?.totalCoachSessions || 0)}
          </div>
        </div>

      </div>

      {/* Test History Section Tabs */}
      <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-[var(--brand-violet)]" />
            <h2 className="text-lg font-bold text-[var(--text-main)]">Saved Test History</h2>
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-[var(--bg-input)] p-1 border border-[var(--border-color)] text-xs font-mono">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'studio'
                  ? 'bg-emerald-500/15 text-[var(--brand-emerald)] font-bold border border-emerald-500/30'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              Copywork History ({studioHistory.length})
            </button>
            <button
              onClick={() => setActiveTab('coach')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'coach'
                  ? 'bg-violet-500/15 text-[var(--brand-violet)] font-bold border border-violet-500/30'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              AI Essay Reports ({coachHistory.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Typing Studio Copywork History */}
        {activeTab === 'studio' && (
          <div>
            {studioHistory.length === 0 ? (
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 text-center text-sm text-[var(--text-muted)]">
                No copywork sessions saved yet. Complete a session in Typing Studio to record your stats!
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {studioHistory.map((item) => (
                  <div key={item.id} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-[var(--text-main)] truncate max-w-[180px]">{item.title}</span>
                      <span className="text-[var(--text-subtle)]">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[var(--border-color)]">
                      <span className="text-[var(--brand-emerald)] font-bold">{item.metrics.netWpm} WPM</span>
                      <span className="text-teal-500">{item.metrics.accuracy}% Acc</span>
                      <span className="text-[var(--text-subtle)]">{item.metrics.timeElapsedSeconds}s</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Writing Coach AI Essay Reports History */}
        {activeTab === 'coach' && (
          <div>
            {coachHistory.length === 0 ? (
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 text-center text-sm text-[var(--text-muted)]">
                No AI essay reports saved yet. Submit an essay in Writing Coach to get Band 9 examiner feedback!
              </div>
            ) : (
              <div className="space-y-3">
                {coachHistory.map((record) => (
                  <div
                    key={record.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 hover:border-[var(--brand-violet)]/40 transition-all shadow-sm"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-violet-500/10 px-2 py-0.5 text-[11px] font-mono font-bold text-[var(--brand-violet)] border border-violet-500/20 uppercase">
                          {record.examMode}
                        </span>
                        <h4 className="font-bold text-[var(--text-main)] text-sm">{record.promptTitle}</h4>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-1 italic font-serif">
                        &ldquo;{record.essayText}&rdquo;
                      </p>

                      <div className="text-[11px] font-mono text-[var(--text-subtle)] pt-1">
                        Evaluated on {new Date(record.date).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-[var(--text-subtle)]">BAND SCORE</div>
                        <div className="text-xl font-extrabold font-mono text-[var(--brand-violet)]">
                          {record.result.overallBand} / {record.result.overallMax || 9}
                        </div>
                      </div>

                      <button
                        onClick={() => handleViewCoachReport(record)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-violet-500 transition-all shadow-md shadow-violet-600/20"
                      >
                        <span>View Report</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}

