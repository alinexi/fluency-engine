import { DatabaseAdapter } from './dbAdapter';
import { UserProfile, StudioHistoryRecord, CoachHistoryRecord, UserStats } from './types';
import { supabase } from './supabaseClient';

const CURRENT_USER_KEY = 'typecoach_db_current_user';

export const supabaseDbAdapter: DatabaseAdapter = {
  async signup(username: string, passwordHash: string): Promise<UserProfile> {
    const cleanUsername = username.trim();
    if (cleanUsername.length < 3) {
      throw new Error('Username must be at least 3 characters long.');
    }

    // Check if username exists in Supabase profiles
    const { data: existing, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .ilike('username', cleanUsername)
      .maybeSingle();

    if (checkError) {
      console.error('Supabase signup check error:', checkError);
    }

    if (existing) {
      throw new Error('Username is already taken. Please choose another or log in.');
    }

    const newProfile: UserProfile = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      username: cleanUsername,
      createdAt: new Date().toISOString(),
    };

    const { error: insertError } = await supabase.from('profiles').insert({
      id: newProfile.id,
      username: newProfile.username,
      password_hash: passwordHash,
      created_at: newProfile.createdAt,
    });

    if (insertError) {
      throw new Error(`Failed to create account: ${insertError.message}`);
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newProfile));
    }

    return newProfile;
  },

  async login(username: string, passwordHash: string): Promise<UserProfile> {
    const cleanUsername = username.trim();

    const { data: matchedUser, error } = await supabase
      .from('profiles')
      .select('id, username, created_at, password_hash')
      .ilike('username', cleanUsername)
      .eq('password_hash', passwordHash)
      .maybeSingle();

    if (error || !matchedUser) {
      throw new Error('Invalid username or password.');
    }

    const profile: UserProfile = {
      id: matchedUser.id,
      username: matchedUser.username,
      createdAt: matchedUser.created_at,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(profile));
    }

    return profile;
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
    const newRecord: StudioHistoryRecord = {
      ...record,
      id: `std_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
    };

    const { error } = await supabase.from('studio_history').insert({
      id: newRecord.id,
      user_id: newRecord.userId,
      title: newRecord.title,
      date: newRecord.date,
      metrics: newRecord.metrics,
    });

    if (error) {
      console.error('Failed to save studio session to Supabase:', error);
    }

    return newRecord;
  },

  async getStudioHistory(userId: string): Promise<StudioHistoryRecord[]> {
    const { data, error } = await supabase
      .from('studio_history')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) {
      console.error('Failed to fetch studio history from Supabase:', error);
      return [];
    }

    return (data || []).map((row: Record<string, unknown>) => ({
      id: row.id as string,
      userId: row.user_id as string,
      title: row.title as string,
      date: row.date as string,
      metrics: row.metrics as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    }));
  },

  async saveCoachResult(record: Omit<CoachHistoryRecord, 'id'>): Promise<CoachHistoryRecord> {
    const newRecord: CoachHistoryRecord = {
      ...record,
      id: `cch_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
    };

    const { error } = await supabase.from('coach_history').insert({
      id: newRecord.id,
      user_id: newRecord.userId,
      prompt_title: newRecord.promptTitle,
      exam_mode: newRecord.examMode,
      date: newRecord.date,
      essay_text: newRecord.essayText,
      result: newRecord.result,
    });

    if (error) {
      console.error('Failed to save coach result to Supabase:', error);
    }

    return newRecord;
  },

  async getCoachHistory(userId: string): Promise<CoachHistoryRecord[]> {
    const { data, error } = await supabase
      .from('coach_history')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) {
      console.error('Failed to fetch coach history from Supabase:', error);
      return [];
    }

    return (data || []).map((row: Record<string, unknown>) => ({
      id: row.id as string,
      userId: row.user_id as string,
      promptTitle: row.prompt_title as string,
      examMode: row.exam_mode as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      date: row.date as string,
      essayText: row.essay_text as string,
      result: row.result as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    }));
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
