import { create } from 'zustand';
import { UserProfile, UserStats, StudioHistoryRecord, CoachHistoryRecord } from '@/lib/db/types';
import { localDbAdapter, hashPassword } from '@/lib/db/localAdapter';

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
      const user = await localDbAdapter.getCurrentUser();
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
      const passHash = await hashPassword(password);
      const user = await localDbAdapter.login(username, passHash);
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
      const passHash = await hashPassword(password);
      const user = await localDbAdapter.signup(username, passHash);
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
    await localDbAdapter.logout();
    set({ user: null, stats: null, studioHistory: [], coachHistory: [], error: null });
  },

  refreshHistoryAndStats: async () => {
    const user = get().user;
    if (!user) return;
    const stats = await localDbAdapter.getUserStats(user.id);
    const studioHistory = await localDbAdapter.getStudioHistory(user.id);
    const coachHistory = await localDbAdapter.getCoachHistory(user.id);
    set({ stats, studioHistory, coachHistory });
  },
}));
