import { Level } from '../types/level';
import API_BASE_URL from './apiClient';


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

    try {
        // Fetch the local JSON file from the public directory
        const response = await fetch('/levels.json');

        if (!response.ok) {
            // Handle file not found (404) or other fetch errors
            throw new Error(`Failed to fetch levels.json. Status: ${response.status}`);
        }

        // The rest of the logic is the same
        return await response.json();

    } catch (error) {
        console.error("Error in levelApi.getAll:", error);
        // Return an empty array so the UI can handle the "no levels" state
        return [];
    }
};

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