/**
 * embeddingService.js
 * 
 * AI LEARNING OBJECTIVE #3: Preparing Architecture for Future Semantic Embeddings.
 * 
 * Today (Hackathon MVP):
 * - Functions as a mock/modular stub with cosine similarity math ready.
 * 
 * Tomorrow (Production / Python FastAPI / Gemini Embeddings):
 * - When upgrading to Google Gemini's `text-embedding-004` or an on-device sentence transformer,
 *   profiles and skills will store a 768-dimensional float vector: [0.021, -0.145, 0.892, ...].
 * - Instead of relying only on exact tag overlap (e.g. "baking" vs "sourdough"), semantic embeddings
 *   measure conceptual proximity in continuous vector space.
 */

/**
 * Calculates Cosine Similarity between two N-dimensional numerical vectors.
 * Formula: CosineSim(A, B) = (A · B) / (||A|| * ||B||)
 * Range: -1.0 to 1.0 (or 0.0 to 1.0 for normalized embedding models)
 */
export function calculateCosineSimilarity(vectorA, vectorB) {
  if (!vectorA || !vectorB || vectorA.length !== vectorB.length) {
    return 0;
  }

  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    normA += vectorA[i] * vectorA[i];
    normB += vectorB[i] * vectorB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Modular hook for future asynchronous embedding generation.
 * When integrated with backend or Gemini:
 * async function fetchEmbedding(text) { ... calls POST /api/embeddings ... }
 */
export async function getFutureSemanticEmbedding(text) {
  // Placeholder returning null in MVP; causes matchingService to gracefully fall back to Jaccard
  console.log(`[Future Embedding Hook]: Preparing embedding generation for "${text.slice(0, 30)}..."`);
  return null;
}

