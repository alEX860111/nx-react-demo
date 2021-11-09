import { Reducer } from 'react';
import { PageState } from './page-state';
import { PageStateAction } from './page-state-action';
import { pageStateReducer } from './page-state-reducer';

interface Person {
  id: number;
  name: string;
}

type PersonCreationData = Pick<Person, 'name'>;

type PersonPageState = PageState<Person, number, PersonCreationData>;
type PersonPageStateAction = PageStateAction<
  Person,
  number,
  PersonCreationData
>;

describe(pageStateReducer, () => {
  const reducer: Reducer<PersonPageState, PersonPageStateAction> =
    pageStateReducer;

  let initialState: PersonPageState;

  beforeEach(() => {
    initialState = {
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
  });

  it('should erase the error and activate the loading state on LOAD_INIT action', () => {
    const state: PersonPageState = {
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
    const expectedState: PersonPageState = {
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
    const state: PersonPageState = {
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
      page: { items: [{ id: 1, name: 'joe' }], totalItems: 1, totalPages: 1 },
    });
    const expectedState: PersonPageState = {
      loadablePage: {
        error: undefined,
        isLoading: false,
        data: { items: [{ id: 1, name: 'joe' }], totalItems: 1, totalPages: 1 },
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
    const state: PersonPageState = {
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
    const expectedState: PersonPageState = {
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
    const state: PersonPageState = {
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
    const expectedState: PersonPageState = {
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
    const state: PersonPageState = {
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
    const expectedState: PersonPageState = {
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

  it('should set the item creation data and active the loading state on ITEM_CREATION_REQUESTED action', () => {
    const itemCreationData: PersonCreationData = { name: 'joe' };
    const result = reducer(initialState, {
      type: 'ITEM_CREATION_REQUESTED',
      itemCreationData,
    });
    const expectedState: PersonPageState = {
      loadablePage: {
        isLoading: true,
        data: { items: [], totalItems: 0, totalPages: 0 },
      },
      pageParams: {
        index: 0,
        size: 10,
      },
      refreshPage: 0,
      itemCreationData,
    };
    expect(result).toEqual(expectedState);
  });
});
