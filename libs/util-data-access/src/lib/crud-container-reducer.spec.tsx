import { Reducer } from 'react';
import { CrudContainer } from './crud-container';
import { CrudContainerAction } from './crud-container-action';
import { crudContainerReducer } from './crud-container-reducer';
import { Page } from './page';

interface TestPerson {
  id: number;
  name: string;
}

type TestPersonCreationData = Pick<TestPerson, 'name'>;

describe(crudContainerReducer, () => {
  let reducer: Reducer<
    CrudContainer<TestPerson, TestPersonCreationData>,
    CrudContainerAction<TestPerson, TestPersonCreationData>
  >;

  beforeEach(() => {
    reducer = crudContainerReducer<TestPerson, TestPersonCreationData>();
  });

  it('should erase the error and activate the loading state of the loadable page on PAGE_LOAD_INIT action', () => {
    const state: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        error: 'oops',
        isLoading: false,
        data: {
          index: 0,
          size: 10,
          items: [],
          totalItems: 0,
          totalPages: 0,
        },
      },
    };
    const result = reducer(state, { type: 'PAGE_LOAD_INIT' });
    const expectedState: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        error: undefined,
        isLoading: true,
        data: {
          index: 0,
          size: 10,
          items: [],
          totalItems: 0,
          totalPages: 0,
        },
      },
    };
    expect(result).toEqual(expectedState);
  });

  it('should erase the error, deactivate the loading state and set the page of the loadable page on PAGE_LOAD_SUCCESS action', () => {
    const state: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        isLoading: true,
        data: {
          index: 0,
          size: 10,
          items: [],
          totalItems: 0,
          totalPages: 0,
        },
      },
    };
    const page: Page<TestPerson> = {
      index: 0,
      size: 10,
      items: [{ id: 1, name: 'joe' }],
      totalItems: 1,
      totalPages: 1,
    };
    const result = reducer(state, { type: 'PAGE_LOAD_SUCCESS', page: page });
    const expectedState: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        isLoading: false,
        data: page,
      },
    };
    expect(result).toEqual(expectedState);
  });

  it('should set the error and deactivate the loading state of the loadable page on PAGE_LOAD_ERROR action', () => {
    const state: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        isLoading: true,
        data: {
          index: 0,
          size: 10,
          items: [],
          totalItems: 0,
          totalPages: 0,
        },
      },
    };
    const result = reducer(state, { type: 'PAGE_LOAD_ERROR', error: 'oops' });
    const expectedState: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        error: 'oops',
        isLoading: false,
        data: {
          index: 0,
          size: 10,
          items: [],
          totalItems: 0,
          totalPages: 0,
        },
      },
    };
    expect(result).toEqual(expectedState);
  });

  it('should set the page index of the loadable page on PAGE_INDEX_CHANGE action', () => {
    const state: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        isLoading: false,
        data: {
          index: 1,
          size: 10,
          items: [{ id: 1, name: 'joe' }],
          totalItems: 11,
          totalPages: 2,
        },
      },
    };
    const result = reducer(state, { type: 'PAGE_INDEX_CHANGE', pageIndex: 0 });
    const expectedState: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        isLoading: false,
        data: {
          index: 0,
          size: 10,
          items: [{ id: 1, name: 'joe' }],
          totalItems: 11,
          totalPages: 2,
        },
      },
    };
    expect(result).toEqual(expectedState);
  });

  it('should set the size and reset the index of the loadable page on PAGE_SIZE_CHANGE action', () => {
    const state: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        isLoading: false,
        data: {
          index: 1,
          size: 10,
          items: [{ id: 1, name: 'joe' }],
          totalItems: 11,
          totalPages: 2,
        },
      },
    };
    const result = reducer(state, { type: 'PAGE_SIZE_CHANGE', pageSize: 20 });
    const expectedState: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        isLoading: false,
        data: {
          index: 0,
          size: 20,
          items: [{ id: 1, name: 'joe' }],
          totalItems: 11,
          totalPages: 2,
        },
      },
    };
    expect(result).toEqual(expectedState);
  });

  it('should activate the loading state of the loadable page and set the creation data on ITEM_CREATION_INIT action', () => {
    const state: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        isLoading: false,
        data: {
          index: 0,
          size: 10,
          items: [],
          totalItems: 0,
          totalPages: 0,
        },
      },
    };
    const creationData: TestPersonCreationData = { name: 'zoe' };
    const result = reducer(state, {
      type: 'ITEM_CREATION_INIT',
      itemCreationData: creationData,
    });
    const expectedState: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        isLoading: true,
        data: {
          index: 0,
          size: 10,
          items: [],
          totalItems: 0,
          totalPages: 0,
        },
      },
      itemCreationData: creationData,
    };
    expect(result).toEqual(expectedState);
  });

  it('should reset the index of the loadable page and set the created item on ITEM_CREATION_SUCCESS action', () => {
    const state: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        isLoading: true,
        data: {
          index: 1,
          size: 10,
          items: [{ id: 1, name: 'joe' }],
          totalItems: 11,
          totalPages: 2,
        },
      },
      itemCreationData: { name: 'zoe' },
    };
    const testPerson: TestPerson = { id: 2, name: 'zoe' };
    const result = reducer(state, {
      type: 'ITEM_CREATION_SUCCESS',
      item: testPerson,
    });
    const expectedState: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        isLoading: true,
        data: {
          index: 0,
          size: 10,
          items: [{ id: 1, name: 'joe' }],
          totalItems: 11,
          totalPages: 2,
        },
      },
      itemCreationData: { name: 'zoe' },
      createdItem: testPerson,
    };
    expect(result).toEqual(expectedState);
  });

  it('should deactivate the loading state of the loadable page on ITEM_CREATION_ERROR action', () => {
    const state: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        isLoading: true,
        data: {
          index: 0,
          size: 10,
          items: [],
          totalItems: 0,
          totalPages: 0,
        },
      },
      itemCreationData: { name: 'zoe' },
    };
    const result = reducer(state, {
      type: 'ITEM_CREATION_ERROR',
      error: 'oops',
    });
    const expectedState: CrudContainer<TestPerson, TestPersonCreationData> = {
      loadablePage: {
        isLoading: false,
        data: {
          index: 0,
          size: 10,
          items: [],
          totalItems: 0,
          totalPages: 0,
        },
      },
      itemCreationData: { name: 'zoe' },
    };
    expect(result).toEqual(expectedState);
  });
});
