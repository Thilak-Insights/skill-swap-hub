/**
 * test_engine.js
 * Comprehensive automated verification script for:
 * 1. Jaccard similarity logic
 * 2. Cosine similarity logic
 * 3. Two-way reciprocal compatibility scoring & weights
 * 4. Contextual AI Icebreaker generation
 * 5. Mock user ranking & expected matches
 */

import { calculateJaccardSimilarity, calculateUserCompatibility, getRankedMatchesForUser } from './src/services/matchingService.js';
import { calculateCosineSimilarity } from './src/services/embeddingService.js';
import { generateTemplateIcebreaker } from './src/services/aiService.js';
import { INITIAL_USERS } from './src/data/initialUsers.js';

let totalTests = 0;
let passedTests = 0;

function assert(description, condition) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${description}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${description}`);
  }
}

console.log("=========================================");
console.log("RUNNING SKILLSWAP ENGINE VERIFICATION SUITE");
console.log("=========================================\n");

// 1. Test Jaccard Similarity Math
console.log("[Test Suite 1: Jaccard Similarity & Set Theory]");
const tags1 = ["react", "javascript", "web"];
const tags2 = ["react", "web", "tailwind"];
// Intersection = ["react", "web"] (2)
// Union = ["react", "javascript", "web", "tailwind"] (4)
// Expected = 2 / 4 = 0.5
const jaccardScore = calculateJaccardSimilarity(tags1, tags2);
assert("Jaccard score for 50% overlapping sets equals 0.5", Math.abs(jaccardScore - 0.5) < 0.001);

const disjointJaccard = calculateJaccardSimilarity(["python"], ["cooking"]);
assert("Disjoint sets return 0.0", disjointJaccard === 0);

const identicalJaccard = calculateJaccardSimilarity(["art", "design"], ["design", "art"]);
assert("Identical sets return 1.0 regardless of order", identicalJaccard === 1.0);

// 2. Test Cosine Similarity Math (Future Vector Stub)
console.log("\n[Test Suite 2: Cosine Similarity Vector Stub]");
const vecA = [1, 0, 1];
const vecB = [1, 0, 1];
assert("Identical vectors have cosine similarity of 1.0", Math.abs(calculateCosineSimilarity(vecA, vecB) - 1.0) < 0.001);

const vecOrthogonalA = [1, 0];
const vecOrthogonalB = [0, 1];
assert("Orthogonal vectors have cosine similarity of 0.0", calculateCosineSimilarity(vecOrthogonalA, vecOrthogonalB) === 0.0);

// 3. Test Bilateral Compatibility Scoring
console.log("\n[Test Suite 3: Bilateral Reciprocal Matching]");
const alex = INITIAL_USERS[0]; // Teaches React/Python, Wants Guitar/Sourdough
const elena = INITIAL_USERS[1]; // Teaches Guitar/Vocals, Wants React
const david = INITIAL_USERS[4]; // Teaches Fitness, Wants Spanish

const matchAlexElena = calculateUserCompatibility(alex, elena);
assert("Alex and Elena produce a valid match object", matchAlexElena !== null);
assert("Alex and Elena is marked as a 2-way Reciprocal Swap", matchAlexElena.isReciprocal === true);
assert("Alex and Elena score is high (>= 80%)", matchAlexElena.totalScore >= 80);
console.log(`    -> Alex & Elena Score: ${matchAlexElena.totalScore}% (${matchAlexElena.matchBadge})`);

const matchAlexDavid = calculateUserCompatibility(alex, david);
assert("Alex and David is NOT a reciprocal match", matchAlexDavid.isReciprocal === false);
assert("Alex and David score is low (< 40%)", matchAlexDavid.totalScore < 40);
console.log(`    -> Alex & David Score: ${matchAlexDavid.totalScore}% (${matchAlexDavid.matchBadge})`);

// 4. Test Match Ranking
console.log("\n[Test Suite 4: Ranking & Leaderboard]");
const rankedForAlex = getRankedMatchesForUser(alex, INITIAL_USERS);
assert("Ranked matches list excludes self", rankedForAlex.every(m => m.targetUser.id !== alex.id));
assert("Ranked matches length equals 4 (all community members)", rankedForAlex.length === 4);
assert("Highest ranked match is Elena (Top Reciprocal Partner)", rankedForAlex[0].targetUser.id === elena.id);
assert("Lowest ranked match is David", rankedForAlex[rankedForAlex.length - 1].targetUser.id === david.id);

// 5. Test AI Icebreaker Generator
console.log("\n[Test Suite 5: AI Contextual Icebreaker Generator]");
const friendlyIntro = generateTemplateIcebreaker({
  currentUser: alex,
  targetUser: elena,
  matchInfo: matchAlexElena,
  tone: "friendly"
});
assert("Generated friendly icebreaker contains target name", friendlyIntro.includes("Elena"));
assert("Generated friendly icebreaker mentions target taught skill", friendlyIntro.toLowerCase().includes("guitar"));
assert("Generated friendly icebreaker mentions offer skill", friendlyIntro.toLowerCase().includes("react"));

const enthusiasticIntro = generateTemplateIcebreaker({
  currentUser: alex,
  targetUser: elena,
  matchInfo: matchAlexElena,
  tone: "enthusiastic"
});
assert("Enthusiastic intro contains enthusiastic greeting", enthusiasticIntro.includes("Hi Elena! 👋"));

console.log("\n=========================================");
console.log(`TEST SUITE RESULTS: ${passedTests} / ${totalTests} PASSED`);
console.log("=========================================");

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}

