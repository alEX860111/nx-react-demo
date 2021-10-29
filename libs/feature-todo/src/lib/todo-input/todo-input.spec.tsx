import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { TodoInput } from './todo-input';

describe(TodoInput, () => {
  it('should render successfully', () => {
    const handleTodoCreated = jest.fn();

    const { baseElement } = render(
      <SnackbarProvider maxSnack={3}>
        <TodoInput onTodoCreated={handleTodoCreated} />
      </SnackbarProvider>
    );

    expect(baseElement).toBeTruthy();
  });
});
