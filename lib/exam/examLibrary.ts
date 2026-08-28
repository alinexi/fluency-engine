export type ExamName = 'IELTS Academic' | 'IELTS General' | 'TOEFL iBT';

export type TaskName =
  | 'Task 1'
  | 'Task 2'
  | 'Integrated'
  | 'Academic Discussion';

export type QuestionType =
  // IELTS Task 1 (Visuals)
  | 'Line Graph'
  | 'Bar Chart'
  | 'Pie Chart'
  | 'Table'
  | 'Map'
  | 'Process / Diagram'
  | 'Combination'
  // IELTS Task 2 (Essays)
  | 'Agree / Disagree'
  | 'Advantages & Disadvantages'
  | 'Discuss Both Sides'
  | 'Cause & Solution'
  | 'Two-Part Question'
  // TOEFL
  | 'Integrated Reading-Lecture'
  | 'Academic Discussion';

export interface AnnotatedWord {
  word: string;
  cefr: 'C1' | 'C2';
  explanation: string;
}

export interface AnnotatedSpan {
  phrase: string;
  label: string;
  explanation: string;
}

export interface ToeflStudentReplies {
  professorQuestion: string;
  studentA: { name: string; text: string };
  studentB: { name: string; text: string };
}

export interface ExamPrompt {
  id: string;
  exam: ExamName;
  task: TaskName;
  questionType: QuestionType;
  targetWordCount: number;
  tags: string[];

  // Briefing Room content
  promptText: string;
  promptImageUrl?: string;
  promptAudioUrl?: string;
  toeflReadingPassage?: string;
  toeflStudentReplies?: ToeflStudentReplies;

  // Copywork target
  sampleAnswer: string;

  // Post-match analysis
  scoringNotes: string;
  highlightedVocab: AnnotatedWord[];
  highlightedStructures: AnnotatedSpan[];
}
