'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useCoachStore } from '@/store/coachStore';
import { useRouter } from 'next/navigation';
import { User, LogOut, Gauge, Target, Award, Keyboard, Sparkles, Calendar, History, ArrowRight } from 'lucide-react';
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
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Profile Access Required</h2>
        <p className="text-sm text-zinc-500">Please log in or sign up to view your profile and test history.</p>
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-violet-600 text-zinc-950 font-extrabold text-2xl shadow-lg">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
              <span>{user.username}</span>
              <span className="text-xs font-mono font-normal rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 border border-emerald-500/20">
                PRO PROFILE
              </span>
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-1">
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
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:bg-rose-500/10 hover:text-rose-600 hover:border-rose-500/30 transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-5 text-center">
          <div className="flex justify-center text-emerald-500 mb-1">
            <Gauge className="h-5 w-5" />
          </div>
          <div className="text-xs font-mono text-zinc-500 uppercase">Best WPM</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">{stats?.bestWpm || 0}</div>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-5 text-center">
          <div className="flex justify-center text-teal-500 mb-1">
            <Target className="h-5 w-5" />
          </div>
          <div className="text-xs font-mono text-zinc-500 uppercase">Avg Accuracy</div>
          <div className="text-2xl font-extrabold font-mono text-teal-600 dark:text-teal-400">{stats?.avgAccuracy || 100}%</div>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-5 text-center">
          <div className="flex justify-center text-violet-500 mb-1">
            <Award className="h-5 w-5" />
          </div>
          <div className="text-xs font-mono text-zinc-500 uppercase">Avg Band Score</div>
          <div className="text-2xl font-extrabold font-mono text-violet-600 dark:text-violet-400">{stats?.avgBandScore || 0}</div>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 p-5 text-center">
          <div className="flex justify-center text-amber-500 mb-1">
            <History className="h-5 w-5" />
          </div>
          <div className="text-xs font-mono text-zinc-500 uppercase">Total Tests</div>
          <div className="text-2xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
            {(stats?.totalStudioSessions || 0) + (stats?.totalCoachSessions || 0)}
          </div>
        </div>

      </div>

      {/* Test History Section Tabs */}
      <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-violet-500" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Saved Test History</h2>
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 p-1 border border-zinc-200 dark:border-zinc-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'studio'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Copywork History ({studioHistory.length})
            </button>
            <button
              onClick={() => setActiveTab('coach')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'coach'
                  ? 'bg-violet-500/15 text-violet-600 dark:text-violet-400 font-bold border border-violet-500/30'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
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
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 p-8 text-center text-sm text-zinc-500">
                No copywork sessions saved yet. Complete a session in Typing Studio to record your stats!
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {studioHistory.map((item) => (
                  <div key={item.id} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-zinc-900 dark:text-white truncate max-w-[180px]">{item.title}</span>
                      <span className="text-zinc-400">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{item.metrics.netWpm} WPM</span>
                      <span className="text-teal-600 dark:text-teal-400">{item.metrics.accuracy}% Acc</span>
                      <span className="text-zinc-500">{item.metrics.timeElapsedSeconds}s</span>
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
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 p-8 text-center text-sm text-zinc-500">
                No AI essay reports saved yet. Submit an essay in Writing Coach to get Band 9 examiner feedback!
              </div>
            ) : (
              <div className="space-y-3">
                {coachHistory.map((record) => (
                  <div
                    key={record.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 hover:border-violet-500/40 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-violet-500/10 px-2 py-0.5 text-[11px] font-mono font-bold text-violet-600 dark:text-violet-400 border border-violet-500/20 uppercase">
                          {record.examMode}
                        </span>
                        <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{record.promptTitle}</h4>
                      </div>
                      <p className="text-xs text-zinc-500 line-clamp-1 italic font-serif">
                        "{record.essayText}"
                      </p>
                      <div className="text-[11px] font-mono text-zinc-400 pt-1">
                        Evaluated on {new Date(record.date).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-zinc-400">BAND SCORE</div>
                        <div className="text-xl font-extrabold font-mono text-violet-600 dark:text-violet-400">
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
