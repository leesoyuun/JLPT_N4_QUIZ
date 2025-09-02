import { useState, useCallback, useEffect } from 'react';
import { QuizState, QuizQuestion, WordData } from '../types/quiz';
import { QuizGenerator } from '../utils/quizGenerator';

interface UseQuizReturn {
  quizState: QuizState;
  selectAnswer: (optionId: string, type: 'kana' | 'korean') => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  isAnswerCorrect: (type: 'kana' | 'korean') => boolean | null;
}

export const useQuiz = (wordData: WordData[]): UseQuizReturn => {
  const [quizGenerator] = useState(() => new QuizGenerator(wordData));
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: null,
    selectedAnswers: {
      kana: null,
      korean: null
    },
    score: 0,
    totalQuestions: 0,
    isAnswered: false
  });

  const generateNewQuestion = useCallback(() => {
    const question = quizGenerator.generateQuestion();
    if (question) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: question,
        selectedAnswers: {
          kana: null,
          korean: null
        },
        isAnswered: false
      }));
    }
  }, [quizGenerator]);

  const selectAnswer = useCallback((optionId: string, type: 'kana' | 'korean') => {
    setQuizState(prev => ({
      ...prev,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [type]: optionId
      }
    }));
  }, []);

  const isAnswerCorrect = useCallback((type: 'kana' | 'korean'): boolean | null => {
    const { currentQuestion, selectedAnswers } = quizState;
    if (!currentQuestion || !selectedAnswers[type]) {
      return null;
    }

    const selectedOption = currentQuestion.options.find(
      option => option.id === selectedAnswers[type]
    );

    return selectedOption ? selectedOption.isCorrect : false;
  }, [quizState]);

  const nextQuestion = useCallback(() => {
    const { selectedAnswers, currentQuestion } = quizState;
    
    if (!currentQuestion) return;

    // Check if both answers are selected
    if (!selectedAnswers.kana || !selectedAnswers.korean) {
      return;
    }

    // Calculate score
    const kanaCorrect = isAnswerCorrect('kana');
    const koreanCorrect = isAnswerCorrect('korean');
    const bothCorrect = kanaCorrect && koreanCorrect;

    setQuizState(prev => ({
      ...prev,
      score: bothCorrect ? prev.score + 1 : prev.score,
      totalQuestions: prev.totalQuestions + 1,
      isAnswered: true
    }));

    // Generate next question after a short delay
    setTimeout(() => {
      generateNewQuestion();
    }, 1500);
  }, [quizState, isAnswerCorrect, generateNewQuestion]);

  const resetQuiz = useCallback(() => {
    quizGenerator.reset();
    setQuizState({
      currentQuestion: null,
      selectedAnswers: {
        kana: null,
        korean: null
      },
      score: 0,
      totalQuestions: 0,
      isAnswered: false
    });
    generateNewQuestion();
  }, [quizGenerator, generateNewQuestion]);

  // Initialize with first question
  useEffect(() => {
    if (!quizState.currentQuestion && wordData.length > 0) {
      generateNewQuestion();
    }
  }, [wordData, quizState.currentQuestion, generateNewQuestion]);

  return {
    quizState,
    selectAnswer,
    nextQuestion,
    resetQuiz,
    isAnswerCorrect
  };
};
