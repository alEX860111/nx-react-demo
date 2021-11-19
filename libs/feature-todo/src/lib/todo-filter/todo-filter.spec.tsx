import { TodoPageStateAction } from '@nx-react-demo/data-access-todo';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { TodoDispatch } from '../todo-context';
import { TodoFilter } from './todo-filter';

describe(TodoFilter, () => {
  let dispatch: jest.Mock;

  let wrapper: React.ComponentType;

  beforeEach(() => {
    dispatch = jest.fn();
    wrapper = ({ children }) => (
      <TodoDispatch.Provider value={dispatch}>{children}</TodoDispatch.Provider>
    );
  });

  it('should render successfully', () => {
    const { baseElement } = render(<TodoFilter filter="all" />, { wrapper });

    expect(baseElement).toBeTruthy();
  });

  it('should render the filter all button in selected state if filter is empty', () => {
    const { getByText } = render(<TodoFilter filter="all" />, {
      wrapper,
    });

    const button = getByText('all');
    expect(button.classList.contains('Mui-selected')).toBe(true);
  });

  it('should render the filter completed button in selected state if filter has completed set to true', () => {
    const { getByText } = render(<TodoFilter filter={'completed'} />, {
      wrapper,
    });

    const button = getByText('completed');
    expect(button.classList.contains('Mui-selected')).toBe(true);
  });

  it('should render the filter open button in selected state if filter has completed set to false', () => {
    const { getByText } = render(<TodoFilter filter="open" />, {
      wrapper,
    });

    const button = getByText('open');
    expect(button.classList.contains('Mui-selected')).toBe(true);
  });

  it('should dispatch action on filter button click', () => {
    const { getByText } = render(<TodoFilter filter="all" />, {
      wrapper,
    });

    const button = getByText('completed');

    fireEvent.click(button);

    const action: TodoPageStateAction = {
      type: 'ITEM_FILTER_REQUESTED',
      filter: 'completed',
    };
    expect(dispatch).toHaveBeenCalledWith(action);
  });
});
