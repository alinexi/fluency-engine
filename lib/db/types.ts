import { SessionMetrics } from '../engine/metrics';
import { EvalResult, ExamMode } from '../plugins/types';

export interface UserProfile {
  id: string;
  username: string;
  createdAt: string;
  avatarUrl?: string;
}

export interface StudioHistoryRecord {
  id: string;
  userId: string;
  title: string;
  date: string;
  metrics: SessionMetrics;
}

export interface CoachHistoryRecord {
  id: string;
  userId: string;
  promptTitle: string;
  examMode: ExamMode;
  date: string;
  essayText: string;
  result: EvalResult;
}

export interface UserStats {
  totalStudioSessions: number;
  totalCoachSessions: number;
  bestWpm: number;
  avgWpm: number;
  avgAccuracy: number;
  avgBandScore: number;
}
