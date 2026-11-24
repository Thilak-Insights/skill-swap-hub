/**
 * aiService.js
 * 
 * AI LEARNING OBJECTIVE #4: Modular Integration Point for Gemini API.
 * SECURITY CONSTRAINT #8: Never expose or hardcode Gemini API keys in frontend code.
 * 
 * Features:
 * 1. Fast, offline-first contextual template generator for reliable hackathon demos.
 * 2. Pluggable Gemini 2.5 Flash integration that accepts an optional runtime key
 *    (stored only in session or passed by the user, never committed to repository).
 * 3. Architecture explanation for future Python FastAPI backend proxy.
 */

/**
 * Generates an icebreaker using deterministic, contextual template synthesis.
 * Guaranteed 100% reliable, zero token cost, zero network dependencies.
 */
export function generateTemplateIcebreaker({ currentUser, targetUser, matchInfo, tone = "friendly" }) {
  const currentName = currentUser?.name || "A neighbor";
  const targetName = targetUser?.name?.split(' ')[0] || "Neighbor";

  const teachTitle = matchInfo?.teachSkillMatch?.offered?.title || "my skills";
  const learnTitle = matchInfo?.learnSkillMatch?.offered?.title || "what you teach";
  const neighborhood = targetUser?.neighborhood || "the community";
  const availability = targetUser?.availability || "whenever convenient";

  if (tone === "enthusiastic") {
    return `Hi ${targetName}! 👋 I came across your profile in ${neighborhood} and was super excited to see you teach ${learnTitle}. I'd love to learn from you! In return, I'd be thrilled to share what I know about ${teachTitle}. I noticed your availability is around ${availability}—would you be up for a quick chat to discuss a skill swap?`;
  }

  if (tone === "structured") {
    return `Hello ${targetName}, I noticed a strong mutual skill match between our profiles. I am looking to develop skills in ${learnTitle}, and I can offer structured guidance in ${teachTitle}. Let me know if you would like to arrange an introductory session based on your schedule (${availability}). Best, ${currentName}.`;
  }

  // Default: Friendly & Casual
  return `Hey ${targetName}! I saw on the local skill board that you're interested in ${matchInfo?.teachSkillMatch?.wanted?.title || "learning new skills"}, and you teach ${learnTitle}. I'd love to swap knowledge on ${teachTitle} for some sessions on ${learnTitle}! Let me know if you're open to exchanging skills sometime soon.`;
}

/**
 * Optional Gemini API Integration Hook.
 * SECURITY NOTICE: Keys are never hardcoded. Keys are either supplied at runtime by the user
 * or injected via environment variables (VITE_GEMINI_API_KEY).
 * 
 * FUTURE FASTAPI INTEGRATION NOTE:
 * In production, the client will NOT call Google directly. Instead:
 * frontend -> POST /api/v1/icebreaker -> FastAPI server (stores GEMINI_API_KEY safely) -> Gemini
 */
export async function generateGeminiIcebreaker({ currentUser, targetUser, matchInfo, userApiKey, tone = "friendly" }) {
  // If no API key is provided, gracefully fall back to contextual template synthesis
  const apiKey = userApiKey || (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_GEMINI_API_KEY : null);

  if (!apiKey) {
    console.info("[aiService]: No API key detected. Using contextual template engine.");
    return {
      text: generateTemplateIcebreaker({ currentUser, targetUser, matchInfo, tone }),
      source: "Template Engine (Instant & Offline)"
    };
  }

  const teachSkill = matchInfo?.teachSkillMatch?.offered?.title || "my skills";
  const learnSkill = matchInfo?.learnSkillMatch?.offered?.title || "your skills";

  const prompt = `
You are an AI assistant for a local community skill barter app.
Generate a concise, friendly, 2-3 sentence icebreaker message from ${currentUser.name} to ${targetUser.name}.
Context:
- ${currentUser.name} wants to learn "${learnSkill}" from ${targetUser.name}.
- In return, ${currentUser.name} offers to teach "${teachSkill}".
- Location/Neighborhood: ${targetUser.neighborhood}.
- Tone requested: ${tone}.
Keep it natural, polite, and directly propose an exchange without sounding like marketing spam.
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 150
          }
        })
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.warn("[aiService] Gemini API returned error:", errData);
      throw new Error(errData?.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (candidateText) {
      return {
        text: candidateText.trim(),
        source: "Gemini 2.5 Flash"
      };
    }

    throw new Error("Empty response from Gemini");
  } catch (err) {
    console.warn("[aiService] Falling back to template generator due to error:", err.message);
    return {
      text: generateTemplateIcebreaker({ currentUser, targetUser, matchInfo, tone }),
      source: `Template Engine (Fallback: ${err.message})`
    };
  }
}

