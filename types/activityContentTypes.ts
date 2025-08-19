// This file will hold the interfaces for all activity content types.

// --- 1. DEFINE INDIVIDUAL ACTIVITY CONTENT TYPES (WITH A 'type' DISCRIMINATOR) ---

export interface MCQChoice {
  id: string | number;
  text: string;
  isCorrect: boolean;
}

export interface MCQContent {
  type: "MCQ"; // <-- The unique identifier
  question: string;
  choices: MCQChoice[];
}

export interface MatchItem {
  id: string;
  content: string;
  matchId: string;
}

export interface MatchingContent {
  type: "MATCHING"; // <-- The unique identifier
  title?: string;
  columnA: MatchItem[];
  columnB: MatchItem[];
}

export interface FirstLetterMatchContent {
  type: "FIRST_LETTER_MATCH"; // <-- The unique identifier
  title: string;
  words: string[];
}

export interface SimpleEquationContent {
  type: "SIMPLE_EQUATION"; // <-- The unique identifier
  leftOperand: string;
  rightOperand: string;
  correctAnswer: string;
  options: string[];
}

export interface SentenceWithBlank {
  id: number;
  prefix: string;
  suffix: string;
  correctAnswer: string;
}

export interface WordBankCompletionContent {
  type: "WORD_BANK_COMPLETION"; // <-- The unique identifier
  title: string;
  sentences: SentenceWithBlank[];
  wordBank: string[];
}

export interface DropdownBlank {
  id: number;
  prefix: string;
  suffix: string;
  options: string[];
  correctAnswer: string;
}

export interface DropdownCompletionContent {
  type: "DROPDOWN_COMPLETION"; // <-- The unique identifier
  title: string;
  sentences: DropdownBlank[];
}

// --- 2. CREATE THE MAIN UNION TYPE (THIS IS A KEY EXPORT) ---
// This 'ActivityContent' type can be ANY ONE of the interfaces defined above.
export type ActivityContent =
  | MCQContent
  | MatchingContent
  | FirstLetterMatchContent
  | SimpleEquationContent
  | WordBankCompletionContent
  | DropdownCompletionContent;

// --- 3. CREATE THE FINAL ACTIVITY WRAPPER (THIS IS THE OTHER KEY EXPORT) ---
// This is the structure you will use inside your 'Lesson' type.
// It contains the metadata AND the specific content for the activity.
export interface Activity {
  id: number; // A unique ID for this activity instance
  title: string;

  // This makes it easy to know the activity type without looking inside 'content'
  activityType: ActivityContent["type"];

  // The 'content' property holds the data that is specific to ONE activity type.
  content: ActivityContent;
}
