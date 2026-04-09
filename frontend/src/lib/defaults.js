export const defaultTokens = {
  colors: {
    primary: '#2563eb',
    secondary: '#14b8a6',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
    muted: '#64748b',
  },
  typography: {
    fontFamily: "'Manrope', sans-serif",
    baseSize: '16px',
    headingScale: {
      h1: '3rem',
      h2: '2.25rem',
      h3: '1.5rem',
    },
    lineHeight: 1.5,
  },
  spacing: {
    baseUnit: 4,
    scale: [4, 8, 12, 16, 24, 32, 48],
  },
  metadata: {
    personality: 'Minimal',
    sourceUrl: '',
    extractionMode: 'manual',
  },
};

export const themePresets = {
  dark: {
    colors: {
      primary: '#60a5fa',
      secondary: '#2dd4bf',
      background: '#020617',
      surface: '#0f172a',
      text: '#e2e8f0',
      muted: '#94a3b8',
    },
  },
  pastel: {
    colors: {
      primary: '#f472b6',
      secondary: '#38bdf8',
      background: '#fdf2f8',
      surface: '#ffffff',
      text: '#3f3f46',
      muted: '#71717a',
    },
  },
  contrast: {
    colors: {
      primary: '#000000',
      secondary: '#f59e0b',
      background: '#ffffff',
      surface: '#f3f4f6',
      text: '#111827',
      muted: '#4b5563',
    },
  },
};
