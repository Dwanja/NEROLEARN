
import React from 'react';
import { Achievement } from '../types';
import { Icon } from './Icon';

interface AchievementsPageProps {
  achievements: Achievement[];
}

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  const isUnlocked = achievement.unlocked;
  return (
    <div
      className={`p-4 rounded-lg flex items-center space-x-4 transition-all duration-300 ${
        isUnlocked ? 'bg-white shadow' : 'bg-slate-100'
      }`}
    >
      <div
        className={`p-3 rounded-full ${
          isUnlocked ? 'bg-calm-green-100 text-calm-green-600' : 'bg-slate-200 text-slate-400'
        }`}
      >
        {achievement.icon}
      </div>
      <div className="flex-1">
        <h3
          className={`font-bold ${
            isUnlocked ? 'text-slate-800' : 'text-slate-500'
          }`}
        >
          {achievement.name}
        </h3>
        <p className="text-sm text-slate-500">{achievement.description}</p>
        {isUnlocked && achievement.dateUnlocked && (
           <p className="text-xs text-calm-green-700 font-medium mt-1 flex items-center">
              <Icon name="check" className="w-4 h-4 mr-1"/>
              Unlocked on {new Date(achievement.dateUnlocked).toLocaleDateString()}
          </p>
        )}
      </div>
       {!isUnlocked && <Icon name="lock" className="w-6 h-6 text-slate-400"/>}
    </div>
  );
};

const AchievementsPage: React.FC<AchievementsPageProps> = ({ achievements }) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900">Your Achievements</h1>
        <p className="mt-2 text-lg text-slate-600">
          You've unlocked {unlockedCount} of {totalCount} achievements. Keep up the great work!
        </p>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
