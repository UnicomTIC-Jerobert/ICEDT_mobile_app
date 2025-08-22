import { Lesson } from "../types/lesson";

const allLessons: Lesson[] = [
  // Level 1, Lesson 101: Now has an MCQ activity
  {
    lessonId: 21,
    levelId: 1,
    lessonName: "எழுத்துக்கள் (Letters)",
    lessonImageUrl: "https://picsum.photos/seed/l101/100",
    // The old content fields can still exist
    learnContent: "This is the learning content for Letters.",
    // NEW activities array
    activities: [
      {
        id: 1,
        title: "Letter Recognition",
        activityType: "MCQ",
        content: {
          type: "MCQ",
          question: "Which one is the letter 'ஆ'?",
          choices: [
            { id: "c1", text: "அ", isCorrect: false },
            { id: "c2", text: "ஆ", isCorrect: true },
            { id: "c3", text: "இ", isCorrect: false },
            { id: "c4", text: "ஈ", isCorrect: false },
          ],
        },
      },
    ],
    description: null,
    sequenceOrder: 1,
  },
  // Level 1, Lesson 102: Also has an MCQ activity
  {
    lessonId: 102,
    levelId: 1,
    lessonName: "எண்கள் (Numbers)",
    lessonImageUrl: "https://picsum.photos/seed/l102/100",
    learnContent: "This is the learning content for Numbers.",
    activities: [
      {
        id: 2,
        title: "Number Matching",
        activityType: "MCQ",
        content: {
          type: "MCQ",
          question: "What is the number for 'இரண்டு'?",
          choices: [
            { id: "c1", text: "1", isCorrect: false },
            { id: "c2", text: "3", isCorrect: false },
            { id: "c3", text: "2", isCorrect: true },
          ],
        },
      },
      {
        id: 2, // Make sure ID is unique
        title: "Letter Recognition 2",
        activityType: "MCQ",
        content: {
          type: "MCQ",
          question: "What is the first letter of 'அம்மா'?",
          choices: [
            { id: "c1", text: "ஆ", isCorrect: false },
            { id: "c2", text: "அ", isCorrect: true },
            { id: "c3", text: "உ", isCorrect: false },
          ],
        },
      },
      {
        id: 3, // Make sure ID is unique
        title: "Letter Recognition 3",
        activityType: "MCQ",
        content: {
          type: "MCQ",
          question: "What is the first letter of 'அம்மா'?",
          choices: [
            { id: "c1", text: "ஆ", isCorrect: false },
            { id: "c2", text: "அ", isCorrect: true },
            { id: "c3", text: "உ", isCorrect: false },
          ],
        },
      },
    ],
    description: null,
    sequenceOrder: 2,
  },
  // Level 1, Lesson 103: This lesson has NO activities, so it won't be clickable.
  {
    lessonId: 103,
    levelId: 1,
    lessonName: "நிறங்கள் (Colors)",
    lessonImageUrl: "https://picsum.photos/seed/l103/100",
    learnContent: "This is the learning content for Colors.",
    activities: [],
    description: null,
    sequenceOrder: 3,
  },
];

// export const getLessonById = async (
//   lessonId: string | number
// ): Promise<Lesson | null> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch lesson with ID ${lessonId}.`);
//     }

//     const data = await response.json(); // only call once
//     return data.result ?? null; // unwrap the result object
//   } catch (error) {
//     console.error(`Error fetching lesson ID ${lessonId}:`, error);
//     return null;
//   }
// };

// export const getLessonsByLevelId = async (
//   levelId: string | number
// ): Promise<Lesson[]> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/levels/${levelId}/lessons`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch lessons for level ID ${levelId}.`);
//     }

//     const data = await response.json(); // only call once
//     return data.result ?? []; // unwrap the result array
//   } catch (error) {
//     console.error(`Error fetching lessons for level ${levelId}:`, error);
//     return [];
//   }
// };

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
 */
export const getLessonById = async (
  lessonId: string | number
): Promise<Lesson | null> => {
  const numericLessonId = Number(lessonId);
  const lesson = allLessons.find((l) => l.lessonId === numericLessonId);
  return Promise.resolve(lesson || null);
};
