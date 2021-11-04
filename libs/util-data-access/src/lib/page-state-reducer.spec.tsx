import { Reducer } from 'react';
import { PageState } from './page-state';
import { PageStateAction } from './page-state-action';
import { pageStateReducer } from './page-state-reducer';

describe(pageStateReducer, () => {
  const reducer: Reducer<
    PageState<string, string, string>,
    PageStateAction<string, string, string>
  > = pageStateReducer;

  it('should erase the error and activate the loading state on LOAD_INIT action', () => {
    const state: PageState<string, string, string> = {
      loadablePage: {
        error: 'oops',
        isLoading: false,
        data: { items: [], totalItems: 0, totalPages: 0 },
      },
      pageParams: {
        index: 0,
        size: 10,
      },
      refreshPage: 0,
    };
    const result = reducer(state, { type: 'LOAD_INIT' });
    const expectedState: PageState<string, string, string> = {
      loadablePage: {
        error: undefined,
        isLoading: true,
        data: { items: [], totalItems: 0, totalPages: 0 },
      },
      pageParams: {
        index: 0,
        size: 10,
      },
      refreshPage: 0,
    };
    expect(result).toEqual(expectedState);
  });

  it('should erase the error, deactivate the loading state and set the page on LOAD_SUCCESS action', () => {
    const state: PageState<string, string, string> = {
      loadablePage: {
        error: 'oops',
        isLoading: true,
        data: { items: [], totalItems: 0, totalPages: 0 },
      },
      pageParams: {
        index: 0,
        size: 10,
      },
      refreshPage: 0,
    };
    const result = reducer(state, {
      type: 'LOAD_SUCCESS',
      page: { items: ['foo'], totalItems: 1, totalPages: 1 },
    });
    const expectedState: PageState<string, string, string> = {
      loadablePage: {
        error: undefined,
        isLoading: false,
        data: { items: ['foo'], totalItems: 1, totalPages: 1 },
      },
      pageParams: {
        index: 0,
        size: 10,
      },
      refreshPage: 0,
    };
    expect(result).toEqual(expectedState);
  });

  it('should set the error and deactivate the loading state on LOAD_ERROR action', () => {
    const state: PageState<string, string, string> = {
      loadablePage: {
        isLoading: true,
        data: { items: [], totalItems: 0, totalPages: 0 },
      },
      pageParams: {
        index: 0,
        size: 10,
      },
      refreshPage: 0,
    };
    const result = reducer(state, { type: 'LOAD_ERROR', error: 'oops' });
    const expectedState: PageState<string, string, string> = {
      loadablePage: {
        error: 'oops',
        isLoading: false,
        data: { items: [], totalItems: 0, totalPages: 0 },
      },
      pageParams: {
        index: 0,
        size: 10,
      },
      refreshPage: 0,
    };
    expect(result).toEqual(expectedState);
  });

  it('should set the page index on PAGE_INDEX_CHANGE action', () => {
    const state: PageState<string, string, string> = {
      loadablePage: {
        isLoading: false,
        data: { items: [], totalItems: 0, totalPages: 0 },
      },
      pageParams: {
        index: 0,
        size: 10,
      },
      refreshPage: 0,
    };
    const result = reducer(state, { type: 'PAGE_INDEX_CHANGE', pageIndex: 1 });
    const expectedState: PageState<string, string, string> = {
      loadablePage: {
        isLoading: false,
        data: { items: [], totalItems: 0, totalPages: 0 },
      },
      pageParams: {
        index: 1,
        size: 10,
      },
      refreshPage: 0,
    };
    expect(result).toEqual(expectedState);
  });

  it('should set the page size and reset the page index on PAGE_SIZE_CHANGE action', () => {
    const state: PageState<string, string, string> = {
      loadablePage: {
        isLoading: false,
        data: { items: [], totalItems: 0, totalPages: 0 },
      },
      pageParams: {
        index: 1,
        size: 10,
      },
      refreshPage: 0,
    };
    const result = reducer(state, { type: 'PAGE_SIZE_CHANGE', pageSize: 20 });
    const expectedState: PageState<string, string, string> = {
      loadablePage: {
        isLoading: false,
        data: { items: [], totalItems: 0, totalPages: 0 },
      },
      pageParams: {
        index: 0,
        size: 20,
      },
      refreshPage: 0,
    };
    expect(result).toEqual(expectedState);
  });
});
