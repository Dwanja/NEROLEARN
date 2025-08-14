
import React, { useEffect, useState } from 'react';
import { SessionType, UserPreferences, Session } from '../types';
import { useTimer } from '../hooks/useTimer';
import { useAudio } from '../hooks/useAudio';
import { Icon } from './Icon';

interface ActiveSessionProps {
  sessionType: SessionType;
  preferences: UserPreferences;
  onSessionComplete: (session: Session) => void;
}

const ActiveSession: React.FC<ActiveSessionProps> = ({ sessionType, preferences, onSessionComplete }) => {
  const sessionDurationInSeconds = preferences.sessionDurations[sessionType] * 60;
  const { time, isActive, isPaused, start, pause, reset } = useTimer(sessionDurationInSeconds);
  const playStartSound = useAudio(preferences.startSound);
  const playEndSound = useAudio(preferences.endSound);

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    start();
    playStartSound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (time === 0 && isActive && !isPaused) {
      setIsComplete(true);
      playEndSound();
      onSessionComplete({
        id: new Date().toISOString(),
        type: sessionType,
        duration: sessionDurationInSeconds / 60,
        completed: true,
        date: new Date().toISOString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, isActive, isPaused]);

  const handleEndEarly = () => {
     onSessionComplete({
        id: new Date().toISOString(),
        type: sessionType,
        duration: (sessionDurationInSeconds - time) / 60,
        completed: false,
        date: new Date().toISOString(),
      });
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const progress = (time / sessionDurationInSeconds) * 100;

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl text-center">
      <h1 className="text-2xl font-bold text-slate-800">{sessionType}</h1>
      <p className="text-slate-500 mb-8">Stay focused. You can do this.</p>

      <div className="relative w-64 h-64 flex items-center justify-center">
         <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
                className="text-gray-200"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
            />
            <circle
                className="text-calm-blue-600"
                strokeWidth="7"
                strokeDasharray="282.6"
                strokeDashoffset={282.6 - (progress / 100) * 282.6}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s linear' }}
            />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-6xl font-bold text-slate-900 tracking-tighter">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
      
      <div className="flex space-x-4 mt-8">
        <button 
          onClick={isActive && !isPaused ? pause : start}
          className="w-32 flex items-center justify-center bg-calm-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-calm-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-calm-green-500 focus:ring-opacity-50"
        >
          <Icon name={isActive && !isPaused ? 'pause' : 'play'} className="w-6 h-6 mr-2" />
          <span>{isActive && !isPaused ? 'Pause' : 'Resume'}</span>
        </button>
        <button
          onClick={handleEndEarly}
          className="w-32 flex items-center justify-center bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
        >
          <Icon name="stop" className="w-6 h-6 mr-2" />
          <span>End Early</span>
        </button>
      </div>
    </div>
  );
};

export default ActiveSession;
