import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import CommunityBoard from './components/CommunityBoard';
import MatchmakerHub from './components/MatchmakerHub';
import ProfileView from './components/ProfileView';

import {
  initializeStorage,
  getAllUsers,
  getCurrentUser,
  switchActiveUser,
  resetToDemoData,
  updateCurrentUserProfile,
  addSkillOffered,
  removeSkillOffered,
  addSkillWanted,
  removeSkillWanted,
  getSavedTheme,
  saveTheme
} from './services/storageService';

import { getRankedMatchesForUser } from './services/matchingService';

export default function App() {
  const [theme, setTheme] = useState(getSavedTheme);
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('matches'); // 'matches' | 'board' | 'profile'
  const [toastMessage, setToastMessage] = useState('');

  // 1. Initialize application state from localStorage
  useEffect(() => {
    initializeStorage();
    const loadedUsers = getAllUsers();
    setAllUsers(loadedUsers);
    setCurrentUser(getCurrentUser());
  }, []);

  // 2. Sync theme with document DOM root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveTheme(theme);
  }, [theme]);

  // Helper to show brief feedback toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Toggle Dark/Light Mode
  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Switch demo persona
  const handleSwitchUser = (userId) => {
    const switched = switchActiveUser(userId);
    setCurrentUser(switched);
    showToast(`Switched active persona to ${switched.name}`);
  };

  // Reset to initial demo dataset
  const handleResetData = () => {
    const refreshed = resetToDemoData();
    setAllUsers(refreshed);
    setCurrentUser(refreshed[0]);
    showToast("Reset community dataset back to initial demo seeds!");
  };

  // Profile and Skill Handlers
  const handleUpdateProfile = (fields) => {
    const updated = updateCurrentUserProfile(fields);
    setCurrentUser(updated);
    setAllUsers(getAllUsers());
    showToast("Profile details updated successfully!");
  };

  const handleAddOffered = (skill) => {
    const updated = addSkillOffered(skill);
    setCurrentUser(updated);
    setAllUsers(getAllUsers());
    showToast(`Added offered skill: ${skill.title}`);
  };

  const handleRemoveOffered = (skillId) => {
    const updated = removeSkillOffered(skillId);
    setCurrentUser(updated);
    setAllUsers(getAllUsers());
    showToast("Offered skill removed.");
  };

  const handleAddWanted = (skill) => {
    const updated = addSkillWanted(skill);
    setCurrentUser(updated);
    setAllUsers(getAllUsers());
    showToast(`Added learning goal: ${skill.title}`);
  };

  const handleRemoveWanted = (skillId) => {
    const updated = removeSkillWanted(skillId);
    setCurrentUser(updated);
    setAllUsers(getAllUsers());
    showToast("Learning goal removed.");
  };

  // Calculate live ranked matches for the current user
  const rankedMatches = useMemo(() => {
    if (!currentUser || !allUsers.length) return [];
    return getRankedMatchesForUser(currentUser, allUsers);
  }, [currentUser, allUsers]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading SkillSwap Hub...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        allUsers={allUsers}
        onSwitchUser={handleSwitchUser}
        onResetData={handleResetData}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        matchCount={rankedMatches.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="mb-6 p-3 bg-emerald-600 text-white text-xs font-semibold rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-top duration-200">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage('')} className="text-white/80 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Tab Content Router */}
        {activeTab === 'matches' && (
          <MatchmakerHub
            rankedMatches={rankedMatches}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'board' && (
          <CommunityBoard
            users={allUsers}
            currentUser={currentUser}
            onSelectMatch={(target) => {
              setActiveTab('matches');
            }}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            currentUser={currentUser}
            onUpdateProfile={handleUpdateProfile}
            onAddOffered={handleAddOffered}
            onRemoveOffered={handleRemoveOffered}
            onAddWanted={handleAddWanted}
            onRemoveWanted={handleRemoveWanted}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-400 dark:text-slate-500">
        <p>SkillSwap Hub • AI-Powered Community Barter Platform • 2-Hour Hackathon MVP</p>
      </footer>
    </div>
  );
}

