
import React from 'react';
import { Page } from '../types';
import { Icon } from './Icon';

interface HeaderProps {
  setPage: (page: Page) => void;
  currentPage: Page;
}

const NavItem: React.FC<{
  label: string;
  page: Page;
  iconName: string;
  currentPage: Page;
  setPage: (page: Page) => void;
}> = ({ label, page, iconName, currentPage, setPage }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => setPage(page)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-calm-blue-200 text-calm-blue-900'
          : 'text-slate-600 hover:bg-calm-blue-100 hover:text-slate-900'
      }`}
    >
      <Icon name={iconName} className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ setPage, currentPage }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setPage('dashboard')}>
            <Icon name="brain" className="w-8 h-8 text-calm-blue-700" />
            <span className="text-xl font-bold text-calm-blue-900">Neuro-Learn</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-4">
            <NavItem label="Dashboard" page="dashboard" iconName="layout" currentPage={currentPage} setPage={setPage} />
            <NavItem label="Achievements" page="achievements" iconName="award" currentPage={currentPage} setPage={setPage} />
            <NavItem label="Settings" page="settings" iconName="settings" currentPage={currentPage} setPage={setPage} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
