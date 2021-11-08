import { renderHook } from '@testing-library/react-hooks';
import { SnackbarProvider } from 'notistack';
import { ReactChildren } from 'react';
import { TodoPageState } from './todo-page-state';
import { TodoPageStateAction } from './todo-page-state-action';
import { useDeleteTodo } from './use-delete-todo';

describe(useDeleteTodo, () => {
  const wrapper = (props: { children: ReactChildren }) => (
    <SnackbarProvider>{props.children}</SnackbarProvider>
  );

  let fetchRef: typeof global.fetch;

  let fetchMock: jest.Mock;

  let state: TodoPageState;

  let dispatch: jest.Mock;

  beforeEach(() => {
    fetchRef = global.fetch;
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    global.fetch = fetchRef;
  });

  beforeEach(() => {
    state = {
      loadablePage: {
        isLoading: false,
        data: {
          items: [{ id: 1, content: 'hello world', completed: false }],
          totalItems: 1,
          totalPages: 1,
        },
      },
      pageParams: {
        index: 0,
        size: 5,
      },
      refreshPage: 0,
      itemIdToDelete: 1,
    };

    dispatch = jest.fn();
  });

  it('should dispatch success action if todo has been deleted', async () => {
    const response: Response = {
      status: 200,
    } as jest.Mocked<Response>;

    fetchMock.mockResolvedValue(response);

    const { waitFor } = renderHook(() => useDeleteTodo(state, dispatch), {
      wrapper,
    });

    await waitFor(() => dispatch.mock.calls.length === 1);

    expect(fetchMock).toHaveBeenCalled();

    const action: TodoPageStateAction = {
      type: 'ITEM_DELETION_SUCCESS',
    };
    expect(dispatch).toHaveBeenLastCalledWith(action);

    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch error action if todo could not be deleted', async () => {
    const response: Response = {
      status: 500,
    } as jest.Mocked<Response>;

    fetchMock.mockResolvedValue(response);

    const { waitFor } = renderHook(() => useDeleteTodo(state, dispatch), {
      wrapper,
    });

    await waitFor(() => dispatch.mock.calls.length === 1);

    expect(fetchMock).toHaveBeenCalled();

    const action: TodoPageStateAction = {
      type: 'ITEM_DELETION_ERROR',
    };
    expect(dispatch).toHaveBeenLastCalledWith(action);

    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
