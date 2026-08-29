import { create } from 'zustand';
import { UserProfile, UserStats, StudioHistoryRecord, CoachHistoryRecord } from '@/lib/db/types';
import { hashPassword } from '@/lib/db/localAdapter';
import { getDbAdapter } from '@/lib/db/getAdapter';

interface AuthState {
  user: UserProfile | null;
  stats: UserStats | null;
  studioHistory: StudioHistoryRecord[];
  coachHistory: CoachHistoryRecord[];
  isLoading: boolean;
  error: string | null;

  // Actions
  initializeAuth: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshHistoryAndStats: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  stats: null,
  studioHistory: [],
  coachHistory: [],
  isLoading: true,
  error: null,

  initializeAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const adapter = getDbAdapter();
      const user = await adapter.getCurrentUser();
      if (user) {
        set({ user });
        await get().refreshHistoryAndStats();
      }
    } catch (err: unknown) {
      console.error('Failed to initialize auth:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const adapter = getDbAdapter();
      const passHash = await hashPassword(password);
      const user = await adapter.login(username, passHash);
      set({ user, error: null });
      await get().refreshHistoryAndStats();
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Login failed';
      set({ error: errMsg });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const adapter = getDbAdapter();
      const passHash = await hashPassword(password);
      const user = await adapter.signup(username, passHash);
      set({ user, error: null });
      await get().refreshHistoryAndStats();
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Signup failed';
      set({ error: errMsg });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    const adapter = getDbAdapter();
    await adapter.logout();
    set({ user: null, stats: null, studioHistory: [], coachHistory: [], error: null });
  },

  refreshHistoryAndStats: async () => {
    const user = get().user;
    if (!user) return;
    const adapter = getDbAdapter();
    const stats = await adapter.getUserStats(user.id);
    const studioHistory = await adapter.getStudioHistory(user.id);
    const coachHistory = await adapter.getCoachHistory(user.id);
    set({ stats, studioHistory, coachHistory });
  },
}));
