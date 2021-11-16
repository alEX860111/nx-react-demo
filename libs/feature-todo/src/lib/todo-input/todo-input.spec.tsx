import { TodoPageStateAction } from '@nx-react-demo/data-access-todo';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { TodoDispatch } from '../todo-context';
import { TodoInput } from './todo-input';

describe(TodoInput, () => {
  const label = 'What needs to be done?';

  let dispatch: jest.Mock;

  let wrapper: React.ComponentType;

  beforeEach(() => {
    dispatch = jest.fn();
    wrapper = ({ children }) => (
      <TodoDispatch.Provider value={dispatch}>{children}</TodoDispatch.Provider>
    );
  });

  it('should render successfully', () => {
    const { baseElement } = render(<TodoInput />, { wrapper });

    expect(baseElement).toBeTruthy();
  });

  describe('submit', () => {
    it('should clear the input on submit', () => {
      const { getByLabelText } = render(<TodoInput />, { wrapper });

      const input = getByLabelText(label) as HTMLInputElement;

      const value = 'hello world';
      fireEvent.change(input, { target: { value } });
      fireEvent.submit(input);

      expect(input.value).toEqual('');
    });

    it('should dispatch action on submit if input is not empty', () => {
      const { getByLabelText } = render(<TodoInput />, { wrapper });

      const input = getByLabelText(label);

      const value = 'hello world';
      fireEvent.change(input, { target: { value } });
      fireEvent.submit(input);

      expect(dispatch).toHaveBeenCalled();

      const action: TodoPageStateAction = dispatch.mock.calls[0][0];

      const expectedAction: TodoPageStateAction = {
        type: 'ITEM_CREATION_REQUESTED',
        itemCreationData: { content: value, completed: false },
      };

      expect(action).toEqual(expectedAction);
    });

    it('should not dispatch action on submit if input is empty', () => {
      const { getByLabelText } = render(<TodoInput />, { wrapper });

      const input = getByLabelText(label);

      const value = '';
      fireEvent.change(input, { target: { value } });
      fireEvent.submit(input);

      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});
