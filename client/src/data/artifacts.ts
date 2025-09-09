export interface TriviaQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface Artifact {
  slug: string;
  title: string;
  summary: string;
  imageUrl: string;
  quickFacts: string[];
  trivia: TriviaQuestion[];
}

export const artifacts: Artifact[] = [
  {
    slug: "ancient-egyptian-vase",
    title: "Ancient Egyptian Vase",
    summary: "A ceremonial vase from the New Kingdom period with intricate hieroglyphic carvings depicting scenes from the Book of the Dead. This remarkable piece showcases the artistic mastery of ancient Egyptian craftsmen and provides valuable insights into their religious beliefs and burial practices.",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    quickFacts: [
      "Created during the New Kingdom period (1550-1077 BCE)",
      "Made from ceramic with gold leaf detailing",
      "Height: 32cm, Diameter: 18cm",
      "Features hieroglyphic scenes from the Book of the Dead",
      "Discovered in Cairo Museum collection"
    ],
    trivia: [
      {
        question: "During which period was this vase created?",
        options: ["Old Kingdom", "Middle Kingdom", "New Kingdom", "Ptolemaic Period"],
        answerIndex: 2
      },
      {
        question: "What religious text is depicted on the vase?",
        options: ["Book of the Living", "Book of the Dead", "Pyramid Texts", "Coffin Texts"],
        answerIndex: 1
      }
    ]
  },
  {
    slug: "illuminated-manuscript",
    title: "Illuminated Manuscript",
    summary: "A beautifully decorated medieval text with gold leaf illuminations and ornate borders. This manuscript represents the pinnacle of medieval book arts, featuring intricate miniature paintings and calligraphy that tell stories of saints and biblical events.",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
    quickFacts: [
      "Created in the 13th century",
      "Features gold leaf and mineral pigments",
      "Contains 156 pages of vellum",
      "Illuminated by Benedictine monks",
      "Currently housed in the British Library"
    ],
    trivia: [
      {
        question: "What material was commonly used for medieval manuscripts?",
        options: ["Paper", "Papyrus", "Vellum", "Silk"],
        answerIndex: 2
      },
      {
        question: "Which religious order was known for creating illuminated manuscripts?",
        options: ["Franciscans", "Benedictines", "Dominicans", "Jesuits"],
        answerIndex: 1
      }
    ]
  },
  {
    slug: "greek-marble-fragment",
    title: "Greek Marble Fragment",
    summary: "A fragment from a classical Greek statue showcasing the mastery of ancient sculptors. This piece demonstrates the sophisticated understanding of human anatomy and artistic techniques that made Greek sculpture legendary throughout the ancient world.",
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0ce82e8eec3?w=800&h=600&fit=crop",
    quickFacts: [
      "Carved from Pentelic marble",
      "Dates to the 5th century BCE",
      "Part of a larger temple sculpture",
      "Shows classical contrapposto technique",
      "Found at the Acropolis excavations"
    ],
    trivia: [
      {
        question: "What type of marble was preferred by Greek sculptors?",
        options: ["Carrara marble", "Pentelic marble", "Parian marble", "Thasian marble"],
        answerIndex: 1
      },
      {
        question: "What does 'contrapposto' refer to in sculpture?",
        options: ["Color technique", "Pose with weight shift", "Carving method", "Polishing process"],
        answerIndex: 1
      }
    ]
  },
  {
    slug: "jade-dragon-pendant",
    title: "Jade Dragon Pendant",
    summary: "A finely carved jade pendant from the Han Dynasty featuring a traditional dragon motif. This exquisite piece represents the sophisticated jade-working techniques of ancient China and the cultural significance of dragons in Chinese mythology.",
    imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&h=600&fit=crop",
    quickFacts: [
      "Crafted during the Han Dynasty (206 BCE - 220 CE)",
      "Made from nephrite jade",
      "Measures 8cm in length",
      "Features traditional cloud and flame motifs",
      "Symbol of imperial power and good fortune"
    ],
    trivia: [
      {
        question: "Which dynasty is this pendant from?",
        options: ["Tang Dynasty", "Song Dynasty", "Han Dynasty", "Ming Dynasty"],
        answerIndex: 2
      },
      {
        question: "What does the dragon symbolize in Chinese culture?",
        options: ["Death", "Chaos", "Power and good fortune", "War"],
        answerIndex: 2
      }
    ]
  },
  {
    slug: "viking-battle-axe",
    title: "Viking Battle Axe",
    summary: "A well-preserved Viking battle axe from the 9th century, featuring intricate Norse designs and runes. This weapon represents the skilled metalworking of Viking craftsmen and provides insight into their warrior culture and seafaring expeditions.",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    quickFacts: [
      "Forged in the 9th century CE",
      "Made from pattern-welded steel",
      "Length: 76cm, Weight: 1.2kg",
      "Features runic inscriptions on the blade",
      "Discovered in a Norwegian burial mound"
    ],
    trivia: [
      {
        question: "What century is this axe from?",
        options: ["7th century", "8th century", "9th century", "10th century"],
        answerIndex: 2
      },
      {
        question: "What is pattern-welding?",
        options: ["A type of decoration", "A steel-making technique", "A religious ritual", "A battle formation"],
        answerIndex: 1
      }
    ]
  }
];

export const getArtifactBySlug = (slug: string): Artifact | undefined => {
  return artifacts.find(artifact => artifact.slug === slug);
};