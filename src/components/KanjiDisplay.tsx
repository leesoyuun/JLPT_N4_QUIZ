import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface KanjiDisplayProps {
  kanji: string;
}

const KanjiCard = styled.div`
  background-color: ${theme.colors.kanjiCardBackground};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  min-width: 120px;
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 100px;
    min-width: 100px;
    padding: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.xs};
  }
`;

const KanjiCharacter = styled.div`
  font-size: ${theme.fontSize['6xl']};
  font-weight: bold;
  color: ${theme.colors.text};
  text-align: center;
  line-height: 1;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSize['5xl']};
  }
`;

const KanjiDisplay: React.FC<KanjiDisplayProps> = ({ kanji }) => {
  return (
    <KanjiCard>
      <KanjiCharacter>{kanji}</KanjiCharacter>
    </KanjiCard>
  );
};

export default KanjiDisplay;
