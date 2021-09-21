import { TodoMockService, TodoWidget } from '@nx-react-demo/feature-todo';
import { DIContext } from '@nx-react-demo/util-di';
import { container } from 'tsyringe';

container.register('foo', { useClass: TodoMockService });

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
