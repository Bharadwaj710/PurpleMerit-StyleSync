const defaultScale = [4, 8, 12, 16, 24, 32, 48];

function rgbToHex(input) {
  if (!input) return null;
  if (input.startsWith('#')) return input;

  const matches = input.match(/\d+/g);
  if (!matches || matches.length < 3) return null;

  return `#${matches
    .slice(0, 3)
    .map((value) => Number(value).toString(16).padStart(2, '0'))
    .join('')}`;
}

function pickMostFrequent(values, fallback) {
  const counts = new Map();

  for (const value of values) {
    const key = value?.trim();
    if (!key) continue;
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] || fallback;
}

export function createBaseTokens({ url, colors = [], imagePalette = null, globalBg = null, fonts = [], fontSizes = [], spacingValues = [] }) {
  const normalizedColors = colors.map(rgbToHex).filter(Boolean);
  const primary = imagePalette?.vibrant || pickMostFrequent(normalizedColors, '#2563eb');
  const text = normalizedColors.find((value) => value !== primary) || '#0f172a';
  
  const extractedBg = globalBg ? rgbToHex(globalBg) : null;
  const background = extractedBg || normalizedColors.find((value) => value.toLowerCase() === '#ffffff') || pickMostFrequent(normalizedColors, '#f8fafc');
  
  const secondary = imagePalette?.darkVibrant || normalizedColors.find((value) => value !== primary && value !== text && value !== background) || '#14b8a6';
  const fontFamily = pickMostFrequent(fonts, "'Manrope', sans-serif");
  const baseSize = pickMostFrequent(fontSizes, '16px');
  const baseUnit = pickMostFrequent(spacingValues.map(String), '4');

  return {
    colors: {
      primary,
      secondary,
      background,
      surface: '#ffffff',
      text,
      muted: '#64748b',
    },
    typography: {
      fontFamily,
      baseSize,
      headingScale: {
        h1: '3rem',
        h2: '2.25rem',
        h3: '1.5rem',
      },
      lineHeight: 1.5,
    },
    spacing: {
      baseUnit: Number(baseUnit) || 4,
      scale: spacingValues.length ? [...new Set(spacingValues)].sort((a, b) => a - b).slice(0, 7) : defaultScale,
    },
    metadata: {
      personality: 'Corporate',
      sourceUrl: url,
      extractionMode: 'scraped',
    },
  };
}

export function buildFallbackTokens(url) {
  return {
    colors: {
      primary: '#1d4ed8',
      secondary: '#0f766e',
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
      scale: defaultScale,
    },
    metadata: {
      personality: 'Minimal',
      sourceUrl: url,
      extractionMode: 'fallback',
    },
  };
}

export function classifyPersonality(tokens) {
  const { colors, typography } = tokens;
  const vibrantPrimary = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6'].includes(
    colors.primary.toLowerCase(),
  );
  const serifLike = /georgia|times|garamond|serif/i.test(typography.fontFamily);

  if (vibrantPrimary && !serifLike) return 'Playful';
  if (serifLike) return 'Corporate';
  if (Number.parseFloat(typography.headingScale.h1) >= 3) return 'Bold';
  return 'Minimal';
}
