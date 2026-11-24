import React, { useState } from 'react';
import { Sparkles, ArrowRightLeft, MapPin, MessageSquare, BookOpen, Award, CheckCircle2, AlertCircle } from 'lucide-react';
import ScoreBreakdownBadge from './ScoreBreakdownBadge';
import IcebreakerModal from './IcebreakerModal';

export default function MatchmakerHub({ rankedMatches, currentUser }) {
  const [selectedMatchForIcebreaker, setSelectedMatchForIcebreaker] = useState(null);

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      
      {/* Matchmaker Overview Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Compatibility Matcher</span>
          </div>
          <h2 className="text-xl font-bold">
            Personalized Skill Matches for {currentUser.name}
          </h2>
          <p className="text-xs text-emerald-100 max-w-2xl mt-1 leading-relaxed">
            Our multi-factor algorithm scores reciprocal barter synergy, skill tag Jaccard similarity, and category alignment across your community.
          </p>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Match Cards List */}
      {rankedMatches.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500">
          <p className="text-sm font-medium">No matches calculated yet.</p>
          <p className="text-xs mt-1 text-slate-400">Add skills to your profile to generate match recommendations.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rankedMatches.map(match => {
            const { targetUser, totalScore, isReciprocal, teachSkillMatch, learnSkillMatch, matchBadge } = match;

            return (
              <div
                key={targetUser.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 hover:shadow-md transition-all duration-200"
              >
                {/* Card Top: User Info & Score Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <img
                      src={targetUser.avatar}
                      alt={targetUser.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-400 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-800 dark:text-white">
                          {targetUser.name}
                        </h3>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          totalScore >= 80
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                        }`}>
                          {matchBadge}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        {targetUser.role}
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {targetUser.neighborhood} • {targetUser.availability}
                      </p>
                    </div>
                  </div>

                  {/* Compatibility Score & Breakdown Component */}
                  <ScoreBreakdownBadge matchInfo={match} />
                </div>

                {/* Swap Match Synergy Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
                  
                  {/* You Teach Them */}
                  <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        You Can Teach Them
                      </span>
                      {teachSkillMatch ? (
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                          {Math.round(teachSkillMatch.score * 100)}% fit
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">No direct fit</span>
                      )}
                    </div>
                    {teachSkillMatch ? (
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white">
                          {teachSkillMatch.offered.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Fulfills their goal: "{teachSkillMatch.wanted.title}"
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                        They are looking for skills not currently listed on your profile.
                      </p>
                    )}
                  </div>

                  {/* They Teach You */}
                  <div className="p-3 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        They Can Teach You
                      </span>
                      {learnSkillMatch ? (
                        <span className="text-[10px] font-semibold text-teal-600 dark:text-teal-400">
                          {Math.round(learnSkillMatch.score * 100)}% fit
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">No direct fit</span>
                      )}
                    </div>
                    {learnSkillMatch ? (
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white">
                          {learnSkillMatch.offered.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Fulfills your goal: "{learnSkillMatch.wanted.title}"
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                        They don't teach any of your current learning goals.
                      </p>
                    )}
                  </div>

                </div>

                {/* Card Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    {isReciprocal ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        High-probability direct swap!
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                        Partial exchange opportunity
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedMatchForIcebreaker(match)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Generate AI Icebreaker</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Instance */}
      {selectedMatchForIcebreaker && (
        <IcebreakerModal
          isOpen={Boolean(selectedMatchForIcebreaker)}
          onClose={() => setSelectedMatchForIcebreaker(null)}
          currentUser={currentUser}
          targetUser={selectedMatchForIcebreaker.targetUser}
          matchInfo={selectedMatchForIcebreaker}
        />
      )}
    </div>
  );
}

