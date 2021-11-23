import { renderHook } from '@testing-library/react-hooks';
import { ProviderContext } from 'notistack';
import { TodoPageState } from '../todo-page-state';
import { TodoPageStateAction } from '../todo-page-state-action';
import { useCreateTodo } from './use-create-todo';

const snackbar = {} as jest.Mocked<ProviderContext>;

jest.mock('notistack', () => ({
  useSnackbar: () => snackbar,
}));

describe(useCreateTodo, () => {
  let fetchRef: typeof global.fetch;

  let fetchMock: jest.Mock;

  let state: TodoPageState;

  let dispatch: jest.Mock;

  beforeEach(() => {
    snackbar.enqueueSnackbar = jest.fn();
  });

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
          items: [],
          totalItems: 0,
          totalPages: 0,
        },
      },
      pageParams: {
        index: 0,
        size: 5,
      },
      refreshPage: 0,
      itemCreationData: { content: 'hello world', completed: false },
      filter: 'all',
    };

    dispatch = jest.fn();
  });

  it('should dispatch success action and enqueue success message if todo has been created', async () => {
    const response: Response = { status: 201 } as jest.Mocked<Response>;

    fetchMock.mockResolvedValue(response);

    const { waitFor } = renderHook(() => useCreateTodo(state, dispatch));

    await waitFor(() => dispatch.mock.calls.length === 1);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:3000/todos');
    expect(fetchMock.mock.calls[0][1]).toMatchObject({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.itemCreationData),
      signal: expect.any(AbortSignal),
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    const action: TodoPageStateAction = {
      type: 'ITEM_CREATION_SUCCESS',
    };
    expect(dispatch).toHaveBeenLastCalledWith(action);

    expect(snackbar.enqueueSnackbar).toHaveBeenCalledTimes(1);
    expect(snackbar.enqueueSnackbar).toHaveBeenCalledWith(
      'Successfully created todo.',
      { variant: 'success' }
    );
  });

  it('should dispatch error action and enqueue error message if todo could not be created', async () => {
    const response: Response = { status: 500 } as jest.Mocked<Response>;

    fetchMock.mockResolvedValue(response);

    const { waitFor } = renderHook(() => useCreateTodo(state, dispatch));

    await waitFor(() => snackbar.enqueueSnackbar.mock.calls.length === 1);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:3000/todos');
    expect(fetchMock.mock.calls[0][1]).toMatchObject({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.itemCreationData),
      signal: expect.any(AbortSignal),
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    const action: TodoPageStateAction = {
      type: 'ITEM_CREATION_ERROR',
    };
    expect(dispatch).toHaveBeenLastCalledWith(action);

    expect(snackbar.enqueueSnackbar).toHaveBeenCalledTimes(1);
    expect(snackbar.enqueueSnackbar).toHaveBeenCalledWith(
      'Failed to create todo.',
      { variant: 'error' }
    );
  });
});
