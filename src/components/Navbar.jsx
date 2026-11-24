import React from 'react';
import { Sparkles, Users, User, RotateCcw, ArrowRightLeft } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar({
  activeTab,
  setActiveTab,
  currentUser,
  allUsers,
  onSwitchUser,
  onResetData,
  theme,
  onToggleTheme,
  matchCount
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                SkillSwap <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Hub</span>
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                AI-Powered Local Community Barter
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('board')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'board'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Community Board</span>
            </button>

            <button
              onClick={() => setActiveTab('matches')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'matches'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Matchmaker</span>
              {matchCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
                  {matchCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'profile'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>My Skills & Profile</span>
            </button>
          </nav>

          {/* Right Controls: Persona Switcher, Reset, Theme */}
          <div className="flex items-center gap-2">
            
            {/* Demo Persona Switcher Dropdown */}
            <div className="flex items-center gap-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-1">
              <span className="text-[10px] font-semibold text-slate-400 hidden lg:inline">Persona:</span>
              <select
                value={currentUser?.id}
                onChange={(e) => onSwitchUser(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
                title="Switch active user to demo how matches update from different perspectives"
              >
                {(allUsers || []).map(u => (
                  <option key={u.id} value={u.id} className="dark:bg-slate-800">
                    {u.name} ({u.role.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Demo Data */}
            <button
              onClick={onResetData}
              type="button"
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors shadow-sm"
              title="Reset community data back to clean demo dataset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Dark / Light Mode Toggle */}
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('board')}
            className={`py-1 px-2 font-medium flex items-center gap-1 ${
              activeTab === 'board' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Board</span>
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`py-1 px-2 font-medium flex items-center gap-1 ${
              activeTab === 'matches' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Matches ({matchCount})</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-1 px-2 font-medium flex items-center gap-1 ${
              activeTab === 'profile' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}

