import { TelegramBot } from 'typescript-telegram-bot-api';
import type { User } from 'typescript-telegram-bot-api/dist/types';
import type { StarTransaction } from 'typescript-telegram-bot-api/dist/types/StarTransaction';
import { create } from 'zustand';

export const bot = new TelegramBot({ botToken: '' });

interface AppStore {
  loading: boolean;
  botInfo: User | null;
  botShortDescription: string | null;
  botName: string | null;
  starsTransactions: StarTransaction[];
  botToken: string | null;
  connectionError: boolean;
  connectBot: (token: string) => void;
  disconnectBot: () => void;
  getMe: () => Promise<void>;
  getStarTransactions: () => Promise<void>;
}

export const useAppStore = create<AppStore>((set, get) => ({
  loading: false as boolean,
  botInfo: null as User | null,
  botShortDescription: null as string | null,
  botName: null as string | null,
  starsTransactions: [] as StarTransaction[],
  botToken: localStorage.getItem('bot_token') || null,
  connectionError: false as boolean,

  connectBot: (token: string) => {
    set({ botToken: token, loading: true });
    bot.botToken = token;
    localStorage.setItem('bot_token', token);
    get().getMe();
    get().getStarTransactions();
  },

  disconnectBot: () => {
    set({
      botToken: null,
      botInfo: null,
      botShortDescription: null,
      botName: null,
      starsTransactions: [],
      connectionError: false,
    });
    localStorage.removeItem('bot_token');
  },

  getMe: async () => {
    try {
      const botInfo = await bot.getMe();
      const botShortDescription = (await bot.getMyShortDescription({ language_code: 'en' })).short_description;
      const botName = (await bot.getMyName({ language_code: 'en' })).name;
      set({ botInfo, botShortDescription, botName, connectionError: false, loading: false });
    } catch (_error) {
      set({ connectionError: true, loading: false });
    }
  },

  getStarTransactions: async () => {
    const starsTransactions: StarTransaction[] = [];
    let offset = 0;
    const limit = 100;
    try {
      let hasMore = true;
      while (hasMore) {
        const batch = (await bot.getStarTransactions({ offset, limit })).transactions;
        if (batch.length === 0) {
          hasMore = false;
        } else {
          starsTransactions.push(...batch);
          offset += limit;
          set({ starsTransactions });
        }
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  },
}));

interface AvatarStore {
  avatars: Record<number, string>;
  fetchAvatar: (userId: number) => Promise<string | null>;
}

export const useAvatarStore = create<AvatarStore>((set, get) => ({
  avatars: {} as Record<number, string>,
  fetchAvatar: async (userId: number) => {
    const cachedUrl = get().avatars[userId];
    if (cachedUrl) {
      return cachedUrl;
    }
    try {
      const userPhoto = await bot.getUserProfilePhotos({ user_id: userId });
      const file = await bot.getFile({ file_id: userPhoto.photos[0][0].file_id });
      const url = `https://api.telegram.org/file/bot${bot.botToken}/${file.file_path}`;
      set((state) => ({
        avatars: { ...state.avatars, [userId]: url },
      }));
      return url;
    } catch (_error) {
      return null;
    }
  },
}));
