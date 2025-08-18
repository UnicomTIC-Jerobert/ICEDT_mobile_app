/**
 * Represents a single Level object as returned by the API.
 */
export interface Level {
    levelId: number;
    levelName: string;
    sequenceOrder: number;
    slug: string;
    // The cover image URL for the level card
    coverImageUrl: string | null; 
}