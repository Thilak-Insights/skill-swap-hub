# 🌟 SkillSwap Hub: AI-Powered Local Community & Skill Swap

An AI-driven hyperlocal community platform where neighbors barter and exchange skills without monetary transactions. Solves the classical economic problem of the **"Double Coincidence of Wants"** using rule-based matching, multi-factor Jaccard similarity scoring, and contextual proposal generation.

Built as an extensible **2-Hour Hackathon MVP** with zero backend overhead, full offline capability, and future-proofed architecture for Gemini embeddings and Python FastAPI.

---

## 🚀 Key Features Built (All 8 MVP Milestones)

1. **User Profile Management**: Complete user profile with name, avatar, community role, neighborhood location, weekly availability, and verified member badge.
2. **Skills I Can Teach (Offered Skills)**: Add, browse, and remove skills offered with proficiency levels (Beginner, Intermediate, Advanced), category tagging, and custom descriptions.
3. **Skills I Want to Learn (Wanted Skills)**: Add, browse, and remove learning goals with urgency/priority rankings (🔥 High, Medium, Low) and specific target objectives.
4. **Community Skill Board**: Real-time searchable community explorer with category filter pills (*Technology, Music, Cooking, Design, Gardening, Fitness, Languages, Art*), member bio previews, and direct swap inquiry buttons.
5. **Skill Matching Algorithm**: Bilateral exchange engine analyzing both directions ($A \to B$ and $B \to A$) to discover mutual barters and one-way learning opportunities.
6. **Match Compatibility Score**: Transparent 0%–100% score calculation with an **interactive mathematical breakdown drawer** showing exact points for Teach Fit, Learn Fit, Category Synergy, and Reciprocity.
7. **AI Icebreaker Message Generator**: Contextual proposal generator tailoring message tone (*Friendly, Structured, Enthusiastic*) with 1-click clipboard copying and a modular, secure runtime Gemini 2.5 Flash API hook.
8. **Dark and Light Mode**: Full Tailwind CSS `darkMode: 'class'` support with smooth theme toggle and persistence in `localStorage`.

---

## 🧠 AI Learning Objectives Explained

### 1. Rule-Based Matching
Deterministic logic evaluating hard constraints:
- **Category Filter**: `Category(Offered_A) == Category(Wanted_B)`.
- **Title Substring Matching**: Identifies related terms (e.g., *"Acoustic Guitar"* matches *"Guitar Basics"*).
- **Exact & Normalized Tag Intersections**.

### 2. Similarity Scoring: Jaccard Coefficient & Multi-Factor Model
The compatibility between two community members is determined using **Jaccard Similarity** on their tag sets:

$$J(A, B) = \frac{|A \cap B|}{|A \cup B|}$$

The overall compatibility score is calculated using a **weighted bilateral model**:

$$\text{FinalScore} = (w_1 \cdot \text{TeachFit}) + (w_2 \cdot \text{LearnFit}) + (w_3 \cdot \text{CategorySynergy}) + (w_4 \cdot \text{ReciprocityBonus})$$

| Component | Weight | Description |
| :--- | :--- | :--- |
| **Teach Fit ($w_1$)** | 35% | How effectively User A's offered skills meet User B's learning desires |
| **Learn Fit ($w_2$)** | 35% | How effectively User B's offered skills meet User A's learning desires |
| **Category Synergy ($w_3$)** | 15% | Overlap in broader interest categories |
| **Reciprocity Bonus ($w_4$)** | 15% | True 2-way bilateral barter confirmation (both parties give and receive) |

### 3. Architecture for Future Semantic Embeddings
Located in `src/services/embeddingService.js`:
- Currently provides the **Cosine Similarity** vector dot-product equation:
  $$\text{CosineSim}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\| \|\mathbf{v}\|}$$
- When upgrading to Google's `text-embedding-004`, profiles store 768-dimensional float vectors. The service interface is already abstracted so UI components require zero code modifications.

### 4. Modular Gemini API Integration (`src/services/aiService.js`)
- **Offline / Default**: Uses a zero-cost deterministic template engine that interpolates neighbor names, specific skills, and schedules.
- **Optional Live Testing**: Includes an in-memory API key drawer for testing with live `gemini-2.5-flash`.
- **Security Rule Followed**: No API keys are ever hardcoded or committed to frontend source code.

### 5. Transition Path to Python FastAPI
When upgrading beyond the 2-hour hackathon MVP:
1. Replace `storageService.js` with `fetch('/api/v1/...')` endpoints.
2. In FastAPI, implement `/api/v1/match` using Python's `scipy` or `pgvector`.
3. Utilize Python's `networkx` library to run cycle-finding algorithms (e.g., Tarjan's / Johnson's) to unlock **3-way circular barter rings** ($A \to B \to C \to A$) that solve the coincidence of wants at scale.

---

## 📂 Project Architecture

```
skill_swap/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── test_engine.js               # Automated engine test suite (18/18 tests passing)
├── src/
│   ├── main.jsx                 # React root entry
│   ├── App.jsx                  # Main application state & tab router
│   ├── index.css                # Tailwind directives & theme styles
│   ├── data/
│   │   └── initialUsers.js      # Rich sample community profiles
│   ├── services/
│   │   ├── storageService.js    # LocalStorage CRUD & demo reset
│   │   ├── matchingService.js   # Jaccard similarity & weighted scoring
│   │   ├── aiService.js         # Contextual & Gemini icebreaker generator
│   │   └── embeddingService.js  # Modular vector cosine similarity stub
│   └── components/
│       ├── Navbar.jsx           # Top navigation, persona switcher, theme toggle
│       ├── ThemeToggle.jsx      # Dark/Light mode button
│       ├── ProfileView.jsx      # User profile editor
│       ├── SkillManager.jsx     # "I Can Teach" & "I Want to Learn" CRUD
│       ├── CommunityBoard.jsx   # Search & category filter explorer
│       ├── MatchmakerHub.jsx    # Ranked AI matches feed
│       ├── ScoreBreakdownBadge.jsx # Mathematical score breakdown drawer
│       └── IcebreakerModal.jsx  # Tone picker & proposal message generator
```

---

## 🛠️ Getting Started

### 1. Run Automated Unit Tests
```bash
npm test
```
*Validates Jaccard similarity, cosine math, bilateral barter calculation, and AI icebreaker formatting.*

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```
Generates the optimized static bundle in `/dist`.

---

## 👥 Demo Walkthrough Guide (For Judges & Presenters)

1. **Active Persona Switcher**: In the top navbar, use the **Persona** dropdown to switch from *Alex Rivera (Developer)* to *Elena Rostova (Musician)*. Notice how the AI Matchmaker instantaneously recalculates and re-ranks the community.
2. **Score Breakdown Drawer**: Click on the **"80% Match"** badge on Elena's card to inspect the exact points awarded for Teach Fit, Learn Fit, and Reciprocity.
3. **Generate AI Icebreaker**: Click **"Generate AI Icebreaker"** on any match card. Switch message tones (*Friendly*, *Structured*, *Enthusiastic*) to preview dynamic proposal generation.
4. **Add / Remove Skills**: Go to **"My Skills & Profile"** and add a new skill you can teach. Return to **AI Matchmaker** to observe immediate score recalculation.
5. **Theme Switch**: Click the Moon/Sun icon in the header to toggle between Dark and Light mode.
6. **Reset State**: Click the circular reset icon in the navbar at any time to return to the pristine initial demo dataset.

