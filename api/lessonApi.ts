import { Lesson } from '../types/lesson';
import API_BASE_URL from './apiClient';

/**
 * Fetches all lessons for a specific level ID.
 * @param levelId The ID of the parent level.
 * @returns A promise that resolves to an array of Lesson objects.
 */
export const getLessonsByLevelId = async (levelId: string | number): Promise<Lesson[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/levels/${levelId}/lessons`);
        if (!response.ok) {
            throw new Error(`Failed to fetch lessons for level ID ${levelId}.`);
        }
        // Assuming the API now returns the wrapped response
        const wrappedResponse = await response.json();
        return wrappedResponse.result || []; // Extract the lessons from the 'result' property
    } catch (error) {
        console.error(`Error in lessonApi.getLessonsByLevelId for level ID ${levelId}:`, error);
        return [];
    }
};

/**
 * Fetches a single lesson by its ID.
 * @param lessonId The ID of the lesson to fetch.
 * @returns A promise that resolves to a single Lesson object.
 */
export const getLessonById = async (lessonId: string | number): Promise<Lesson> => {
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
};