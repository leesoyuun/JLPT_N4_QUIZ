export interface WordData {
  kanji: string;
  kana: string;
  korean: string;
}

export interface QuizOption {
  id: string;
  text: string;
  type: 'kana' | 'korean';
  isCorrect: boolean;
}

export interface QuizQuestion {
  kanji: string;
  correctKana: string;
  correctKorean: string;
  options: QuizOption[];
}

export interface QuizState {
  currentQuestion: QuizQuestion | null;
  selectedAnswers: {
    kana: string | null;
    korean: string | null;
  };
  score: number;
  totalQuestions: number;
  isAnswered: boolean;
}
