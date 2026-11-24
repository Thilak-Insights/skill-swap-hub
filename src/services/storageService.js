/**
 * storageService.js
 * Manages all client-side persistence using localStorage.
 * Provides clean CRUD helpers for profiles, skills, and community members.
 * Includes a demo reset helper so judges or users can refresh state anytime.
 */

import { INITIAL_USERS } from '../data/initialUsers.js';

const STORAGE_KEYS = {
  USERS: 'skillswap_users_v1',
  CURRENT_USER_ID: 'skillswap_current_user_id_v1',
  THEME: 'skillswap_theme_v1'
};

/**
 * Initialize storage with default mock community if not present
 */
export function initializeStorage() {
  const existingUsers = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!existingUsers) {
    resetToDemoData();
  }
}

/**
 * Resets local storage back to clean demo dataset
 */
export function resetToDemoData() {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, INITIAL_USERS[0].id);
  return INITIAL_USERS;
}

/**
 * Retrieve all community users
 */
export function getAllUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    return raw ? JSON.parse(raw) : INITIAL_USERS;
  } catch (error) {
    console.error("Error reading users from localStorage:", error);
    return INITIAL_USERS;
  }
}

/**
 * Save updated list of users
 */
export function saveAllUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users to localStorage:", error);
  }
}

/**
 * Get active/current user profile
 */
export function getCurrentUser() {
  const users = getAllUsers();
  const currentId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID) || users[0]?.id;
  const found = users.find(u => u.id === currentId);
  return found || users[0];
}

/**
 * Switch active persona (useful for instant demo testing from another user's perspective)
 */
export function switchActiveUser(userId) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, userId);
  return getCurrentUser();
}

/**
 * Update current user profile fields (bio, neighborhood, availability)
 */
export function updateCurrentUserProfile(updatedFields) {
  const users = getAllUsers();
  const current = getCurrentUser();
  const updatedUser = { ...current, ...updatedFields };

  const updatedList = users.map(u => (u.id === current.id ? updatedUser : u));
  saveAllUsers(updatedList);
  return updatedUser;
}

/**
 * Add a skill the current user can teach
 */
export function addSkillOffered(skill) {
  const users = getAllUsers();
  const current = getCurrentUser();

  const newSkill = {
    ...skill,
    id: `off_${Date.now()}`
  };

  const updatedUser = {
    ...current,
    skillsOffered: [...(current.skillsOffered || []), newSkill]
  };

  const updatedList = users.map(u => (u.id === current.id ? updatedUser : u));
  saveAllUsers(updatedList);
  return updatedUser;
}

/**
 * Remove a skill offered by id
 */
export function removeSkillOffered(skillId) {
  const users = getAllUsers();
  const current = getCurrentUser();

  const updatedUser = {
    ...current,
    skillsOffered: (current.skillsOffered || []).filter(s => s.id !== skillId)
  };

  const updatedList = users.map(u => (u.id === current.id ? updatedUser : u));
  saveAllUsers(updatedList);
  return updatedUser;
}

/**
 * Add a skill the current user wants to learn
 */
export function addSkillWanted(skill) {
  const users = getAllUsers();
  const current = getCurrentUser();

  const newSkill = {
    ...skill,
    id: `wnt_${Date.now()}`
  };

  const updatedUser = {
    ...current,
    skillsWanted: [...(current.skillsWanted || []), newSkill]
  };

  const updatedList = users.map(u => (u.id === current.id ? updatedUser : u));
  saveAllUsers(updatedList);
  return updatedUser;
}

/**
 * Remove a skill wanted by id
 */
export function removeSkillWanted(skillId) {
  const users = getAllUsers();
  const current = getCurrentUser();

  const updatedUser = {
    ...current,
    skillsWanted: (current.skillsWanted || []).filter(s => s.id !== skillId)
  };

  const updatedList = users.map(u => (u.id === current.id ? updatedUser : u));
  saveAllUsers(updatedList);
  return updatedUser;
}

/**
 * Theme preference helpers
 */
export function getSavedTheme() {
  return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
}

export function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}
