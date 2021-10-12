import { TodoCreationData } from '@nx-react-demo/data-access-todo';
import { fireEvent, render } from '@testing-library/react';
import { TodoInput } from './todo-input';

describe(TodoInput, () => {
  it('should render successfully', () => {
    const handleCreateTodo = jest.fn();

    const { baseElement } = render(
      <TodoInput onCreateTodo={handleCreateTodo} />
    );

    expect(baseElement).toBeTruthy();
  });

  it('should generate todo creation data on submit if input is not empty', () => {
    const handleCreateTodo = jest.fn();

    const { getByTestId } = render(
      <TodoInput onCreateTodo={handleCreateTodo} />
    );

    const input = getByTestId('textfield').querySelector('input');

    if (input === null) {
      fail('input not found');
    }

    const value = 'hello world';
    fireEvent.change(input, { target: { value } });
    fireEvent.submit(input);

    expect(handleCreateTodo).toHaveBeenCalled();

    const todoCreationData: TodoCreationData =
      handleCreateTodo.mock.calls[0][0];
    expect(todoCreationData.content).toEqual(value);
  });

  it('should not generate todo creation data on submit if input is empty', () => {
    const handleCreateTodo = jest.fn();

    const { getByTestId } = render(
      <TodoInput onCreateTodo={handleCreateTodo} />
    );

    const input = getByTestId('textfield').querySelector('input');

    if (input === null) {
      fail('input not found');
    }
    const value = '';
    fireEvent.change(input, { target: { value } });
    fireEvent.submit(input);

    expect(handleCreateTodo).not.toHaveBeenCalled();
  });
});
