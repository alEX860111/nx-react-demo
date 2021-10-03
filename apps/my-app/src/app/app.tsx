import CssBaseline from '@mui/material/CssBaseline';
import { todoDIRegistrations, TodoWidget } from '@nx-react-demo/feature-todo';
import { configureDIContainer, DIContext } from '@nx-react-demo/util-di';
import { container } from 'tsyringe';
import styles from './app.module.scss';

configureDIContainer(todoDIRegistrations);

export function App() {
  return (
    <>
      <CssBaseline />
      <DIContext.Provider value={container}>
        <div className={styles.content}>
          <h1>Welcome to my todo app!</h1>
          <TodoWidget label="My todos"></TodoWidget>
        </div>
      </DIContext.Provider>
    </>
  );
}

export default App;
