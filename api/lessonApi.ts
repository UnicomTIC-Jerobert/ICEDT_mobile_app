import { Lesson } from "../types/lesson";

const allLessons: Lesson[] = [
  // Lessons for Level 1: மழலையர் நிலை
  {
    lessonId: 101,
    levelId: 1,
    lessonName: "எழுத்துக்கள் (Letters)",
    lessonImageUrl: "https://picsum.photos/seed/l101/100",
    description: null,
    sequenceOrder: 0,
  },
  {
    lessonId: 102,
    levelId: 1,
    lessonName: "எண்கள் (Numbers)",
    lessonImageUrl: "https://picsum.photos/seed/l102/100",
    description: null,
    sequenceOrder: 0,
  },
  {
    lessonId: 103,
    levelId: 1,
    lessonName: "நிறங்கள் (Colors)",
    lessonImageUrl: "https://picsum.photos/seed/l103/100",
    description: null,
    sequenceOrder: 0,
  },
  {
    lessonId: 104,
    levelId: 1,
    lessonName: "வடிவங்கள் (Shapes)",
    lessonImageUrl: "https://picsum.photos/seed/l104/100",
    description: null,
    sequenceOrder: 0,
  },

  // Lessons for Level 2: சிறுவர் நிலை
  {
    lessonId: 201,
    levelId: 2,
    lessonName: "உயிரினங்கள் (Animals)",
    lessonImageUrl: "https://picsum.photos/seed/l201/100",
    description: null,
    sequenceOrder: 0,
  },
  {
    lessonId: 202,
    levelId: 2,
    lessonName: "பழங்கள் (Fruits)",
    lessonImageUrl: "https://picsum.photos/seed/l202/100",
    description: null,
    sequenceOrder: 0,
  },
  {
    lessonId: 203,
    levelId: 2,
    lessonName: "காய்கறிகள் (Vegetables)",
    lessonImageUrl: "https://picsum.photos/seed/l203/100",
    description: null,
    sequenceOrder: 0,
  },

  // Lessons for Level 3: ஆண்டு 01
  {
    lessonId: 301,
    levelId: 3,
    lessonName: "பாடம் 1: உயிர் எழுத்துக்கள்",
    lessonImageUrl: "https://picsum.photos/seed/l301/100",
    description: null,
    sequenceOrder: 0,
  },
  {
    lessonId: 302,
    levelId: 3,
    lessonName: "பாடம் 2: மெய் எழுத்துக்கள்",
    lessonImageUrl: "https://picsum.photos/seed/l302/100",
    description: null,
    sequenceOrder: 0,
  },
  {
    lessonId: 303,
    levelId: 3,
    lessonName: "பாடம் 3: எளிய சொற்கள்",
    lessonImageUrl: "https://picsum.photos/seed/l303/100",
    description: null,
    sequenceOrder: 0,
  },
  {
    lessonId: 304,
    levelId: 3,
    lessonName: "பாடம் 4: உரையாடல்",
    lessonImageUrl: "https://picsum.photos/seed/l304/100",
    description: null,
    sequenceOrder: 0,
  },
  {
    lessonId: 305,
    levelId: 3,
    lessonName: "பாடம் 5: சிறு கதைகள்",
    lessonImageUrl: "https://picsum.photos/seed/l305/100",
    description: null,
    sequenceOrder: 0,
  },
];

export const getLessonsByLevelId = async (
  levelId: string | number
): Promise<Lesson[]> => {
  const numericLevelId = Number(levelId);
  const filteredLessons = allLessons.filter(
    (lesson) => lesson.levelId === numericLevelId
  );

  return Promise.resolve(filteredLessons);

  /*
    // --- REAL API CALL (Commented out for now) ---
    try {
        const response = await fetch(`${API_BASE_URL}/levels/${levelId}/lessons`);
        if (!response.ok) {
            throw new Error(`Failed to fetch lessons for level ID ${levelId}.`);
        }
        const wrappedResponse = await response.json();
        return wrappedResponse.result || [];
    } catch (error) {
        console.error(`Error in lessonApi.getLessonsByLevelId for level ID ${levelId}:`, error);
        return [];
    }
    */
};

export const getLessonById = async (
  lessonId: string | number
): Promise<Lesson | null> => {
  const numericLessonId = Number(lessonId);
  const lesson = allLessons.find((l) => l.lessonId === numericLessonId);
  return Promise.resolve(lesson || null);

  /*
    // --- REAL API CALL (Commented out for now) ---
    try {
        const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch lesson with ID ${lessonId}.`);
        }
        const wrappedResponse = await response.json();
        return wrappedResponse.result;
    } catch (error) {
        console.error(`Error in lessonApi.getLessonById for ID ${lessonId}:`, error);
        throw error;
    }
    */
};
