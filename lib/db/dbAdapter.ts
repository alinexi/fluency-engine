import { UserProfile, StudioHistoryRecord, CoachHistoryRecord, UserStats } from './types';

export interface DatabaseAdapter {
  // Auth Operations
  signup(username: string, passwordHash: string): Promise<UserProfile>;
  login(username: string, passwordHash: string): Promise<UserProfile>;
  getCurrentUser(): Promise<UserProfile | null>;
  logout(): Promise<void>;

  // Studio History
  saveStudioSession(record: Omit<StudioHistoryRecord, 'id'>): Promise<StudioHistoryRecord>;
  getStudioHistory(userId: string): Promise<StudioHistoryRecord[]>;

  // Coach History
  saveCoachResult(record: Omit<CoachHistoryRecord, 'id'>): Promise<CoachHistoryRecord>;
  getCoachHistory(userId: string): Promise<CoachHistoryRecord[]>;

  // User Stats Aggregation
  getUserStats(userId: string): Promise<UserStats>;
}
