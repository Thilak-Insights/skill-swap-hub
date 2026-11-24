import React, { useState } from 'react';
import { Plus, Trash2, Award, BookOpen, Tag, Check, Sparkles } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/initialUsers';

export default function SkillManager({ currentUser, onAddOffered, onRemoveOffered, onAddWanted, onRemoveWanted }) {
  const [activeTab, setActiveTab] = useState('teach'); // 'teach' | 'learn'
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [level, setLevel] = useState('Intermediate');
  const [priority, setPriority] = useState('High');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const resetForm = () => {
    setTitle('');
    setCategory('Technology');
    setLevel('Intermediate');
    setPriority('High');
    setDescription('');
    setTagsInput('');
    setShowAddForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedTags = tagsInput
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(Boolean);

    if (activeTab === 'teach') {
      onAddOffered({
        title: title.trim(),
        category,
        level,
        description: description.trim(),
        tags: parsedTags.length > 0 ? parsedTags : [category.toLowerCase()]
      });
    } else {
      onAddWanted({
        title: title.trim(),
        category,
        priority,
        learningGoals: description.trim(),
        tags: parsedTags.length > 0 ? parsedTags : [category.toLowerCase()]
      });
    }

    resetForm();
  };

  const offeredList = currentUser?.skillsOffered || [];
  const wantedList = currentUser?.skillsWanted || [];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
      
      {/* Section Header & Sub-Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-slate-100 dark:border-slate-700">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span>Skill Inventory</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Define what you can exchange with your local community.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => { setActiveTab('teach'); setShowAddForm(false); }}
            className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'teach'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>I Can Teach ({offeredList.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('learn'); setShowAddForm(false); }}
            className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'learn'
                ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>I Want to Learn ({wantedList.length})</span>
          </button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center py-4">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {activeTab === 'teach'
            ? 'Skills you offer to community members in exchange'
            : 'Subjects, hobbies, or tools you wish to master'}
        </span>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showAddForm ? 'Close Form' : `Add ${activeTab === 'teach' ? 'Offered' : 'Learning'} Skill`}</span>
        </button>
      </div>

      {/* Add Skill Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 animate-in fade-in duration-200">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>{activeTab === 'teach' ? 'Add Skill You Can Teach' : 'Add Skill You Want to Learn'}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Skill Title *
              </label>
              <input
                type="text"
                required
                placeholder={activeTab === 'teach' ? 'e.g., Conversational Spanish' : 'e.g., Intro to Woodworking'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {SKILL_CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {activeTab === 'teach' ? (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Proficiency Level
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced / Expert</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="High">🔥 High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low / Casual Interest</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Keywords / Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g., spanish, grammar, speaking"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              {activeTab === 'teach' ? 'Description & Teaching Approach' : 'Specific Goals or Project You Want to Build'}
            </label>
            <textarea
              rows={2}
              placeholder={activeTab === 'teach' ? 'What can a learner expect to achieve with you?' : 'What do you hope to learn or practice?'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all"
            >
              Save Skill
            </button>
          </div>
        </form>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {activeTab === 'teach' ? (
          offeredList.length === 0 ? (
            <div className="col-span-2 py-8 text-center text-xs text-slate-400 dark:text-slate-500">
              No skills added to teach yet. Click "+ Add Offered Skill" to share your expertise.
            </div>
          ) : (
            offeredList.map(skill => (
              <div
                key={skill.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850 flex flex-col justify-between group hover:border-emerald-300 dark:hover:border-emerald-700 transition-all"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                      {skill.title}
                    </h4>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                      {skill.level}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-2 line-clamp-2">
                    {skill.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700">
                      {skill.category}
                    </span>
                    {(skill.tags || []).map(tag => (
                      <span key={tag} className="text-[10px] text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-end pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                    <button
                      onClick={() => onRemoveOffered(skill.id)}
                      className="text-xs text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 flex items-center gap-1 font-medium transition-colors"
                      title="Remove skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )
        ) : (
          wantedList.length === 0 ? (
            <div className="col-span-2 py-8 text-center text-xs text-slate-400 dark:text-slate-500">
              No learning goals added yet. Add a skill you've always wanted to learn!
            </div>
          ) : (
            wantedList.map(skill => (
              <div
                key={skill.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850 flex flex-col justify-between group hover:border-teal-300 dark:hover:border-teal-700 transition-all"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                      {skill.title}
                    </h4>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                      skill.priority === 'High'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                        : 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300'
                    }`}>
                      {skill.priority} Priority
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-2 line-clamp-2">
                    {skill.learningGoals}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700">
                      {skill.category}
                    </span>
                    {(skill.tags || []).map(tag => (
                      <span key={tag} className="text-[10px] text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-end pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                    <button
                      onClick={() => onRemoveWanted(skill.id)}
                      className="text-xs text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 flex items-center gap-1 font-medium transition-colors"
                      title="Remove learning goal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )
        )}
      </div>

    </div>
  );
}

