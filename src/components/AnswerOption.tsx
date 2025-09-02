import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { QuizOption } from '../types/quiz';

interface AnswerOptionProps {
  option: QuizOption;
  isSelected: boolean;
  isAnswered: boolean;
  onClick: () => void;
}

interface StyledButtonProps {
  $isSelected: boolean;
  $isAnswered: boolean;
  $isCorrect: boolean;
  $type: 'kana' | 'korean';
}

const OptionButton = styled.button<StyledButtonProps>`
  background-color: ${({ $isSelected, $isAnswered, $isCorrect }) => {
    if ($isAnswered && $isCorrect) return theme.colors.correct;
    if ($isAnswered && $isSelected && !$isCorrect) return theme.colors.incorrect;
    if ($isSelected) return theme.colors.selected;
    return theme.colors.cardBackground;
  }};
  
  border: 2px solid ${({ $isSelected, $isAnswered, $isCorrect }) => {
    if ($isAnswered && $isCorrect) return theme.colors.correct;
    if ($isAnswered && $isSelected && !$isCorrect) return theme.colors.incorrect;
    if ($isSelected) return theme.colors.selectedBorder;
    return theme.colors.border;
  }};
  
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm};
  color: ${theme.colors.text};
  font-size: ${({ $type }) => $type === 'kana' ? theme.fontSize.xl : theme.fontSize.base};
  font-weight: ${({ $type }) => $type === 'kana' ? 'bold' : 'normal'};
  text-align: center;
  transition: all 0.2s ease;
  cursor: ${({ $isAnswered }) => $isAnswered ? 'default' : 'pointer'};
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;
  hyphens: auto;

  &:hover {
    background-color: ${({ $isAnswered, $isSelected }) => {
      if ($isAnswered) return 'inherit';
      if ($isSelected) return theme.colors.selectedBorder;
      return theme.colors.hover;
    }};
    
    border-color: ${({ $isAnswered, $isSelected }) => {
      if ($isAnswered) return 'inherit';
      if ($isSelected) return theme.colors.selectedBorder;
      return theme.colors.hover;
    }};
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 60px;
    padding: ${theme.spacing.sm};
    font-size: ${({ $type }) => $type === 'kana' ? theme.fontSize.lg : theme.fontSize.base};
  }
`;

const AnswerOption: React.FC<AnswerOptionProps> = ({ 
  option, 
  isSelected, 
  isAnswered, 
  onClick 
}) => {
  return (
    <OptionButton
      $isSelected={isSelected}
      $isAnswered={isAnswered}
      $isCorrect={option.isCorrect}
      $type={option.type}
      onClick={onClick}
      disabled={isAnswered}
    >
      {option.text}
    </OptionButton>
  );
};

export default AnswerOption;
