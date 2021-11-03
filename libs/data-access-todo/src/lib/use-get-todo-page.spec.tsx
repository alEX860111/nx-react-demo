import { Loadable, Page, PageParams } from '@nx-react-demo/util-data-access';
import { act, renderHook } from '@testing-library/react-hooks';
import { SnackbarProvider } from 'notistack';
import React, { ReactChildren } from 'react';
import { Todo } from './todo';
import { useGetTodoPage } from './use-get-todo-page';

describe(useGetTodoPage, () => {
  let fetchRef: typeof global.fetch;

  let fetchMock: jest.Mock;

  const wrapper = (props: { children: ReactChildren }) => (
    <SnackbarProvider maxSnack={3}>{props.children}</SnackbarProvider>
  );

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
      const response: Response = {
        headers,
        status: 200,
      } as jest.Mocked<Response>;

      todos = [{ id: '1', content: 'foo', completed: false }];
      response.json = jest.fn().mockResolvedValue(todos);

      fetchMock.mockResolvedValue(response);
    });

    it('should provide page and page params in loading state', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useGetTodoPage(), {
        wrapper,
      });

      const [loadablePage, pageParams] = result.current;

      const expectedLoadablePage: Loadable<Page<Todo>> = {
        isLoading: true,
        data: {
          items: [],
          totalItems: 0,
          totalPages: 0,
        },
      };
      expect(loadablePage).toEqual(expectedLoadablePage);

      const expectedPageParams: PageParams = {
        index: 0,
        size: 5,
      };
      expect(pageParams).toEqual(expectedPageParams);

      await waitForNextUpdate();

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('should provide page and page params in loaded state', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useGetTodoPage(), {
        wrapper,
      });

      await waitForNextUpdate();

      const [loadablePage, pageParams] = result.current;
      const expectedLoadablePage: Loadable<Page<Todo>> = {
        isLoading: false,
        data: {
          items: todos,
          totalItems: 10,
          totalPages: 2,
        },
      };
      expect(loadablePage).toEqual(expectedLoadablePage);

      const expectedPageParams: PageParams = {
        index: 0,
        size: 5,
      };
      expect(pageParams).toEqual(expectedPageParams);

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('should fetch the data on page index change', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useGetTodoPage(), {
        wrapper,
      });
      const [_loadablePage, _pageParams, setPageIndex] = result.current;

      act(() => {
        setPageIndex(1);
      });

      await waitForNextUpdate();
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('should fetch the data on page size change', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useGetTodoPage(), {
        wrapper,
      });
      const [_loadablePage, _pageParams, _setPageIndex, setPageSize] =
        result.current;

      act(() => {
        setPageSize(10);
      });

      await waitForNextUpdate();
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });
  });
});
