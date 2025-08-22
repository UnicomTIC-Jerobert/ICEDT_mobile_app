// This file holds the TypeScript interfaces for all activity content types.

// --- 1. DEFINE THE SHAPE OF EACH INDIVIDUAL ACTIVITY'S CONTENT ---
// Each content interface has a unique 'type' property. This is the "discriminator".

export interface MCQChoice {
  id: string | number;
  text: string;
  isCorrect: boolean;
}

export interface MCQContent {
  type: "MCQ";
  question: string;
  choices: MCQChoice[];
}

export interface MatchItem {
  id: string;
  content: string;
  matchId: string;
}

export interface MatchingContent {
  type: "MATCHING";
  title?: string;
  columnA: MatchItem[];
  columnB: MatchItem[];
}

// Based on your API response for activityId: 2
export interface FirstLetterMatchContent {
  type: "FIRST_LETTER_MATCH";
  title: string;
  words: string[];
}

// Based on your API response for activityId: 1
export interface Equation {
  leftOperand: string;
  rightOperand: string;
  correctAnswer: string;
  options: string[];
}
export interface SimpleEquationContent {
  type: "SIMPLE_EQUATION";
  // The content for this activity is an array of individual equation problems.
  questions: Equation[];
}

// Based on your API response for activityId: 4
export interface SentenceWithBlank {
  id: number;
  prefix: string;
  suffix: string;
  correctAnswer: string;
}
export interface WordBankCompletionContent {
  type: "WORD_BANK_COMPLETION";
  title: string;
  sentences: SentenceWithBlank[];
  wordBank: string[];
}

// Based on your API response for activityId: 5
export interface DropdownBlank {
  id: number;
  prefix: string;
  suffix: string;
  options: string[];
  correctAnswer: string;
}
export interface DropdownCompletionContent {
  type: "DROPDOWN_COMPLETION";
  title: string;
  sentences: DropdownBlank[];
}

// --- 2. CREATE A UNION TYPE OF ALL POSSIBLE ACTIVITY CONTENT ---
// This special 'ActivityContent' type can hold ANY ONE of the interfaces defined above.
export type ActivityContent =
  | MCQContent
  | MatchingContent
  | FirstLetterMatchContent
  | SimpleEquationContent
  | WordBankCompletionContent
  | DropdownCompletionContent;

// --- 3. CREATE THE FINAL, UNIFIED 'ACTIVITY' WRAPPER ---
// This is the main type you will use throughout your app (e.g., in an array like Activity[]).
// It contains metadata (like id, title) and the specific content for the activity.
export interface Activity {
  id: number;
  title: string;
  lessonId: number; // <-- ADD THIS LINE
  // This makes it easy to check the type without looking deep inside the 'content' object.
  activityType: ActivityContent["type"];

  // The 'content' property holds the data that is specific to ONLY ONE activity type.
  content: ActivityContent;
}
