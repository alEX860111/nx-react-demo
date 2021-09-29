import { todoDIRegistrations, TodoWidget } from '@nx-react-demo/feature-todo';
import { DIContext } from '@nx-react-demo/util-di';
import { container } from 'tsyringe';

todoDIRegistrations.forEach((diRegistration) => {
  if (container.isRegistered(diRegistration.token)) {
    throw new Error(
      `duplicate DI registration found: '${diRegistration.token.toString()}'`
    );
  }
  container.register(diRegistration.token, diRegistration.provider);
});

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
