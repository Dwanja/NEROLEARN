
import React from 'react';
import { UserPreferences, SessionType } from '../types';
import { SOUND_OPTIONS, LEARNING_STYLES } from '../constants';
import { Icon } from './Icon';

interface SettingsProps {
  preferences: UserPreferences;
  setPreferences: (prefs: UserPreferences) => void;
}

const Settings: React.FC<SettingsProps> = ({ preferences, setPreferences }) => {
  const handleDurationChange = (type: SessionType, value: string) => {
    const newDuration = parseInt(value, 10);
    if (!isNaN(newDuration)) {
      setPreferences({
        ...preferences,
        sessionDurations: {
          ...preferences.sessionDurations,
          [type]: newDuration,
        },
      });
    }
  };
  
  const handleGenericChange = (key: keyof UserPreferences, value: string | number) => {
    setPreferences({ ...preferences, [key]: value });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-slate-900">Settings & Preferences</h1>
        <p className="mt-2 text-lg text-slate-600">Customize your learning environment to fit your needs.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <Icon name="clock" className="w-6 h-6 mr-3 text-calm-blue-700" />
            Session Durations (in minutes)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(SessionType) as Array<keyof typeof SessionType>).map((key) => {
            const type = SessionType[key];
            return (
              <div key={type}>
                <label htmlFor={`duration-${type}`} className="block text-sm font-medium text-slate-700">{type}</label>
                <input
                  type="number"
                  id={`duration-${type}`}
                  value={preferences.sessionDurations[type]}
                  onChange={(e) => handleDurationChange(type, e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-calm-blue-500 focus:border-calm-blue-500"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <Icon name="coffee" className="w-6 h-6 mr-3 text-calm-green-700" />
            Sensory Preferences
        </h2>

        <div>
          <label htmlFor="learning-style" className="block text-sm font-medium text-slate-700">Learning Style Preference</label>
          <select
            id="learning-style"
            value={preferences.learningStyle}
            onChange={(e) => handleGenericChange('learningStyle', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-calm-green-500 focus:border-calm-green-500 sm:text-sm rounded-md"
          >
            {LEARNING_STYLES.map(style => <option key={style}>{style}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="start-sound" className="block text-sm font-medium text-slate-700">Session Start Sound</label>
                <select
                    id="start-sound"
                    value={preferences.startSound}
                    onChange={(e) => handleGenericChange('startSound', e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-calm-green-500 focus:border-calm-green-500 sm:text-sm rounded-md"
                >
                    {SOUND_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="end-sound" className="block text-sm font-medium text-slate-700">Session End Sound</label>
                <select
                    id="end-sound"
                    value={preferences.endSound}
                    onChange={(e) => handleGenericChange('endSound', e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-calm-green-500 focus:border-calm-green-500 sm:text-sm rounded-md"
                >
                    {SOUND_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
                </select>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
