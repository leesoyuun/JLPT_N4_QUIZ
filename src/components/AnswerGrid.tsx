import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { QuizOption } from "../types/quiz";
import AnswerOption from "./AnswerOption";

interface AnswerGridProps {
  options: QuizOption[];
  selectedAnswers: {
    kana: string | null;
    korean: string | null;
  };
  isAnswered: boolean;
  onSelectAnswer: (optionId: string, type: "kana" | "korean") => void;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.sm};
  width: 100%;
  max-width: 600px;
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.xs};
    max-width: 100%;
  }
`;

const SectionTitle = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  font-size: ${theme.fontSize.base};
  font-weight: bold;
  color: ${theme.colors.textSecondary};
  margin: ${theme.spacing.sm} 0 ${theme.spacing.xs} 0;
  
  &:first-child {
    margin-top: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSize.sm};
    margin: ${theme.spacing.xs} 0;
  }
`;

const AnswerGrid: React.FC<AnswerGridProps> = ({
  options,
  selectedAnswers,
  isAnswered,
  onSelectAnswer,
}) => {
  const kanaOptions = options.filter((option) => option.type === "kana");
  const koreanOptions = options.filter((option) => option.type === "korean");

  return (
    <GridContainer>
      <SectionTitle>{"히라가나"}</SectionTitle>
      {kanaOptions.map((option) => (
        <AnswerOption
          key={option.id}
          option={option}
          isSelected={selectedAnswers.kana === option.id}
          isAnswered={isAnswered}
          onClick={() => onSelectAnswer(option.id, "kana")}
        />
      ))}

      <SectionTitle>{"뜻"}</SectionTitle>
      {koreanOptions.map((option) => (
        <AnswerOption
          key={option.id}
          option={option}
          isSelected={selectedAnswers.korean === option.id}
          isAnswered={isAnswered}
          onClick={() => onSelectAnswer(option.id, "korean")}
        />
      ))}
    </GridContainer>
  );
};

export default AnswerGrid;
