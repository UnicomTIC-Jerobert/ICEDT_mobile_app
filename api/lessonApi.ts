import { Lesson } from "../types/lesson";

// --- MOCK DATA ---
const allLessons: Lesson[] = [
  // Level 1: Has a mix of options
  {
    lessonId: 101,
    levelId: 1,
    lessonName: "எழுத்துக்கள் (Letters)",
    lessonImageUrl: "https://picsum.photos/seed/l101/100",
    learnContent: "This is the learning content for Letters.",
    exerciseContent: "This is the exercise for Letters.",
    soundUrl: "path/to/letters_sound.mp3",
    videoUrl: "path/to/letters_video.mp4",
    description: null,
    sequenceOrder: 0,
  },
  {
    lessonId: 102,
    levelId: 1,
    lessonName: "எண்கள் (Numbers)",
    lessonImageUrl: "https://picsum.photos/seed/l102/100",
    learnContent: "This is the learning content for Numbers.",
    exerciseContent: "This is the exercise for Numbers.",
    description: null,
    sequenceOrder: 0,
    // No sound or video for this lesson
  },
  {
    lessonId: 103,
    levelId: 1,
    lessonName: "நிறங்கள் (Colors)",
    lessonImageUrl: "https://picsum.photos/seed/l103/100",
    learnContent: "This is the learning content for Colors.",
    videoUrl: "path/to/colors_video.mp4",
    description: null,
    sequenceOrder: 0,
    // No exercise or sound
  },

  // Level 3: Has all options for the first lesson
  {
    lessonId: 301,
    levelId: 3,
    lessonName: "பாடம் 1: உயிர் எழுத்துக்கள்",
    lessonImageUrl: "https://picsum.photos/seed/l301/100",
    learnContent: "This is the learning content for Vowels.",
    exerciseContent: "This is the exercise for Vowels.",
    soundUrl: "path/to/vowels_sound.mp3",
    videoUrl: "path/to/vowels_video.mp4",
    description: null,
    sequenceOrder: 0,
  },
  {
    lessonId: 302,
    levelId: 3,
    lessonName: "பாடம் 2: மெய் எழுத்துக்கள்",
    lessonImageUrl: "https://picsum.photos/seed/l302/100",
    learnContent: "This is the learning content for Consonants.",
    exerciseContent: "This is the exercise for Consonants.",
    description: null,
    sequenceOrder: 0,
  },
];

/**
 * Fetches all lessons for a specific level ID.
 * (No changes needed here, it will just return the new data structure)
 */
export const getLessonsByLevelId = async (
  levelId: string | number
): Promise<Lesson[]> => {
  const numericLevelId = Number(levelId);
  const filteredLessons = allLessons.filter(
    (lesson) => lesson.levelId === numericLevelId
  );
  return Promise.resolve(filteredLessons);
};

/**
 * Fetches a single lesson by its ID.
 * (No changes needed here, it will find and return the full lesson object)
 */
export const getLessonById = async (
  lessonId: string | number
): Promise<Lesson | null> => {
  const numericLessonId = Number(lessonId);
  const lesson = allLessons.find((l) => l.lessonId === numericLessonId);
  return Promise.resolve(lesson || null);
};
