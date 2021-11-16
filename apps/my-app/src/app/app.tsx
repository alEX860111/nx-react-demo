import { PaletteMode, ThemeProvider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { TodoWidget } from '@nx-react-demo/feature-todo';
import { FeatureUser } from '@nx-react-demo/feature-user';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import styles from './app.module.scss';
import { Home } from './home';
import { ThemeModeContext } from './theme-mode-context';
import { ThemeModeSwitcher } from './theme-mode-switcher';

export function App() {
  const [themeMode, setThemeMode] = useState<PaletteMode>('dark');
  const theme = createTheme({ palette: { mode: themeMode } });
  const themeActiveClassName =
    themeMode === 'dark' ? styles.activeDarkMode : styles.activeLightMode;

  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppBar position="static">
            <Toolbar className={styles.toolbar}>
              <div>
                <Button
                  color="inherit"
                  component={NavLink}
                  activeClassName={themeActiveClassName}
                  exact
                  to={'/'}
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  component={NavLink}
                  activeClassName={themeActiveClassName}
                  exact
                  to={'/users'}
                >
                  Users
                </Button>
                <Button
                  color="inherit"
                  component={NavLink}
                  activeClassName={themeActiveClassName}
                  exact
                  to={'/todos'}
                >
                  Todos
                </Button>
              </div>
              <ThemeModeSwitcher />
            </Toolbar>
          </AppBar>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6} lg={5}>
              <div className={styles.content}>
                <Switch>
                  <Route path="/users">
                    <FeatureUser />
                  </Route>
                  <Route path="/todos">
                    <TodoWidget />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
            </Grid>
          </Grid>
        </Router>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
