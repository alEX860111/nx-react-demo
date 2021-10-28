import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { TodoWidget } from '@nx-react-demo/feature-todo';
import { FeatureUser } from '@nx-react-demo/feature-user';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import styles from './app.module.scss';
import { Home } from './home';

export function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button
              className={styles.navItem}
              color="inherit"
              component={Link}
              to={'/'}
            >
              Home
            </Button>
            <Button
              className={styles.navItem}
              color="inherit"
              component={Link}
              to={'/users'}
            >
              Users
            </Button>
            <Button
              className={styles.navItem}
              color="inherit"
              component={Link}
              to={'/todos'}
            >
              Todos
            </Button>
          </Toolbar>
        </AppBar>
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
      </Router>
    </>
  );
}

export default App;
