export const theme = {
  colors: {
    background: '#1a1a1a',
    cardBackground: '#2d3748',
    kanjiCardBackground: '#4a5568',
    primary: '#68d391',
    primaryHover: '#48bb78',
    text: '#ffffff',
    textSecondary: '#a0aec0',
    border: '#4a5568',
    hover: '#4a5568',
    selected: '#68d391',
    selectedBorder: '#48bb78',
    correct: '#68d391',
    incorrect: '#f56565'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px'
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem'
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem'
  },
  fontSize: {
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem'
  }
};

export type Theme = typeof theme;
