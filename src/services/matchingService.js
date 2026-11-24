/**
 * matchingService.js
 * 
 * Implements:
 * 1. Rule-Based Matching (Deterministic Category & Tag filters)
 * 2. Similarity Scoring using Jaccard Coefficient & Token Intersection
 * 3. Two-Way Reciprocal Barter Compatibility Calculation
 * 4. Transparent Match Score Breakdown for UI display
 */

import { calculateCosineSimilarity } from './embeddingService.js';

/**
 * AI LEARNING OBJECTIVE #2: Jaccard Similarity Coefficient
 * Measures similarity between two finite sample sets.
 * Formula: J(A, B) = |A ∩ B| / |A ∪ B|
 * Range: 0.0 (disjoint) to 1.0 (identical)
 */
export function calculateJaccardSimilarity(arrayA = [], arrayB = []) {
  if (!arrayA.length && !arrayB.length) return 0;

  const setA = new Set(arrayA.map(item => String(item).toLowerCase().trim()));
  const setB = new Set(arrayB.map(item => String(item).toLowerCase().trim()));

  const intersection = new Set([...setA].filter(item => setB.has(item)));
  const union = new Set([...setA, ...setB]);

  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

/**
 * Tokenize string into a normalized set of keywords
 */
function tokenizeText(text = '') {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
}

/**
 * Evaluates how well a single offered skill meets a wanted skill desire.
 * Future-proofed: Checks for vector embedding first; falls back to Jaccard & keyword rules.
 */
export function evaluateSkillPairCompatibility(skillOffered, skillWanted) {
  if (!skillOffered || !skillWanted) return 0;

  // 1. Future Semantic Vector check
  if (skillOffered.embedding && skillWanted.embedding) {
    return calculateCosineSimilarity(skillOffered.embedding, skillWanted.embedding);
  }

  // 2. Rule-Based Match: Category Alignment
  const categoryMatch = skillOffered.category && skillWanted.category &&
    skillOffered.category.toLowerCase() === skillWanted.category.toLowerCase() ? 1.0 : 0.0;

  // 3. Title Match (Substrings & Exact match)
  const normTitleOffered = (skillOffered.title || '').toLowerCase().trim();
  const normTitleWanted = (skillWanted.title || '').toLowerCase().trim();
  const titleMatch = normTitleOffered === normTitleWanted ? 1.0 :
    (normTitleOffered.includes(normTitleWanted) || normTitleWanted.includes(normTitleOffered) ? 0.8 : 0.0);

  // 4. Jaccard similarity on explicit tags
  const tagsOffered = skillOffered.tags || [];
  const tagsWanted = skillWanted.tags || [];
  const tagJaccard = calculateJaccardSimilarity(tagsOffered, tagsWanted);

  // 5. Token-level text similarity between title + description
  const offeredTokens = [
    ...tokenizeText(skillOffered.title),
    ...tokenizeText(skillOffered.description)
  ];
  const wantedTokens = [
    ...tokenizeText(skillWanted.title),
    ...tokenizeText(skillWanted.learningGoals)
  ];
  const textJaccard = calculateJaccardSimilarity(offeredTokens, wantedTokens);

  // Composite skill-to-skill score:
  // - 35% tag Jaccard
  // - 25% title match
  // - 20% text token overlap
  // - 20% category match
  const rawScore = (tagJaccard * 0.35) + (titleMatch * 0.25) + (textJaccard * 0.20) + (categoryMatch * 0.20);
  return Math.min(1.0, Math.max(0.0, rawScore));
}

/**
 * Finds the highest matching pair from an array of offered skills to an array of wanted skills.
 */
export function findBestSkillMatch(skillsOffered = [], skillsWanted = []) {
  let highestScore = 0;
  let bestPair = null;

  for (const offered of skillsOffered) {
    for (const wanted of skillsWanted) {
      const score = evaluateSkillPairCompatibility(offered, wanted);
      if (score > highestScore) {
        highestScore = score;
        bestPair = { offered, wanted, score };
      }
    }
  }

  return { highestScore, bestPair };
}

/**
 * Calculates complete bilateral compatibility score between the Current User and a Target User.
 * 
 * Weights:
 * - w1 (Teach Fit - 35%): You can teach something they want.
 * - w2 (Learn Fit - 35%): They can teach something you want.
 * - w3 (Category Synergy - 15%): Broader mutual interest categories.
 * - w4 (Reciprocity Bonus - 15%): Both directions have viable matches (True Barter).
 */
export function calculateUserCompatibility(currentUser, targetUser) {
  if (!currentUser || !targetUser || currentUser.id === targetUser.id) {
    return null;
  }

  // Direction A -> B: Current user teaches Target user
  const dirAToB = findBestSkillMatch(currentUser.skillsOffered || [], targetUser.skillsWanted || []);
  
  // Direction B -> A: Target user teaches Current user
  const dirBToA = findBestSkillMatch(targetUser.skillsOffered || [], currentUser.skillsWanted || []);

  const teachScore = dirAToB.highestScore; // 0.0 to 1.0
  const learnScore = dirBToA.highestScore; // 0.0 to 1.0

  // Category overlap across all skills
  const currentCategories = new Set([
    ...(currentUser.skillsOffered || []).map(s => s.category),
    ...(currentUser.skillsWanted || []).map(s => s.category)
  ]);
  const targetCategories = new Set([
    ...(targetUser.skillsOffered || []).map(s => s.category),
    ...(targetUser.skillsWanted || []).map(s => s.category)
  ]);
  const categoryOverlap = calculateJaccardSimilarity([...currentCategories], [...targetCategories]);

  // Reciprocity indicator: is there a mutual two-way trade?
  const isReciprocal = teachScore > 0.15 && learnScore > 0.15;
  const reciprocityMultiplier = isReciprocal ? 1.0 : (teachScore > 0.15 || learnScore > 0.15 ? 0.3 : 0.0);

  // Weighted Component calculations (scaled to 100 points)
  const teachPoints = Math.round(teachScore * 35);
  const learnPoints = Math.round(learnScore * 35);
  const categoryPoints = Math.round(categoryOverlap * 15);
  const reciprocityPoints = Math.round(reciprocityMultiplier * 15);

  const totalScore = Math.min(99, Math.max(5, teachPoints + learnPoints + categoryPoints + reciprocityPoints));

  // Determine qualitative match classification
  let matchBadge = "Exploring Swap";
  let matchVariant = "slate";

  if (totalScore >= 85) {
    matchBadge = "High Reciprocal Match";
    matchVariant = "emerald";
  } else if (totalScore >= 70) {
    matchBadge = "Strong Compatible Match";
    matchVariant = "teal";
  } else if (totalScore >= 45) {
    matchBadge = "Partial Opportunity";
    matchVariant = "amber";
  } else {
    matchBadge = "Low Compatibility";
    matchVariant = "slate";
  }

  return {
    targetUser,
    totalScore,
    matchBadge,
    matchVariant,
    isReciprocal,
    teachSkillMatch: dirAToB.bestPair,
    learnSkillMatch: dirBToA.bestPair,
    breakdown: {
      teachPoints,
      learnPoints,
      categoryPoints,
      reciprocityPoints,
      teachScore: Math.round(teachScore * 100),
      learnScore: Math.round(learnScore * 100),
      categoryOverlap: Math.round(categoryOverlap * 100)
    }
  };
}

/**
 * Ranks all community members relative to the current active user
 */
export function getRankedMatchesForUser(currentUser, allUsers = []) {
  if (!currentUser) return [];

  const matches = allUsers
    .filter(u => u.id !== currentUser.id)
    .map(targetUser => calculateUserCompatibility(currentUser, targetUser))
    .filter(Boolean);

  // Sort descending by highest compatibility score
  return matches.sort((a, b) => b.totalScore - a.totalScore);
}
