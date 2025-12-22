
export interface VocabularyItem {
  english: string;
  past?: string;
  pastParticiple?: string;
  portuguese: string;
}

export interface PhraseItem {
  english: string;
  portuguese: string;
}

export interface UnscrambleExercise {
  id: string;
  sentence: string; // The correct sentence
  scrambled: string[]; // Shuffled words
}

export interface ClozeExercise {
  text: string; // "I have [been] to London." where [word] is the blank
  title: string;
  instructions: string;
}

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  unscramble: UnscrambleExercise[];
  cloze: ClozeExercise;
}

export enum TabType {
  VOCABULARY = 'vocabulary',
  PHRASES = 'phrases',
  EXERCISES = 'exercises'
}
