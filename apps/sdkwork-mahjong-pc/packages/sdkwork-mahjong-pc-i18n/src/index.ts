import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English split translation dictionaries
import { common as enCommon } from './locales/en/common';
import { dashboard as enDashboard } from './locales/en/dashboard';
import { gameCenter as enGameCenter } from './locales/en/gameCenter';
import { leaderboard as enLeaderboard } from './locales/en/leaderboard';
import { store as enStore } from './locales/en/store';
import { quiz as enQuiz } from './locales/en/quiz';
import { login as enLogin } from './locales/en/login';
import { arena as enArena } from './locales/en/arena';
import { ringmatch as enRingmatch } from './locales/en/ringmatch';

// Chinese split translation dictionaries
import { common as zhCommon } from './locales/zh/common';
import { dashboard as zhDashboard } from './locales/zh/dashboard';
import { gameCenter as zhGameCenter } from './locales/zh/gameCenter';
import { leaderboard as zhLeaderboard } from './locales/zh/leaderboard';
import { store as zhStore } from './locales/zh/store';
import { quiz as zhQuiz } from './locales/zh/quiz';
import { login as zhLogin } from './locales/zh/login';
import { arena as zhArena } from './locales/zh/arena';
import { ringmatch as zhRingmatch } from './locales/zh/ringmatch';

// Merged resources structure
const resources = {
  en: {
    translation: {
      ...enCommon,
      ...enDashboard,
      ...enGameCenter,
      ...enLeaderboard,
      ...enStore,
      ...enQuiz,
      ...enLogin,
      ...enArena,
      ...enRingmatch
    }
  },
  zh: {
    translation: {
      ...zhCommon,
      ...zhDashboard,
      ...zhGameCenter,
      ...zhLeaderboard,
      ...zhStore,
      ...zhQuiz,
      ...zhLogin,
      ...zhArena,
      ...zhRingmatch
    }
  }
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh', // Initial language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
export { i18n };
