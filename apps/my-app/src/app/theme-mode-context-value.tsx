import { PaletteMode } from '@mui/material';
import React from 'react';

export interface ThemeModeContextValue {
  themeMode: PaletteMode;
  setThemeMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
}
