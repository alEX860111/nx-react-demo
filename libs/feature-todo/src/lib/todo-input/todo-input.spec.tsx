import { TodoCreationData } from '@nx-react-demo/data-access-todo';
import { fireEvent, render } from '@testing-library/react';
import { TodoInput } from './todo-input';

describe(TodoInput, () => {
  it('should render successfully', () => {
    const handleTodoCreationRequested = jest.fn();
    const { baseElement } = render(
      <TodoInput onTodoCreationRequested={handleTodoCreationRequested} />
    );

    expect(baseElement).toBeTruthy();
  });

  it('should generate todo creation data on submit if input is not empty', () => {
    const handleTodoCreationRequested = jest.fn();

    const { getByTestId } = render(
      <TodoInput onTodoCreationRequested={handleTodoCreationRequested} />
    );

    const input = getByTestId('textfield').querySelector('input');

    if (input === null) {
      fail('input not found');
    }

    const value = 'hello world';
    fireEvent.change(input, { target: { value } });
    fireEvent.submit(input);

    expect(handleTodoCreationRequested).toHaveBeenCalled();

    const todoCreationData: TodoCreationData =
      handleTodoCreationRequested.mock.calls[0][0];
    expect(todoCreationData.content).toEqual(value);
  });

  it('should not generate todo creation data on submit if input is empty', () => {
    const handleTodoCreationRequested = jest.fn();

    const { getByTestId } = render(
      <TodoInput onTodoCreationRequested={handleTodoCreationRequested} />
    );

    const input = getByTestId('textfield').querySelector('input');

    if (input === null) {
      fail('input not found');
    }
    const value = '';
    fireEvent.change(input, { target: { value } });
    fireEvent.submit(input);

    expect(handleTodoCreationRequested).not.toHaveBeenCalled();
  });
});
