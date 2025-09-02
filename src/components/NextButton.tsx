import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

interface NextButtonProps {
  onClick: () => void;
  disabled: boolean;
  isAnswered: boolean;
}

interface StyledButtonProps {
  $disabled: boolean;
  $isAnswered: boolean;
}

const Button = styled.button<StyledButtonProps>`
  background-color: ${({ $disabled }) =>
    $disabled ? theme.colors.textSecondary : theme.colors.primary};
  color: ${({ $disabled }) =>
    $disabled ? theme.colors.background : theme.colors.background};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  font-size: ${theme.fontSize.lg};
  font-weight: bold;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  min-width: 150px;
  min-height: 40px;

  &:hover {
    background-color: ${({ $disabled }) =>
      $disabled ? theme.colors.textSecondary : theme.colors.primaryHover};
    transform: ${({ $disabled }) => ($disabled ? "none" : "translateY(-2px)")};
  }

  &:active {
    transform: ${({ $disabled }) => ($disabled ? "none" : "translateY(0)")};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-width: 120px;
    min-height: 35px;
    font-size: ${theme.fontSize.sm};
    padding: ${theme.spacing.xs} ${theme.spacing.md};
  }
`;

const ButtonText = styled.span<{ $isAnswered: boolean }>`
  display: inline-block;
  transition: opacity 0.2s ease;
`;

const NextButton: React.FC<NextButtonProps> = ({
  onClick,
  disabled,
  isAnswered,
}) => {
  const getButtonText = () => {
    if (isAnswered) {
      return "다음문제";
    }
    return "정답확인";
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled && !isAnswered}
      $disabled={disabled && !isAnswered}
      $isAnswered={isAnswered}
    >
      <ButtonText $isAnswered={isAnswered}>{getButtonText()}</ButtonText>
    </Button>
  );
};

export default NextButton;
