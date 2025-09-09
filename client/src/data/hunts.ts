export interface HuntStep {
  order: number;
  artifactSlug: string;
  clue: string;
}

export interface Hunt {
  id: string;
  name: string;
  introText: string;
  steps: HuntStep[];
}

export interface HuntProgress {
  huntId: string;
  currentStep: number;
  completedSteps: number[];
  startedAt: string;
}

export const hunts: Hunt[] = [
  {
    id: "ancient-civilizations",
    name: "Ancient Civilizations Quest",
    introText: "Embark on a journey through time to discover artifacts from the world's greatest ancient civilizations. Follow the clues to uncover treasures from Egypt, Greece, China, and the Viking lands.",
    steps: [
      {
        order: 1,
        artifactSlug: "ancient-egyptian-vase",
        clue: "Begin your journey where the pharaohs once ruled. Look for a ceremonial vessel that guided souls to the afterlife."
      },
      {
        order: 2,
        artifactSlug: "greek-marble-fragment",
        clue: "Travel to the birthplace of democracy. Seek a piece of stone that once adorned temples to the gods."
      },
      {
        order: 3,
        artifactSlug: "jade-dragon-pendant",
        clue: "Journey to the Middle Kingdom where dragons symbolize power. Find the green stone that emperors treasured."
      },
      {
        order: 4,
        artifactSlug: "viking-battle-axe",
        clue: "Sail north to the lands of warriors and seafarers. Discover the weapon that carved history across the seas."
      }
    ]
  }
];

export const getHuntById = (id: string): Hunt | undefined => {
  return hunts.find(hunt => hunt.id === id);
};

export const getHuntProgress = (huntId: string): HuntProgress | null => {
  const stored = localStorage.getItem(`hunt_progress_${huntId}`);
  return stored ? JSON.parse(stored) : null;
};

export const saveHuntProgress = (progress: HuntProgress): void => {
  localStorage.setItem(`hunt_progress_${progress.huntId}`, JSON.stringify(progress));
};

export const startHunt = (huntId: string): HuntProgress => {
  const progress: HuntProgress = {
    huntId,
    currentStep: 1,
    completedSteps: [],
    startedAt: new Date().toISOString()
  };
  saveHuntProgress(progress);
  return progress;
};

export const completeHuntStep = (huntId: string, stepOrder: number): HuntProgress | null => {
  const progress = getHuntProgress(huntId);
  if (!progress) return null;

  if (!progress.completedSteps.includes(stepOrder)) {
    progress.completedSteps.push(stepOrder);
    progress.currentStep = stepOrder + 1;
    saveHuntProgress(progress);
  }
  
  return progress;
};