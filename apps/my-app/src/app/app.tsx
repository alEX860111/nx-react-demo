import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { TodoWidget } from '@nx-react-demo/feature-todo';
import { FeatureUser } from '@nx-react-demo/feature-user';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import styles from './app.module.scss';

export function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Link className={styles.navItem} to="/">
              Home
            </Link>
            <Link className={styles.navItem} to="/users">
              Users
            </Link>
            <Link className={styles.navItem} to="/todos">
              Todos
            </Link>
          </Toolbar>
        </AppBar>
        <div className={styles.content}>
          <Switch>
            <Route path="/users">
              <FeatureUser />
            </Route>
            <Route path="/todos">
              <TodoWidget label="My todos"></TodoWidget>
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

function Home() {
  return <h2>Home</h2>;
}
