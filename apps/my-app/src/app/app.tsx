import CssBaseline from '@material-ui/core/CssBaseline';
import { todoDIRegistrations, TodoWidget } from '@nx-react-demo/feature-todo';
import { configureDIContainer, DIContext } from '@nx-react-demo/util-di';
import { container } from 'tsyringe';

configureDIContainer(todoDIRegistrations);

export function App() {
  return (
    <>
      <CssBaseline />
      <DIContext.Provider value={container}>
        <h1>Welcome to my todo app!</h1>
        <TodoWidget label="My todos"></TodoWidget>
      </DIContext.Provider>
    </>
  );
}

export default App;
