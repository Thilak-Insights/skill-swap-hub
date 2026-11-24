import React, { useState, useMemo } from 'react';
import { Search, MapPin, Award, BookOpen, Sparkles, Filter, UserCheck } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/initialUsers';

export default function CommunityBoard({ users, currentUser, onSelectMatch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter out the current user so they see their community
  const communityMembers = useMemo(() => {
    return (users || []).filter(u => u.id !== currentUser?.id);
  }, [users, currentUser?.id]);

  // Apply search query and category filtering
  const filteredMembers = useMemo(() => {
    return communityMembers.filter(member => {
      // Category filter check
      if (selectedCategory !== 'All') {
        const hasCategoryInOffered = (member.skillsOffered || []).some(
          s => s.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
        const hasCategoryInWanted = (member.skillsWanted || []).some(
          s => s.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
        if (!hasCategoryInOffered && !hasCategoryInWanted) return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = member.name.toLowerCase().includes(query);
        const matchesNeighborhood = member.neighborhood.toLowerCase().includes(query);
        const matchesBio = (member.bio || '').toLowerCase().includes(query);
        const matchesSkills = [
          ...(member.skillsOffered || []).map(s => `${s.title} ${s.tags?.join(' ') || ''}`),
          ...(member.skillsWanted || []).map(s => `${s.title} ${s.tags?.join(' ') || ''}`)
        ].join(' ').toLowerCase().includes(query);

        return matchesName || matchesNeighborhood || matchesBio || matchesSkills;
      }

      return true;
    });
  }, [communityMembers, searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              Community Skill Board
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Discover neighbors sharing skills and collaborative learning opportunities.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search skills, tags, or neighbors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {SKILL_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Community Grid */}
      {filteredMembers.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
          <p className="text-sm font-medium">No community members matched your criteria.</p>
          <p className="text-xs mt-1 text-slate-400">Try adjusting your search terms or clearing category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMembers.map(member => (
            <div
              key={member.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 flex flex-col justify-between hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700/70 transition-all duration-200"
            >
              <div>
                {/* Member Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                        {member.name}
                      </h3>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        {member.role}
                      </p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {member.neighborhood}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectMatch(member)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>View Match</span>
                  </button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                  {member.bio}
                </p>

                {/* Skills Can Teach */}
                <div className="mb-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1">
                    <Award className="w-3 h-3 text-emerald-500" />
                    <span>Offers To Teach</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(member.skillsOffered || []).map(skill => (
                      <span
                        key={skill.id}
                        className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/40 font-medium"
                      >
                        {skill.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills Wants to Learn */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-teal-500" />
                    <span>Looking To Learn</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(member.skillsWanted || []).map(skill => (
                      <span
                        key={skill.id}
                        className="text-xs px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 border border-teal-100 dark:border-teal-900/40 font-medium"
                      >
                        {skill.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Availability */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Availability: {member.availability}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium cursor-pointer hover:underline" onClick={() => onSelectMatch(member)}>
                  Check Swap Fit →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

