import { TodoWidget } from './todo/todo-widget/todo-widget';

export function App() {
  return (
    <div className="container-fluid">
      <h1>Welcome to my todo app!</h1>
      <TodoWidget></TodoWidget>
    </div>
  );
}

export default App;
