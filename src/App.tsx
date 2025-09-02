import React, { useEffect } from 'react';
import { GlobalStyles, Container } from './styles/GlobalStyles';
import { useQuiz } from './hooks/useQuiz';
import QuizCard from './components/QuizCard';
import PWAInstallButton from './components/PWAInstallButton';
import OnlineStatus from './components/OnlineStatus';
import wordData from './constants/word/day3.json';
import { 
  registerSW, 
  setupPWAInstall, 
  saveWordData, 
  loadWordData,
  saveQuizProgress 
} from './utils/pwa';

function App() {
  const { quizState, selectAnswer, nextQuestion, resetQuiz } = useQuiz(wordData);

  useEffect(() => {
    // Register Service Worker
    registerSW();
    
    // Setup PWA install prompt
    setupPWAInstall();
    
    // Save word data to localStorage for offline use
    saveWordData(wordData);
    
    // Load any existing quiz progress
    const savedProgress = loadWordData();
    if (savedProgress.length === 0) {
      saveWordData(wordData);
    }
  }, []);

  useEffect(() => {
    // Save quiz progress whenever it changes
    if (quizState.totalQuestions > 0) {
      saveQuizProgress({
        score: quizState.score,
        totalQuestions: quizState.totalQuestions,
        timestamp: new Date().toISOString()
      });
    }
  }, [quizState.score, quizState.totalQuestions]);

  return (
    <>
      <GlobalStyles />
      <OnlineStatus />
      <Container>
        <QuizCard
          quizState={quizState}
          onSelectAnswer={selectAnswer}
          onNextQuestion={nextQuestion}
          onResetQuiz={resetQuiz}
        />
      </Container>
      <PWAInstallButton />
    </>
  );
}

export default App;
