import { Todo, TodoPageStateAction } from '@nx-react-demo/data-access-todo';
import { fireEvent, render } from '@testing-library/react';
import { TodoDispatch } from '../todo-context';
import { TodoListItem } from './todo-list-item';

describe(TodoListItem, () => {
  let dispatch: jest.Mock;

  let wrapper: React.ComponentType;

  let todo: Todo;

  beforeEach(() => {
    dispatch = jest.fn();
    wrapper = ({ children }) => (
      <TodoDispatch.Provider value={dispatch}>{children}</TodoDispatch.Provider>
    );
  });

  beforeEach(() => {
    todo = { id: 1, content: 'hello world', completed: false };
  });

  it('should render successfully', () => {
    const { baseElement } = render(<TodoListItem todo={todo} filter="all" />, {
      wrapper,
    });

    expect(baseElement).toBeTruthy();
  });

  it('should render the todo content', () => {
    const { getByText } = render(<TodoListItem todo={todo} filter="all" />, {
      wrapper,
    });

    expect(getByText(todo.content)).toBeTruthy();
  });

  it('should dispatch action on delete button click', () => {
    const { getByTestId } = render(<TodoListItem todo={todo} filter="all" />, {
      wrapper,
    });

    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);

    const action: TodoPageStateAction = {
      type: 'ITEM_DELETION_REQUESTED',
      itemIdToDelete: todo.id,
    };
    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch action and set checkbox state on checkbox click', () => {
    const { getByTestId } = render(<TodoListItem todo={todo} filter="all" />, {
      wrapper,
    });

    const toggleCompleteCheckbox = getByTestId(
      'toggle-complete-checkbox'
    ).querySelector('input');

    if (toggleCompleteCheckbox === null) {
      fail();
    }

    expect(toggleCompleteCheckbox.checked).toBe(false);

    fireEvent.click(toggleCompleteCheckbox);

    expect(toggleCompleteCheckbox.checked).toBe(true);

    const action: TodoPageStateAction = {
      type: 'ITEM_UPDATE_REQUESTED',
      itemUpdateData: {
        ...todo,
        completed: true,
      },
      refreshPage: false,
    };
    expect(dispatch).toHaveBeenCalledWith(action);
  });
});
