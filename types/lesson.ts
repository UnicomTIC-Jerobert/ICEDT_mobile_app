/**
 * Represents a single Lesson object as returned by the API.
 */
export interface Lesson {
  lessonId: number;
  levelId: number;
  lessonName: string;
  description: string | null;
  sequenceOrder: number;
  // The image URL for the lesson list item
  lessonImageUrl: string | null;

  learnContent?: string;
  exerciseContent?: string;
  soundUrl?: string;
  videoUrl?: string;
  activities: any[]; // Replace 'any' with a proper Activity type if available
}
