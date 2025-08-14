
export type Page = 'dashboard' | 'active_session' | 'achievements' | 'settings';

export enum SessionType {
  DeepFocus = 'Deep Focus',
  QuickStudy = 'Quick Study',
  Review = 'Review',
}

export interface UserPreferences {
  sessionDurations: {
    [SessionType.DeepFocus]: number;
    [SessionType.QuickStudy]: number;
    [SessionType.Review]: number;
  };
  breakDuration: number;
  learningStyle: string;
  startSound: string;
  endSound: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  dateUnlocked?: string;
  sessionType?: SessionType;
  streak?: number;
  icon: React.ReactNode;
}

export interface Session {
  id: string;
  type: SessionType;
  duration: number;
  completed: boolean;
  date: string;
}
