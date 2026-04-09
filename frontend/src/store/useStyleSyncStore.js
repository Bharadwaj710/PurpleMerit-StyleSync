import { create } from 'zustand';
import { defaultTokens, themePresets } from '../lib/defaults.js';

function deepMerge(target, updates) {
  return {
    ...target,
    ...updates,
    colors: { ...target.colors, ...updates.colors },
    typography: {
      ...target.typography,
      ...updates.typography,
      headingScale: {
        ...target.typography.headingScale,
        ...updates.typography?.headingScale,
      },
    },
    spacing: {
      ...target.spacing,
      ...updates.spacing,
    },
    metadata: {
      ...target.metadata,
      ...updates.metadata,
    },
  };
}

export const useStyleSyncStore = create((set, get) => ({
  currentView: 'home',
  url: '',
  isLoading: false,
  error: '',
  saveStatus: 'idle',
  scrapeStatus: 'idle',
  scrapeWarnings: [],
  site: null,
  tokenSetId: null,
  activePreset: 'source',
  scrapedTokens: defaultTokens,
  editedTokens: defaultTokens,
  lockedTokens: {},
  comparisonEnabled: true,
  activeExport: 'json',

  setUrl: (url) => set({ url }),
  goToDashboard: () => set({ currentView: 'dashboard' }),
  goToHome: () => set({ currentView: 'home' }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSaveStatus: (saveStatus) => set({ saveStatus }),
  setScrapeSession: ({ site, tokenSet, warnings = [], locks = [], status }) =>
    set({
      site,
      tokenSetId: tokenSet.id,
      scrapeWarnings: warnings,
      scrapeStatus: status || site?.status || 'success',
      scrapedTokens: tokenSet,
      editedTokens: tokenSet,
      lockedTokens: Object.fromEntries(
        locks.filter((lock) => lock.isLocked).map((lock) => [lock.tokenKey, true]),
      ),
      currentView: 'dashboard',
      error: '',
      saveStatus: 'saved',
      activePreset: 'source',
    }),
  resetSectionToSaved: (section) =>
    set((state) => {
      if (!state.scrapedTokens?.[section]) {
        return state;
      }

      if (section === 'typography') {
        return {
          editedTokens: {
            ...state.editedTokens,
            typography: {
              ...state.scrapedTokens.typography,
              headingScale: {
                ...state.scrapedTokens.typography.headingScale,
              },
            },
          },
          saveStatus: 'dirty',
          activePreset: 'source',
        };
      }

      if (section === 'spacing') {
        return {
          editedTokens: {
            ...state.editedTokens,
            spacing: {
              ...state.scrapedTokens.spacing,
              scale: [...state.scrapedTokens.spacing.scale],
            },
          },
          saveStatus: 'dirty',
          activePreset: 'source',
        };
      }

      return {
        editedTokens: {
          ...state.editedTokens,
          [section]: { ...state.scrapedTokens[section] },
        },
        saveStatus: 'dirty',
        activePreset: 'source',
      };
    }),
  updateTokens: (section, key, value) =>
    set((state) => {
      const tokenPath = `${section}.${key}`;
      if (state.lockedTokens[tokenPath]) return state;

      return {
        editedTokens: {
          ...state.editedTokens,
          [section]: {
            ...state.editedTokens[section],
            [key]: value,
          },
        },
        saveStatus: 'dirty',
      };
    }),
  updateHeadingScale: (key, value) =>
    set((state) => {
      const tokenPath = `typography.headingScale.${key}`;
      if (state.lockedTokens[tokenPath]) return state;

      return {
        editedTokens: {
          ...state.editedTokens,
          typography: {
            ...state.editedTokens.typography,
            headingScale: {
              ...state.editedTokens.typography.headingScale,
              [key]: value,
            },
          },
        },
        saveStatus: 'dirty',
      };
    }),
  updateSpacingScale: (index, value) =>
    set((state) => {
      const tokenPath = `spacing.scale.${index}`;
      if (state.lockedTokens[tokenPath]) return state;

      const scale = [...state.editedTokens.spacing.scale];
      scale[index] = Number(value);

      return {
        editedTokens: {
          ...state.editedTokens,
          spacing: {
            ...state.editedTokens.spacing,
            scale,
          },
        },
        saveStatus: 'dirty',
      };
    }),
  toggleLock: (tokenKey) =>
    set((state) => ({
      lockedTokens: {
        ...state.lockedTokens,
        [tokenKey]: !state.lockedTokens[tokenKey],
      },
    })),
  setLockState: (tokenKey, isLocked) =>
    set((state) => ({
      lockedTokens: {
        ...state.lockedTokens,
        [tokenKey]: isLocked,
      },
    })),
  markSaved: (tokenSet) =>
    set({
      scrapedTokens: tokenSet,
      editedTokens: tokenSet,
      saveStatus: 'saved',
    }),
  applyPreset: (presetKey) => {
    const preset = themePresets[presetKey];
    if (!preset) return;

    const { editedTokens } = get();
    set({
      editedTokens: deepMerge(editedTokens, preset),
      saveStatus: 'dirty',
      activePreset: presetKey,
    });
  },
  resetToScraped: () =>
    set((state) => ({
      editedTokens: state.scrapedTokens,
      lockedTokens: {},
      saveStatus: 'dirty',
      activePreset: 'source',
    })),
  setActiveExport: (activeExport) => set({ activeExport }),
  setComparisonEnabled: (comparisonEnabled) => set({ comparisonEnabled }),
}));
