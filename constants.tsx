
import React from 'react';
import { UserPreferences, SessionType, Achievement } from './types';
import { Icon } from './components/Icon';

export const DEFAULT_PREFERENCES: UserPreferences = {
  sessionDurations: {
    [SessionType.DeepFocus]: 45, // minutes
    [SessionType.QuickStudy]: 25,
    [SessionType.Review]: 15,
  },
  breakDuration: 5,
  learningStyle: 'Visual',
  startSound: 'gentle-chime',
  endSound: 'soft-gong',
};

export const SOUND_OPTIONS = [
  { id: 'gentle-chime', name: 'Gentle Chime' },
  { id: 'soft-gong', name: 'Soft Gong' },
  { id: 'calm-bell', name: 'Calm Bell' },
  { id: 'no-sound', name: 'No Sound' },
];

export const LEARNING_STYLES = ['Visual', 'Auditory', 'Kinesthetic', 'Reading/Writing'];

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'first-deep-focus',
    name: 'Deep Diver',
    description: 'Complete your first Deep Focus session.',
    unlocked: false,
    sessionType: SessionType.DeepFocus,
    icon: <Icon name="target" className="w-8 h-8"/>,
  },
  {
    id: 'first-quick-study',
    name: 'Quick Learner',
    description: 'Complete your first Quick Study session.',
    unlocked: false,
    sessionType: SessionType.QuickStudy,
    icon: <Icon name="zap" className="w-8 h-8"/>,
  },
  {
    id: 'first-review',
    name: 'Reviewer Pro',
    description: 'Complete your first Review session.',
    unlocked: false,
    sessionType: SessionType.Review,
    icon: <Icon name="refresh" className="w-8 h-8"/>,
  },
  {
    id: 'streak-3-deep-focus',
    name: 'Focused Mind',
    description: 'Complete a Deep Focus session for 3 days in a row.',
    unlocked: false,
    sessionType: SessionType.DeepFocus,
    streak: 3,
    icon: <Icon name="flame" className="w-8 h-8"/>,
  },
   {
    id: 'streak-7-deep-focus',
    name: 'The Unwavering',
    description: 'Complete a Deep Focus session for 7 days in a row.',
    unlocked: false,
    sessionType: SessionType.DeepFocus,
    streak: 7,
    icon: <Icon name="gem" className="w-8 h-8"/>,
  },
  {
    id: 'streak-3-quick-study',
    name: 'Consistent Sprinter',
    description: 'Complete a Quick Study session for 3 days in a row.',
    unlocked: false,
    sessionType: SessionType.QuickStudy,
    streak: 3,
    icon: <Icon name="rocket" className="w-8 h-8"/>,
  },
];
