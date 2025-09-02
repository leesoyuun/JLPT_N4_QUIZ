import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { installPWA } from '../utils/pwa';

const InstallButton = styled.button`
  display: none;
  position: fixed;
  bottom: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.background};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.fontSize.sm};
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  z-index: 1000;

  &:hover {
    background-color: ${theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    bottom: ${theme.spacing.md};
    right: ${theme.spacing.md};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: ${theme.fontSize.sm};
  }
`;

const PWAInstallButton: React.FC = () => {
  const handleInstall = () => {
    installPWA();
  };

  return (
    <InstallButton id="pwa-install-button" onClick={handleInstall}>
      📱 앱 설치
    </InstallButton>
  );
};

export default PWAInstallButton;
