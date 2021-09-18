import { fireEvent, render } from '@testing-library/react';
import { Todo } from '../todo';
import { TodoInput } from './todo-input';

describe(TodoInput, () => {
  it('should render successfully', () => {
    const handleTodo = jest.fn();

    const { baseElement } = render(<TodoInput handleTodo={handleTodo} />);

    expect(baseElement).toBeTruthy();
  });

  it('should generate a new todo on submit if input is not empty', () => {
    const handleTodo = jest.fn();

    const { getByPlaceholderText } = render(
      <TodoInput handleTodo={handleTodo} />
    );

    const input = getByPlaceholderText('enter todo');

    const value = 'hello world';
    fireEvent.change(input, { target: { value } });
    fireEvent.submit(input);

    expect(handleTodo).toHaveBeenCalled();

    const generatedTodo: Todo = handleTodo.mock.calls[0][0];
    expect(generatedTodo.content).toEqual(value);
    expect(generatedTodo.id).not.toBeNaN();
  });

  it('should not generate a new todo on submit if input is empty', () => {
    const handleTodo = jest.fn();

    const { getByPlaceholderText } = render(
      <TodoInput handleTodo={handleTodo} />
    );

    const input = getByPlaceholderText('enter todo');

    const value = '';
    fireEvent.change(input, { target: { value } });
    fireEvent.submit(input);

    expect(handleTodo).not.toHaveBeenCalled();
  });
});
