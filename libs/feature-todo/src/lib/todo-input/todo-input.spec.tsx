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

  it('should generate todo creation data on submit if input is not empty', () => {
    const handleTodoCreationData = jest.fn();

    const { getByTestId } = render(
      <TodoInput handleTodoCreationData={handleTodoCreationData} />
    );

    const input = getByTestId('textfield').querySelector('input');

    if (input === null) {
      fail('input not found');
    }

    const value = 'hello world';
    fireEvent.change(input, { target: { value } });
    fireEvent.submit(input);

    expect(handleTodoCreationData).toHaveBeenCalled();

    const todoCreationData: TodoCreationData =
      handleTodoCreationData.mock.calls[0][0];
    expect(todoCreationData.content).toEqual(value);
  });

  it('should not generate todo creation data on submit if input is empty', () => {
    const handleTodoCreationData = jest.fn();

    const { getByTestId } = render(
      <TodoInput handleTodoCreationData={handleTodoCreationData} />
    );

    const input = getByTestId('textfield').querySelector('input');

    if (input === null) {
      fail('input not found');
    }
    const value = '';
    fireEvent.change(input, { target: { value } });
    fireEvent.submit(input);

    expect(handleTodoCreationData).not.toHaveBeenCalled();
  });
});
