/**
 * Sample Demo Users for Local Community & Skill Swap Hub
 * Carefully structured to showcase:
 * - High Reciprocal Match (~90-95%): Alex <-> Elena (React for Guitar)
 * - Good Match (~75-85%): Alex <-> Marcus (Python for Sourdough Baking)
 * - Moderate / Partial Match (~50-60%): Alex <-> Sophia (Web for UI Design)
 * - Low Match (~15-25%): Alex <-> David (Unrelated fitness & languages)
 */

export const INITIAL_USERS = [
  {
    id: "usr_alex",
    name: "Alex Rivera",
    role: "Full-Stack Developer & Tech Mentor",
    neighborhood: "Downtown Creative Quarter",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Software engineer by day. Looking to unplug on weekends, learn acoustic guitar, and bake authentic sourdough bread.",
    availability: "Weekend Mornings & Thursday Evenings",
    skillsOffered: [
      {
        id: "off_1",
        title: "React & Modern Web Development",
        category: "Technology",
        level: "Advanced",
        description: "Hands-on guidance on React components, hooks, state management, and modern Tailwind UI styling.",
        tags: ["react", "javascript", "web", "frontend", "ui"]
      },
      {
        id: "off_2",
        title: "Python Scripting & Automation",
        category: "Technology",
        level: "Intermediate",
        description: "Automate repetitive daily tasks, Excel reports, and web scraping with clean, readable Python code.",
        tags: ["python", "scripts", "automation", "data"]
      }
    ],
    skillsWanted: [
      {
        id: "wnt_1",
        title: "Acoustic Guitar Basics",
        category: "Music",
        priority: "High",
        learningGoals: "Master open chords, strumming rhythms, and play my first 3 acoustic campfire songs.",
        tags: ["guitar", "music", "acoustic", "chords"]
      },
      {
        id: "wnt_2",
        title: "Sourdough Bread Baking",
        category: "Cooking",
        priority: "Medium",
        learningGoals: "Learn starter maintenance, folding techniques, and how to get an open, airy crumb.",
        tags: ["baking", "cooking", "sourdough", "fermentation"]
      }
    ]
  },
  {
    id: "usr_elena",
    name: "Elena Rostova",
    role: "Acoustic Musician & Vocalist",
    neighborhood: "Arts District (Downtown)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    bio: "Acoustic singer-songwriter for 8 years. Building my personal artist portfolio website and want to master React.",
    availability: "Flexible Weekdays & Saturday Mornings",
    skillsOffered: [
      {
        id: "off_elena_1",
        title: "Acoustic Guitar Basics & Fingerstyle",
        category: "Music",
        level: "Advanced",
        description: "Patient, step-by-step guidance on chord transitions, fingerpicking patterns, and rhythm timing.",
        tags: ["guitar", "music", "acoustic", "chords", "fingerstyle"]
      },
      {
        id: "off_elena_2",
        title: "Vocal Warmups & Breathing Technique",
        category: "Music",
        level: "Intermediate",
        description: "Proper diaphragm breathing, pitch accuracy exercises, and vocal strain prevention.",
        tags: ["music", "singing", "vocals", "audio"]
      }
    ],
    skillsWanted: [
      {
        id: "wnt_elena_1",
        title: "React & Modern Web Development",
        category: "Technology",
        priority: "High",
        learningGoals: "Build an interactive tour date list and music player using React and Tailwind CSS.",
        tags: ["react", "javascript", "web", "frontend", "ui"]
      }
    ]
  },
  {
    id: "usr_marcus",
    name: "Marcus Chen",
    role: "Artisan Baker & Urban Gardener",
    neighborhood: "Green Valley (2.5 km away)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Head baker at a local micro-bakery. Need help automating weekly flour inventory and customer orders with Python.",
    availability: "Tuesday & Sunday Afternoons",
    skillsOffered: [
      {
        id: "off_marcus_1",
        title: "Artisan Sourdough & Starter Culture",
        category: "Cooking",
        level: "Advanced",
        description: "From feeding wild yeast starters to crust blistering and crumb structure analysis.",
        tags: ["baking", "cooking", "sourdough", "bread", "fermentation"]
      },
      {
        id: "off_marcus_2",
        title: "Balcony Vegetable Gardening",
        category: "Gardening",
        level: "Intermediate",
        description: "Companion planting, organic soil mix preparation, and harvesting tomatoes and herbs in small spaces.",
        tags: ["gardening", "plants", "organic", "sustainability"]
      }
    ],
    skillsWanted: [
      {
        id: "wnt_marcus_1",
        title: "Python Automation for Small Business",
        category: "Technology",
        priority: "High",
        learningGoals: "Write scripts that read CSV supplier orders and alert me when flour stocks run low.",
        tags: ["python", "scripts", "automation", "data"]
      }
    ]
  },
  {
    id: "usr_sophia",
    name: "Sophia Patel",
    role: "UI/UX Product Designer",
    neighborhood: "Midtown Center (4 km away)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    bio: "Design systems specialist and watercolor enthusiast. Want to learn HTML/CSS/Web basics to communicate better with dev teams.",
    availability: "Wednesday Evenings & Weekends",
    skillsOffered: [
      {
        id: "off_sophia_1",
        title: "Figma UI/UX & Design Systems",
        category: "Design",
        level: "Advanced",
        description: "Auto-layout mastery, component variants, typography hierarchy, and wireframing best practices.",
        tags: ["design", "ui", "ux", "figma", "wireframe"]
      },
      {
        id: "off_sophia_2",
        title: "Intro to Watercolor Painting",
        category: "Art",
        level: "Beginner",
        description: "Color mixing, wet-on-wet watercolor washes, and relaxed botanical sketches.",
        tags: ["art", "painting", "watercolor", "drawing"]
      }
    ],
    skillsWanted: [
      {
        id: "wnt_sophia_1",
        title: "Web Development Fundamentals",
        category: "Technology",
        priority: "Medium",
        learningGoals: "Understand how CSS Grid and Flexbox translate to code.",
        tags: ["web", "frontend", "html", "css", "ui"]
      }
    ]
  },
  {
    id: "usr_david",
    name: "David Kim",
    role: "Certified Fitness Coach",
    neighborhood: "Bayside District (6 km away)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    bio: "Kinesiology graduate focused on bodyweight fitness and functional mobility. Planning to backpack South America next year.",
    availability: "Early Mornings (Mon-Fri)",
    skillsOffered: [
      {
        id: "off_david_1",
        title: "Calisthenics & Posture Alignment",
        category: "Fitness",
        level: "Advanced",
        description: "Injury-free bodyweight strength routines, desk posture corrections, and core mobility drills.",
        tags: ["fitness", "posture", "calisthenics", "health"]
      }
    ],
    skillsWanted: [
      {
        id: "wnt_david_1",
        title: "Conversational Spanish",
        category: "Languages",
        priority: "High",
        learningGoals: "Practice speaking conversational Spanish for travel and everyday ordering.",
        tags: ["spanish", "languages", "conversation", "speaking"]
      }
    ]
  }
];

export const SKILL_CATEGORIES = [
  "All",
  "Technology",
  "Music",
  "Cooking",
  "Design",
  "Gardening",
  "Fitness",
  "Languages",
  "Art"
];

