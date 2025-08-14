
import React, { useState, useEffect, useCallback } from 'react';
import { Page, SessionType, UserPreferences, Achievement, Session } from './types';
import { DEFAULT_PREFERENCES, ACHIEVEMENTS_LIST } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ActiveSession from './components/ActiveSession';
import AchievementsPage from './components/AchievementsPage';
import Settings from './components/Settings';
import Notification from './components/Notification';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('dashboard');
  const [activeSessionType, setActiveSessionType] = useState<SessionType | null>(null);
  
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('userPreferences', DEFAULT_PREFERENCES);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('userAchievements', ACHIEVEMENTS_LIST);
  const [sessionHistory, setSessionHistory] = useLocalStorage<Session[]>('sessionHistory', []);
  
  const [notification, setNotification] = useState<{title: string, message: string} | null>(null);

  const showNotification = useCallback((title: string, message: string) => {
    setNotification({ title, message });
    setTimeout(() => setNotification(null), 5000);
  }, []);

  const handleSessionComplete = useCallback((session: Session) => {
    const updatedHistory = [...sessionHistory, session];
    setSessionHistory(updatedHistory);

    let newAchievementsUnlocked = false;
    const updatedAchievements = achievements.map(ach => {
      if (ach.unlocked) return ach;

      let unlocked = false;
      const sessionsOfType = updatedHistory.filter(s => s.type === session.type && s.completed);

      if (ach.id.startsWith('first')) {
        if (ach.sessionType === session.type && sessionsOfType.length === 1) {
          unlocked = true;
        }
      } else if (ach.id.startsWith('streak')) {
          const checkStreak = (streakLength: number) => {
              if (sessionsOfType.length < streakLength) return false;
              const today = new Date();
              today.setHours(0,0,0,0);
              let consecutiveDays = 0;
              for (let i = 0; i < streakLength; i++) {
                  const checkDate = new Date(today);
                  checkDate.setDate(today.getDate() - i);
                  if (updatedHistory.some(s => new Date(s.date).toDateString() === checkDate.toDateString() && s.type === session.type && s.completed)) {
                      consecutiveDays++;
                  }
              }
              return consecutiveDays >= streakLength;
          };
          if(ach.streak && checkStreak(ach.streak)) {
              unlocked = true;
          }
      }

      if (unlocked) {
        newAchievementsUnlocked = true;
        showNotification('Achievement Unlocked!', ach.name);
        return { ...ach, unlocked: true, dateUnlocked: new Date().toISOString() };
      }
      return ach;
    });

    if (newAchievementsUnlocked) {
      setAchievements(updatedAchievements);
    }

    setActiveSessionType(null);
    setPage('dashboard');
  }, [sessionHistory, achievements, setSessionHistory, setAchievements, showNotification]);

  const startSession = (type: SessionType) => {
    setActiveSessionType(type);
    setPage('active_session');
  };
  
  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard setPage={setPage} startSession={startSession} />;
      case 'active_session':
        if (!activeSessionType) {
          setPage('dashboard');
          return null;
        }
        return <ActiveSession sessionType={activeSessionType} preferences={preferences} onSessionComplete={handleSessionComplete} />;
      case 'achievements':
        return <AchievementsPage achievements={achievements} />;
      case 'settings':
        return <Settings preferences={preferences} setPreferences={setPreferences} />;
      default:
        return <Dashboard setPage={setPage} startSession={startSession} />;
    }
  };

  return (
    <div className="min-h-screen bg-calm-blue-50 font-sans">
      <Header setPage={setPage} currentPage={page} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {renderPage()}
      </main>
      {notification && (
        <Notification title={notification.title} message={notification.message} onClose={() => setNotification(null)} />
      )}
    </div>
  );
};

export default App;
