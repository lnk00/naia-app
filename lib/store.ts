import { atom } from 'jotai';

import { Birthday } from '../queries/birthday';

export const selectedBirthdayAtom = atom<Birthday>({
  id: '',
  fullName: '',
  date: new Date(),
  normalizedDate: new Date(),
  isReminderActivated: false,
  isGiftIdeaSet: false,
});
