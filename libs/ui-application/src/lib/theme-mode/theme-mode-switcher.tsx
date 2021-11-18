import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useContext } from 'react';
import { ThemeModeContext } from './theme-mode-context';

export function ThemeModeSwitcher() {
  const { themeMode, setThemeMode } = useContext(ThemeModeContext);

  const toggleThemeMode = () =>
    setThemeMode((themeMode) => (themeMode === 'dark' ? 'light' : 'dark'));

  const tooltip = themeMode === 'dark' ? 'light mode' : 'dark mode';

  const icon = themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />;

  return (
    <Tooltip title={tooltip}>
      <IconButton color="inherit" onClick={toggleThemeMode}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
