import { todoDIRegistrations, TodoWidget } from '@nx-react-demo/feature-todo';
import { configureDIContainer, DIContext } from '@nx-react-demo/util-di';
import { container } from 'tsyringe';

configureDIContainer(todoDIRegistrations);

export function App() {
  return (
    <DIContext.Provider value={container}>
      <div className="container-fluid">
        <h1>Welcome to my todo app!</h1>
        <TodoWidget label="My todos"></TodoWidget>
      </div>
    </DIContext.Provider>
  );
}

export default App;
