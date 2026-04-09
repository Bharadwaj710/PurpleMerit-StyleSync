function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeHex(hex) {
  if (!hex || typeof hex !== 'string') {
    return '#000000';
  }

  const trimmed = hex.trim();
  if (!trimmed.startsWith('#')) {
    return '#000000';
  }

  if (trimmed.length === 4) {
    return `#${trimmed
      .slice(1)
      .split('')
      .map((char) => `${char}${char}`)
      .join('')}`.toLowerCase();
  }

  return trimmed.slice(0, 7).toLowerCase();
}

function hexToRgb(hex) {
  const normalized = normalizeHex(hex);
  const value = normalized.slice(1);

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((channel) => clamp(Math.round(channel), 0, 255).toString(16).padStart(2, '0'))
    .join('')}`;
}

function toLinear(channel) {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

export function getLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function getContrastRatio(foreground, background) {
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function isLightColor(hex) {
  return getLuminance(hex) > 0.72;
}

export function mixColors(first, second, amount = 0.5) {
  const weight = clamp(amount, 0, 1);
  const a = hexToRgb(first);
  const b = hexToRgb(second);

  return rgbToHex({
    r: a.r + (b.r - a.r) * weight,
    g: a.g + (b.g - a.g) * weight,
    b: a.b + (b.b - a.b) * weight,
  });
}

export function withAlpha(hex, alpha = 1) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

export function getReadableTextColor(background, preferredLight = '#ffffff', preferredDark = '#0f172a') {
  const lightContrast = getContrastRatio(preferredLight, background);
  const darkContrast = getContrastRatio(preferredDark, background);
  return lightContrast >= darkContrast ? preferredLight : preferredDark;
}

export function ensureSurfaceSeparation(surface, background, text) {
  const contrast = getContrastRatio(surface, background);
  if (contrast >= 1.12) {
    return surface;
  }

  return isLightColor(surface) ? mixColors(surface, text, 0.06) : mixColors(surface, '#ffffff', 0.08);
}

export function enhanceAccentForPreview(color, nearbySurface, text) {
  const contrast = getContrastRatio(color, nearbySurface);
  if (contrast >= 1.35) {
    return color;
  }

  return isLightColor(color) ? mixColors(color, text, 0.18) : mixColors(color, '#ffffff', 0.14);
}
