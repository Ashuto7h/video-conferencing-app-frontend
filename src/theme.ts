// dynamic theme object
export const THEMES = {
  light: { btnDisabledColor: '#a6a6a6', btnPrimaryColor: '#076EE8' }
} as const;

// global theme object
export const globalTheme = {
  fontFamily: 'sans-serif',
  greyColor: '#555555'
} as const;

export type TTheme = typeof THEMES.light;
