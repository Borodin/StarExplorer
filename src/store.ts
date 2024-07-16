import create from 'zustand';
import {TelegramBot} from "typescript-telegram-bot-api";
import {User} from "typescript-telegram-bot-api/dist/types";
import {StarTransactions} from "typescript-telegram-bot-api/dist/types/StarTransactions";

const bot = new TelegramBot({botToken: ''});

export const useAppStore = create((set, get) => ({
  loading: false as boolean,
  botInfo: null as User | null,
  botShortDescription: null as string | null,
  botName: null as string | null,
  starsTransactions: null as StarTransactions | null,
  botToken: localStorage.getItem('bot_token') || null,
  connectionError: false as boolean,

  connectBot: (token: string) => {
    set({botToken: token, loading: true});
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
      starsTransactions: null,
      connectionError: false
    })
    localStorage.removeItem('bot_token');
  },

  getMe: async () => {
    try {
      const botInfo = await bot.getMe();
      const botShortDescription = (await bot.getMyShortDescription({language_code: 'en'})).short_description
      const botName = (await bot.getMyName({language_code: 'en'})).name
      set({botInfo, botShortDescription, botName, connectionError: false, loading: false});
    } catch (error) {
      set({connectionError: true, loading: false});
    }
  },

  getStarTransactions: async () => {
    try {
      const transactions = await bot.getStarTransactions({offset: 0, limit: 100})
      set({starsTransactions: transactions});
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  }
}));

export const useAvatarStore = create((set, get) => ({
  avatars: {} as Record<number, string>,
  fetchAvatar: async (userId) => {
    const cachedUrl = get().avatars[userId];
    if (cachedUrl) {
      return cachedUrl;
    }
    try {
      const userPhoto = await bot.getUserProfilePhotos({user_id: userId})
      const file = await bot.getFile({file_id: userPhoto.photos[0][0].file_id})
      const url = `https://api.telegram.org/file/bot${bot.botToken}/${file.file_path}`;
      set(state => ({
        avatars: {...state.avatars, [userId]: url}
      }));
      return url;
    } catch (error) {
      return null;
    }
  }
}));