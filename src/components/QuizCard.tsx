import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { QuizState } from "../types/quiz";
import KanjiDisplay from "./KanjiDisplay";
import AnswerGrid from "./AnswerGrid";
import NextButton from "./NextButton";

interface QuizCardProps {
  quizState: QuizState;
  onSelectAnswer: (optionId: string, type: "kana" | "korean") => void;
  onNextQuestion: () => void;
  onResetQuiz: () => void;
}

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  height: 100%;
  padding: ${theme.spacing.xs};
`;

const TopControls = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xs};
`;

const ScoreDisplay = styled.div`
  background-color: ${theme.colors.cardBackground};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
`;

const LoadingMessage = styled.div`
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.textSecondary};
  text-align: center;
  padding: ${theme.spacing.lg};
`;

const ResetButton = styled.button`
  background-color: ${theme.colors.cardBackground};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.hover};
    border-color: ${theme.colors.hover};
  }
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: center;
  width: 100%;
`;

const QuizCard: React.FC<QuizCardProps> = ({
  quizState,
  onSelectAnswer,
  onNextQuestion,
  onResetQuiz,
}) => {
  const {
    currentQuestion,
    selectedAnswers,
    score,
    totalQuestions,
    isAnswered,
  } = quizState;

  if (!currentQuestion) {
    return (
      <QuizContainer>
        <LoadingMessage>Loading quiz...</LoadingMessage>
      </QuizContainer>
    );
  }

  const bothAnswersSelected = selectedAnswers.kana && selectedAnswers.korean;

  return (
    <QuizContainer>
      <TopControls>
        <ResetButton onClick={onResetQuiz}>{"다시시작"}</ResetButton>
        <ScoreDisplay>
          {score}/{totalQuestions}
        </ScoreDisplay>
      </TopControls>

      <ContentArea>
        <KanjiDisplay kanji={currentQuestion.kanji} />

        <AnswerGrid
          options={currentQuestion.options}
          selectedAnswers={selectedAnswers}
          isAnswered={isAnswered}
          onSelectAnswer={onSelectAnswer}
        />
      </ContentArea>

      <NextButton
        onClick={onNextQuestion}
        disabled={!bothAnswersSelected}
        isAnswered={isAnswered}
      />
    </QuizContainer>
  );
};

export default QuizCard;
