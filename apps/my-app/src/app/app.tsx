import { PaletteMode, ThemeProvider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { TodoWidget } from '@nx-react-demo/feature-todo';
import { FeatureUser } from '@nx-react-demo/feature-user';
import {
  NavigationButton,
  ThemeModeContext,
  ThemeModeSwitcher,
} from '@nx-react-demo/ui-application';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';
import { Home } from './home';

export function App() {
  const [themeMode, setThemeMode] = useState<PaletteMode>('dark');

  const theme = createTheme({ palette: { mode: themeMode } });

  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppBar position="static">
            <Toolbar className={styles.toolbar}>
              <div>
                <NavigationButton
                  to="/"
                  label="Home"
                  highlightActive={true}
                  color="inherit"
                />
                <NavigationButton
                  to="/users"
                  label="Users"
                  highlightActive={true}
                  color="inherit"
                />
                <NavigationButton
                  to="/todos"
                  label="Todos"
                  highlightActive={true}
                  color="inherit"
                />
              </div>
              <ThemeModeSwitcher />
            </Toolbar>
          </AppBar>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6} lg={5}>
              <div className={styles.content}>
                <Routes>
                  <Route path="/users" element={<FeatureUser />} />
                  <Route path="/todos" element={<TodoWidget />} />
                  <Route path="/" element={<Home />} />
                </Routes>
              </div>
            </Grid>
          </Grid>
        </Router>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
