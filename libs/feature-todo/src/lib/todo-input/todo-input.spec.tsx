import { fireEvent, render } from '@testing-library/react';
import { TodoCreationData } from '../todo-creation-data';
import { TodoInput } from './todo-input';

describe(TodoInput, () => {
  it('should render successfully', () => {
    const handleTodoCreationData = jest.fn();

    const { baseElement } = render(
      <TodoInput handleTodoCreationData={handleTodoCreationData} />
    );

    expect(baseElement).toBeTruthy();
  });

  it('should generate a new todo on submit if input is not empty', () => {
    const handleTodoCreationData = jest.fn();

    const { getByPlaceholderText } = render(
      <TodoInput handleTodoCreationData={handleTodoCreationData} />
    );

    const input = getByPlaceholderText('enter todo');

    const value = 'hello world';
    fireEvent.change(input, { target: { value } });
    fireEvent.submit(input);

    expect(handleTodoCreationData).toHaveBeenCalled();

    const todoCreationData: TodoCreationData =
      handleTodoCreationData.mock.calls[0][0];
    expect(todoCreationData.content).toEqual(value);
  });

  it('should not generate a new todo on submit if input is empty', () => {
    const handleTodoCreationData = jest.fn();

    const { getByPlaceholderText } = render(
      <TodoInput handleTodoCreationData={handleTodoCreationData} />
    );

    const input = getByPlaceholderText('enter todo');

    const value = '';
    fireEvent.change(input, { target: { value } });
    fireEvent.submit(input);

    expect(handleTodoCreationData).not.toHaveBeenCalled();
  });
});
