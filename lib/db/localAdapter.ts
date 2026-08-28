import { DatabaseAdapter } from './dbAdapter';
import { UserProfile, StudioHistoryRecord, CoachHistoryRecord, UserStats } from './types';

const USERS_KEY = 'typecoach_db_users';
const CURRENT_USER_KEY = 'typecoach_db_current_user';
const STUDIO_HIST_KEY = 'typecoach_db_studio_history_';
const COACH_HIST_KEY = 'typecoach_db_coach_history_';

interface StoredUserCredential {
  profile: UserProfile;
  passwordHash: string;
}

export async function hashPassword(password: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const localDbAdapter: DatabaseAdapter = {
  async signup(username: string, passwordHash: string): Promise<UserProfile> {
    if (typeof window === 'undefined') throw new Error('Client side only');

    const cleanUsername = username.trim();
    if (cleanUsername.length < 3) {
      throw new Error('Username must be at least 3 characters long.');
    }

    const rawUsers = localStorage.getItem(USERS_KEY);
    const users: StoredUserCredential[] = rawUsers ? JSON.parse(rawUsers) : [];

    const existing = users.find(u => u.profile.username.toLowerCase() === cleanUsername.toLowerCase());
    if (existing) {
      throw new Error('Username is already taken. Please choose another or log in.');
    }

    const newProfile: UserProfile = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      username: cleanUsername,
      createdAt: new Date().toISOString(),
    };

    users.push({ profile: newProfile, passwordHash });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newProfile));

    return newProfile;
  },

  async login(username: string, passwordHash: string): Promise<UserProfile> {
    if (typeof window === 'undefined') throw new Error('Client side only');

    const cleanUsername = username.trim();
    const rawUsers = localStorage.getItem(USERS_KEY);
    const users: StoredUserCredential[] = rawUsers ? JSON.parse(rawUsers) : [];

    const matched = users.find(
      u => u.profile.username.toLowerCase() === cleanUsername.toLowerCase() && u.passwordHash === passwordHash
    );

    if (!matched) {
      throw new Error('Invalid username or password.');
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(matched.profile));
    return matched.profile;
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  async logout(): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  async saveStudioSession(record: Omit<StudioHistoryRecord, 'id'>): Promise<StudioHistoryRecord> {
    if (typeof window === 'undefined') throw new Error('Client side only');

    const key = STUDIO_HIST_KEY + record.userId;
    const raw = localStorage.getItem(key);
    const history: StudioHistoryRecord[] = raw ? JSON.parse(raw) : [];

    const newRecord: StudioHistoryRecord = {
      ...record,
      id: `std_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
    };

    history.unshift(newRecord);
    localStorage.setItem(key, JSON.stringify(history));
    return newRecord;
  },

  async getStudioHistory(userId: string): Promise<StudioHistoryRecord[]> {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(STUDIO_HIST_KEY + userId);
    return raw ? JSON.parse(raw) : [];
  },

  async saveCoachResult(record: Omit<CoachHistoryRecord, 'id'>): Promise<CoachHistoryRecord> {
    if (typeof window === 'undefined') throw new Error('Client side only');

    const key = COACH_HIST_KEY + record.userId;
    const raw = localStorage.getItem(key);
    const history: CoachHistoryRecord[] = raw ? JSON.parse(raw) : [];

    const newRecord: CoachHistoryRecord = {
      ...record,
      id: `cch_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
    };

    history.unshift(newRecord);
    localStorage.setItem(key, JSON.stringify(history));
    return newRecord;
  },

  async getCoachHistory(userId: string): Promise<CoachHistoryRecord[]> {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(COACH_HIST_KEY + userId);
    return raw ? JSON.parse(raw) : [];
  },

  async getUserStats(userId: string): Promise<UserStats> {
    const studioHistory = await this.getStudioHistory(userId);
    const coachHistory = await this.getCoachHistory(userId);

    const totalStudio = studioHistory.length;
    const totalCoach = coachHistory.length;

    let bestWpm = 0;
    let sumWpm = 0;
    let sumAcc = 0;

    studioHistory.forEach(s => {
      if (s.metrics.netWpm > bestWpm) bestWpm = s.metrics.netWpm;
      sumWpm += s.metrics.netWpm;
      sumAcc += s.metrics.accuracy;
    });

    let sumBand = 0;
    coachHistory.forEach(c => {
      sumBand += c.result.overallBand;
    });

    return {
      totalStudioSessions: totalStudio,
      totalCoachSessions: totalCoach,
      bestWpm,
      avgWpm: totalStudio > 0 ? Math.round(sumWpm / totalStudio) : 0,
      avgAccuracy: totalStudio > 0 ? Number((sumAcc / totalStudio).toFixed(1)) : 100,
      avgBandScore: totalCoach > 0 ? Number((sumBand / totalCoach).toFixed(1)) : 0,
    };
  },
};
