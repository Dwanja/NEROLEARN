
import React from 'react';
import { Page, SessionType } from '../types';
import { Icon } from './Icon';

interface DashboardProps {
  setPage: (page: Page) => void;
  startSession: (type: SessionType) => void;
}

const SessionCard: React.FC<{
  type: SessionType;
  description: string;
  iconName: string;
  color: string;
  onClick: () => void;
}> = ({ type, description, iconName, color, onClick }) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1`}>
    <div className="p-6">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon name={iconName} className="w-8 h-8 text-white" />
        </div>
        <div>
          <div className="text-xl font-semibold text-slate-800">{type}</div>
          <p className="text-slate-500 mt-1">{description}</p>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={onClick}
          className="w-full bg-calm-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-calm-blue-700 focus:outline-none focus:ring-2 focus:ring-calm-blue-500 focus:ring-opacity-50 transition-colors"
        >
          Start Session
        </button>
      </div>
    </div>
  </div>
);


const Dashboard: React.FC<DashboardProps> = ({ setPage, startSession }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome to Your Focus Space</h1>
        <p className="mt-2 text-lg text-slate-600">Choose a session type to begin your journey towards productive learning.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SessionCard 
          type={SessionType.DeepFocus}
          description="Extended, uninterrupted work on a single task."
          iconName="target"
          color="bg-calm-blue-700"
          onClick={() => startSession(SessionType.DeepFocus)}
        />
        <SessionCard 
          type={SessionType.QuickStudy}
          description="Short, focused bursts of learning or work."
          iconName="zap"
          color="bg-calm-green-700"
          onClick={() => startSession(SessionType.QuickStudy)}
        />
        <SessionCard 
          type={SessionType.Review}
          description="Consolidate knowledge and review past material."
          iconName="refresh"
          color="bg-orange-500"
          onClick={() => startSession(SessionType.Review)}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-slate-800">Your Toolkit</h2>
        <p className="text-slate-500 mt-1">Explore resources to enhance your experience.</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-calm-blue-100 rounded-lg hover:bg-calm-blue-200 transition-colors">
                <Icon name="book" className="w-6 h-6 text-calm-blue-800"/>
                <span className="font-medium text-calm-blue-900">Toolkit Library (Coming Soon)</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-calm-green-100 rounded-lg hover:bg-calm-green-200 transition-colors">
                <Icon name="file-text" className="w-6 h-6 text-calm-green-800"/>
                <span className="font-medium text-calm-green-900">Accommodation Requests (Coming Soon)</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
