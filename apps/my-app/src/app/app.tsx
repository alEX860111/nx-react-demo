import {
  TodoMockService,
  TodoService,
  TodoWidget,
} from '@nx-react-demo/feature-todo';
import { DIContext } from '@nx-react-demo/util-di';
import { Container } from 'inversify';

const myContainer = new Container();
myContainer.bind<TodoService>('foo').to(TodoMockService);

export function App() {
  return (
    <DIContext.Provider value={myContainer}>
      <div className="container-fluid">
        <h1>Welcome to my todo app!</h1>
        <TodoWidget label="My todos"></TodoWidget>
      </div>
    </DIContext.Provider>
  );
}

export default App;
