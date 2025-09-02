import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { setupOnlineOfflineDetection, isOnline } from '../utils/pwa';

interface StatusIndicatorProps {
  $isOnline: boolean;
}

const StatusContainer = styled.div<StatusIndicatorProps>`
  position: fixed;
  top: ${theme.spacing.sm};
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ $isOnline }) => 
    $isOnline ? theme.colors.correct : theme.colors.incorrect
  };
  color: ${theme.colors.background};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  font-weight: bold;
  z-index: 1000;
  transition: all 0.3s ease;
  opacity: ${({ $isOnline }) => $isOnline ? 0 : 1};
  visibility: ${({ $isOnline }) => $isOnline ? 'hidden' : 'visible'};

  @media (max-width: ${theme.breakpoints.mobile}) {
    top: ${theme.spacing.xs};
    font-size: ${theme.fontSize.sm};
    padding: ${theme.spacing.xs};
  }
`;

const OnlineStatus: React.FC = () => {
  const [online, setOnline] = useState(isOnline());

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      console.log('App is online');
    };

    const handleOffline = () => {
      setOnline(false);
      console.log('App is offline');
    };

    setupOnlineOfflineDetection(handleOnline, handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <StatusContainer $isOnline={online}>
      {online ? '🟢 온라인' : '🔴 오프라인 모드'}
    </StatusContainer>
  );
};

export default OnlineStatus;
