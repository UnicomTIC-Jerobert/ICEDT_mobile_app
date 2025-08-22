import { Activity, ActivityContent } from "../types/activity";
import API_BASE_URL from "./apiClient";

// --- THIS FUNCTION IS NOW SMARTER ---
// It now looks at the content to figure out the real type.
const mapApiTypeToFrontendType = (
  apiType: string,
  parsedContent: any
): ActivityContent["type"] => {
  switch (apiType) {
    case "MultipleChoiceQuestion":
      return "MCQ";
    case "Matching":
      // Check if it's a FirstLetterMatch by looking for a 'words' property
      if (parsedContent.words) {
        return "FIRST_LETTER_MATCH";
      }
      return "MATCHING";

    case "FillInTheBlanks":
      // Now we differentiate based on the content's properties
      if (parsedContent.wordBank) {
        return "WORD_BANK_COMPLETION";
      }
      if (Array.isArray(parsedContent) && parsedContent[0]?.leftOperand) {
        // Check if it's an array and the first item looks like an equation
        return "SIMPLE_EQUATION";
      }
      if (parsedContent.sentences && parsedContent.sentences[0]?.options) {
        return "DROPDOWN_COMPLETION";
      }
      // Add more specific checks if needed
      // As a fallback for this category, you can choose one or throw an error
      console.warn(
        "Could not determine specific FillInTheBlanks type, defaulting to WordBank"
      );
      return "WORD_BANK_COMPLETION";
    case "AudioImageRecognition": // <-- ADD THIS NEW CASE
      // You'll need to create a type for this in types/activity.ts later
      // For now, let's treat it as an MCQ to prevent warnings.
      return "MCQ";

    default:
      console.warn(`Unknown API activity type "${apiType}", defaulting to MCQ`);
      return "MCQ";
  }
};

// interface RawActivityFromApi {
//   activityId: number;
//   lessonId: number;
//   title: string;
//   contentJson: string;
//   activityTypeName: string;
// }

// export const getAllActivities = async (): Promise<Activity[]> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/activities`);
//     if (!response.ok) throw new Error("Failed to fetch activities");

//     const apiResponse = await response.json();
//     const rawActivities: RawActivityFromApi[] = apiResponse.result || [];

//     const transformedActivities: Activity[] = rawActivities.map((raw) => {
//       let parsedContent: any;
//       try {
//         parsedContent = JSON.parse(raw.contentJson);
//       } catch (e) {
//         console.error(
//           "Failed to parse contentJson for activityId:",
//           raw.activityId,
//           e
//         );
//         parsedContent = {};
//       }

//       // --- PASS THE PARSED CONTENT TO THE MAPPING FUNCTION ---
//       const activityType = mapApiTypeToFrontendType(
//         raw.activityTypeName,
//         parsedContent
//       );

//       // The content your API provides for SimpleEquation is just the array,
//       // but our type expects an object { type, questions }. We fix that here.
//       const finalContent =
//         activityType === "SIMPLE_EQUATION"
//           ? { type: "SIMPLE_EQUATION", questions: parsedContent }
//           : { type: activityType, ...parsedContent };

//       return {
//         id: raw.activityId,
//         title: raw.title,
//         activityType: activityType,
//         content: finalContent as ActivityContent,
//       };
//     });

//     return transformedActivities;
//   } catch (error) {
//     console.error("Error in activityApi.getAllActivities:", error);
//     return [];
//   }
// };

export const getActivityById = async (
  activityId: string | number
): Promise<Activity | null> => {
  const allActivities = await getAllActivities();
  return allActivities.find((act) => act.id === Number(activityId)) || null;
};

export const getActivitiesByLessonId = async (
  lessonId: string | number
): Promise<Activity[]> => {
  try {
    const lessonIdNumber = Number(lessonId);
    // 1. Fetch ALL activities (they will now be correctly transformed with lessonId)
    const allActivities = await getAllActivities();

    console.log(
      `[activityApi] Found ${allActivities.length} total transformed activities. Filtering for lessonId: ${lessonIdNumber}`
    );

    // 2. This filter will now work correctly
    const filteredActivities = allActivities.filter(
      (act) => act.lessonId === lessonIdNumber
    );

    console.log(
      `[activityApi] Found ${filteredActivities.length} matching activities after filter.`
    );

    return filteredActivities;
  } catch (error) {
    console.error(
      `Error in getActivitiesByLessonId for lesson ${lessonId}:`,
      error
    );
    return [];
  }
};

// Helper to avoid code duplication
const transformRawActivities = (rawActivities: any[]): Activity[] => {
  return rawActivities.map((raw) => {
    let parsedContent = JSON.parse(raw.contentJson);
    const activityType = mapApiTypeToFrontendType(
      raw.activityTypeName,
      parsedContent
    );
    const finalContent =
      activityType === "SIMPLE_EQUATION"
        ? { type: "SIMPLE_EQUATION", questions: parsedContent }
        : { type: activityType, ...parsedContent };

    return {
      id: raw.activityId,
      title: raw.title,
      lessonId: raw.lessonId, // Ensure we include the lessonId
      activityType: activityType,
      content: finalContent as ActivityContent,
    };
  });
};

export const getAllActivities = async (): Promise<Activity[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/activities`);
    if (!response.ok) throw new Error("Failed to fetch activities");
    const apiResponse = await response.json();
    return transformRawActivities(apiResponse.result || []);
  } catch (error) {
    console.error("Error in activityApi.getAllActivities:", error);
    return [];
  }
};
