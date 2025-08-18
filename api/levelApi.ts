import { Level } from '../types/level';
import API_BASE_URL from './apiClient';

const levels: Level[] =[
    {
        "levelId": 1,
        "levelName": "மழலையர் நிலை",
        "slug": "malayalar-nilai",
        "sequenceOrder": 1,
        "coverImageUrl": null
    },
    {
        "levelId": 2,
        "levelName": "சிறுவர் நிலை",
        "slug": "siruvar-nilai",
        "sequenceOrder": 2,
        "coverImageUrl": null
    },
    {
        "levelId": 3,
        "levelName": "ஆண்டு 01",
        "slug": "aandu-01",
        "sequenceOrder": 3,
        "coverImageUrl": null
    },
    {
        "levelId": 4,
        "levelName": "ஆண்டு 02",
        "slug": "aandu-02",
        "sequenceOrder": 4,
        "coverImageUrl": null
    },
    {
        "levelId": 5,
        "levelName": "ஆண்டு 03",
        "slug": "aandu-03",
        "sequenceOrder": 5,
        "coverImageUrl": null
    },
    {
        "levelId": 6,
        "levelName": "ஆண்டு 04",
        "slug": "aandu-04",
        "sequenceOrder": 6,
        "coverImageUrl": null
    },
    {
        "levelId": 7,
        "levelName": "ஆண்டு 05",
        "slug": "aandu-05",
        "sequenceOrder": 7,
        "coverImageUrl": null
    }
]

/**
 * Fetches all available levels from the backend API.
 * @returns A promise that resolves to an array of Level objects.
 */
export const getAll = async (): Promise<Level[]> => {
    // try {
    //     const response = await fetch(`${API_BASE_URL}/levels`);
    //     if (!response.ok) {
    //         // In a real app, you'd handle errors more gracefully
    //         throw new Error('Failed to fetch levels from the server.');
    //     }
    //     return await response.json();
    // } catch (error) {
    //     console.error("Error in levelApi.getAll:", error);
    //     // Return an empty array or re-throw to be handled by the UI
    //     return []; 
    // }

   return levels;};

/**
 * Fetches a single level by its ID.
 * Useful for getting the level name for a header, for example.
 * @param levelId The ID of the level to fetch.
 * @returns A promise that resolves to a single Level object.
 */
export const getLevelById = async (levelId: string | number): Promise<Level> => {
    try {
        const response = await fetch(`${API_BASE_URL}/levels/${levelId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch level with ID ${levelId}.`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error in levelApi.getLevelById for ID ${levelId}:`, error);
        throw error;
    }
};