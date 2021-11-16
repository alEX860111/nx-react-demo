import React from 'react';
import { ThemeModeContextValue } from './theme-mode-context-value';

export const ThemeModeContext = React.createContext<ThemeModeContextValue>({
  themeMode: 'dark',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setThemeMode: () => {},
});
