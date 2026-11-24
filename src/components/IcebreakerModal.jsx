import React, { useState, useEffect } from 'react';
import { X, Sparkles, Copy, Check, Send, Key, Bot, RefreshCw } from 'lucide-react';
import { generateGeminiIcebreaker, generateTemplateIcebreaker } from '../services/aiService';

export default function IcebreakerModal({ isOpen, onClose, currentUser, targetUser, matchInfo }) {
  const [tone, setTone] = useState('friendly');
  const [customApiKey, setCustomApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [message, setMessage] = useState('');
  const [generationSource, setGenerationSource] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  // Generate initial icebreaker when modal opens or target changes
  useEffect(() => {
    if (isOpen && currentUser && targetUser) {
      handleGenerate();
      setSentSuccess(false);
      setCopied(false);
    }
  }, [isOpen, currentUser?.id, targetUser?.id, tone]);

  if (!isOpen || !targetUser) return null;

  async function handleGenerate() {
    setIsGenerating(true);
    setCopied(false);
    try {
      const result = await generateGeminiIcebreaker({
        currentUser,
        targetUser,
        matchInfo,
        userApiKey: customApiKey.trim() || null,
        tone
      });
      setMessage(result.text);
      setGenerationSource(result.source);
    } catch (err) {
      console.error(err);
      setMessage(generateTemplateIcebreaker({ currentUser, targetUser, matchInfo, tone }));
      setGenerationSource("Contextual Template Engine");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSendMock() {
    setSentSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-850">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                AI Icebreaker Generator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Proposing swap to <span className="font-medium text-slate-700 dark:text-slate-200">{targetUser.name}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          
          {/* Tone Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Message Tone
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'friendly', label: '😊 Friendly' },
                { id: 'structured', label: '📋 Structured' },
                { id: 'enthusiastic', label: '⚡ Enthusiastic' }
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  className={`py-1.5 px-3 text-xs font-medium rounded-lg border transition-all ${
                    tone === t.id
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                      : 'bg-white dark:bg-slate-750 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Icebreaker Text Area */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Proposal Message
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  {generationSource}
                </span>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-medium disabled:opacity-50"
                  title="Regenerate message"
                >
                  <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
                  Regenerate
                </button>
              </div>
            </div>

            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Crafting personalized intro..."
              className="w-full p-3 text-sm text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Optional Gemini API Key Drawer (Security Compliant) */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{showKeyInput ? 'Hide Gemini API Settings' : 'Optional: Test with live Gemini 2.5 Flash Key'}</span>
            </button>

            {showKeyInput && (
              <div className="mt-2.5 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Keys are used in-memory for this session only and are never saved or exposed. If omitted, the high-performance local template engine is used.
                </p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={customApiKey}
                    onChange={(e) => setCustomApiKey(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={handleGenerate}
                    className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                  >
                    Apply Key
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-700">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-750 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy to Clipboard</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSendMock}
              disabled={sentSuccess}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl text-white shadow-md transition-all ${
                sentSuccess
                  ? 'bg-emerald-600 scale-95'
                  : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'
              }`}
            >
              {sentSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Proposal Sent!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Proposal</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

