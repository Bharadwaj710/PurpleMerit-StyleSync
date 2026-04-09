export function exportJson(tokens) {
  return JSON.stringify(tokens, null, 2);
}

export function exportCssVariables(tokens) {
  return `:root {
  --color-primary: ${tokens.colors.primary};
  --color-secondary: ${tokens.colors.secondary};
  --color-background: ${tokens.colors.background};
  --color-surface: ${tokens.colors.surface};
  --color-text: ${tokens.colors.text};
  --spacing-base: ${tokens.spacing.baseUnit}px;
  --spacing-md: ${tokens.spacing.scale[3] ?? tokens.spacing.baseUnit * 4}px;
  --font-family-base: ${tokens.typography.fontFamily};
  --font-size-base: ${tokens.typography.baseSize};
}`;
}

export function exportTailwindConfig(tokens) {
  return `export default {
  theme: {
    extend: {
      colors: {
        primary: '${tokens.colors.primary}',
        secondary: '${tokens.colors.secondary}',
        background: '${tokens.colors.background}',
        surface: '${tokens.colors.surface}',
        text: '${tokens.colors.text}',
      },
      fontFamily: {
        sans: [${tokens.typography.fontFamily}],
      },
      spacing: {
        base: '${tokens.spacing.baseUnit}px',
        md: '${tokens.spacing.scale[3] ?? tokens.spacing.baseUnit * 4}px',
      },
    },
  },
};`;
}
