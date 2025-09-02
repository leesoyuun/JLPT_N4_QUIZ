import React from 'react';
import { GlobalStyles, Container } from './styles/GlobalStyles';
import { useQuiz } from './hooks/useQuiz';
import QuizCard from './components/QuizCard';
import wordData from './constants/word/day3.json';

function App() {
  const { quizState, selectAnswer, nextQuestion, resetQuiz } = useQuiz(wordData);

  return (
    <>
      <GlobalStyles />
      <Container>
        <QuizCard
          quizState={quizState}
          onSelectAnswer={selectAnswer}
          onNextQuestion={nextQuestion}
          onResetQuiz={resetQuiz}
        />
      </Container>
    </>
  );
}

export default App;
