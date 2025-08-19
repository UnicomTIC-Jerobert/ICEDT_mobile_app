import { Level } from "../types/level";
import API_BASE_URL from "./apiClient";

export const getAll = async (): Promise<Level[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/levels`);
    if (!response.ok) {
      throw new Error("Failed to fetch levels from the server.");
    }

    const data = await response.json(); 
    console.log("Fetched levels:", data);

    return data.result ?? data; // in case your API wraps result in { result: [...] }
  } catch (error) {
    console.error("Error in levelApi.getAll:", error);
    return [];
  }
};

export const getLevelById = async (
  levelId: string | number
): Promise<Level> => {
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
