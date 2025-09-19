

import { en } from './en';
import { vi } from './vi';
import { fr } from './fr';
import { zh } from './zh';
import { ja } from './ja';

export const translations = {
  en,
  vi,
  fr,
  zh,
  ja,
};

export type TranslationKey = keyof typeof en;