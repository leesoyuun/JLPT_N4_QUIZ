// Service Worker registration
export const registerSW = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  }
};

// PWA install prompt
let deferredPrompt: any;

export const setupPWAInstall = (): void => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show install button
    showInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    hideInstallButton();
  });
};

export const installPWA = async (): Promise<void> => {
  if (deferredPrompt) {
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // Clear the deferredPrompt variable
    deferredPrompt = null;
    hideInstallButton();
  }
};

const showInstallButton = (): void => {
  const installButton = document.getElementById('pwa-install-button');
  if (installButton) {
    installButton.style.display = 'block';
  }
};

const hideInstallButton = (): void => {
  const installButton = document.getElementById('pwa-install-button');
  if (installButton) {
    installButton.style.display = 'none';
  }
};

// Online/Offline detection
export const setupOnlineOfflineDetection = (
  onOnline: () => void,
  onOffline: () => void
): void => {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
};

export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Local storage for quiz data
export const saveQuizProgress = (progress: any): void => {
  try {
    localStorage.setItem('jlpt-quiz-progress', JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save quiz progress:', error);
  }
};

export const loadQuizProgress = (): any => {
  try {
    const progress = localStorage.getItem('jlpt-quiz-progress');
    return progress ? JSON.parse(progress) : null;
  } catch (error) {
    console.error('Failed to load quiz progress:', error);
    return null;
  }
};

export const saveWordData = (wordData: any[]): void => {
  try {
    localStorage.setItem('jlpt-word-data', JSON.stringify(wordData));
  } catch (error) {
    console.error('Failed to save word data:', error);
  }
};

export const loadWordData = (): any[] => {
  try {
    const wordData = localStorage.getItem('jlpt-word-data');
    return wordData ? JSON.parse(wordData) : [];
  } catch (error) {
    console.error('Failed to load word data:', error);
    return [];
  }
};
