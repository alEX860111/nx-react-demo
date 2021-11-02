import { PageState } from '@nx-react-demo/util-data-access';
import { act, renderHook } from '@testing-library/react-hooks';
import { Todo } from './todo';
import { useGetTodoPage } from './use-get-todo-page';

describe(useGetTodoPage, () => {
  let fetchRef: typeof global.fetch;

  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchRef = global.fetch;
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    global.fetch = fetchRef;
  });

  describe('', () => {
    let todos: Todo[];

    beforeEach(() => {
      const headers = new Headers();
      headers.set('X-Total-Count', '10');
      const response: Response = { headers } as jest.Mocked<Response>;

      todos = [{ id: '1', content: 'foo' }];
      response.json = jest.fn().mockResolvedValue(todos);

      fetchMock.mockResolvedValue(response);
    });

    it('should provide page and page params in loading state', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useGetTodoPage());

      const [state] = result.current;

      const expectedState: PageState<Todo> = {
        loadablePage: {
          isLoading: true,
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
      };
      expect(state).toEqual(expectedState);

      await waitForNextUpdate();

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('should provide page and page params in loaded state', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useGetTodoPage());

      await waitForNextUpdate();

      const [state] = result.current;
      const expectedState: PageState<Todo> = {
        loadablePage: {
          isLoading: false,
          data: {
            items: todos,
            totalItems: 10,
            totalPages: 2,
          },
        },
        pageParams: {
          index: 0,
          size: 5,
        },
      };
      expect(state).toEqual(expectedState);

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('should fetch the data on page index change', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useGetTodoPage());
      const [_state, setPageIndex] = result.current;

      act(() => {
        setPageIndex(1);
      });

      await waitForNextUpdate();
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('should fetch the data on page size change', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useGetTodoPage());
      const [_state, _setPageIndex, setPageSize] = result.current;

      act(() => {
        setPageSize(10);
      });

      await waitForNextUpdate();
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });
  });
});
