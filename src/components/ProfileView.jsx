import React, { useState } from 'react';
import { User, MapPin, Clock, Edit3, Check, X, ShieldCheck } from 'lucide-react';
import SkillManager from './SkillManager';

export default function ProfileView({
  currentUser,
  onUpdateProfile,
  onAddOffered,
  onRemoveOffered,
  onAddWanted,
  onRemoveWanted
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [neighborhood, setNeighborhood] = useState(currentUser?.neighborhood || '');
  const [availability, setAvailability] = useState(currentUser?.availability || '');

  const handleSave = () => {
    onUpdateProfile({ bio, neighborhood, availability });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setBio(currentUser?.bio || '');
    setNeighborhood(currentUser?.neighborhood || '');
    setAvailability(currentUser?.availability || '');
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Avatar & Core Bio */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow" title="Verified Community Member">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                  {currentUser.name}
                </h1>
                <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-medium">
                  Active Persona
                </span>
              </div>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
                {currentUser.role}
              </p>

              {/* Neighborhood & Availability info chips */}
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {currentUser.neighborhood}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {currentUser.availability}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Profile Action */}
          <div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-750 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="p-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-white rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bio Section / Inline Edit Form */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          {!isEditing ? (
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentUser.bio}
            </p>
          ) : (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Community Bio
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Neighborhood Location
                  </label>
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Weekly Availability
                  </label>
                  <input
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Skills Manager: I Can Teach & I Want to Learn */}
      <SkillManager
        currentUser={currentUser}
        onAddOffered={onAddOffered}
        onRemoveOffered={onRemoveOffered}
        onAddWanted={onAddWanted}
        onRemoveWanted={onRemoveWanted}
      />
    </div>
  );
}

