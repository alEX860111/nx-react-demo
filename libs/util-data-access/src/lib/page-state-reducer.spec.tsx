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

  describe('load action', () => {
    it('LOAD_INIT should erase the error and activate the loading state', () => {
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

    it('LOAD_SUCCESS should erase the error, deactivate the loading state and set the page', () => {
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
          data: {
            items: [{ id: 1, name: 'joe' }],
            totalItems: 1,
            totalPages: 1,
          },
        },
        pageParams: {
          index: 0,
          size: 10,
        },
        refreshPage: 0,
      };
      expect(result).toEqual(expectedState);
    });

    it('LOAD_ERROR should set the error and deactivate the loading state', () => {
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
  });

  describe('page params action', () => {
    it('PAGE_INDEX_CHANGE should set the page index', () => {
      const state: PersonPageState = {
        loadablePage: {
          isLoading: false,
          data: {
            items: [{ id: 1, name: 'zoe' }],
            totalItems: 2,
            totalPages: 2,
          },
        },
        pageParams: {
          index: 0,
          size: 1,
        },
        refreshPage: 0,
      };
      const result = reducer(state, {
        type: 'PAGE_INDEX_CHANGE',
        pageIndex: 1,
      });
      const expectedState: PersonPageState = {
        loadablePage: {
          isLoading: false,
          data: {
            items: [{ id: 1, name: 'zoe' }],
            totalItems: 2,
            totalPages: 2,
          },
        },
        pageParams: {
          index: 1,
          size: 1,
        },
        refreshPage: 0,
      };
      expect(result).toEqual(expectedState);
    });

    it('PAGE_SIZE_CHANGE should set the page size and reset the page index', () => {
      const state: PersonPageState = {
        loadablePage: {
          isLoading: false,
          data: {
            items: [{ id: 1, name: 'zoe' }],
            totalItems: 2,
            totalPages: 2,
          },
        },
        pageParams: {
          index: 1,
          size: 1,
        },
        refreshPage: 0,
      };
      const result = reducer(state, { type: 'PAGE_SIZE_CHANGE', pageSize: 10 });
      const expectedState: PersonPageState = {
        loadablePage: {
          isLoading: false,
          data: {
            items: [{ id: 1, name: 'zoe' }],
            totalItems: 2,
            totalPages: 2,
          },
        },
        pageParams: {
          index: 0,
          size: 10,
        },
        refreshPage: 0,
      };
      expect(result).toEqual(expectedState);
    });
  });

  describe('item creation action', () => {
    it('ITEM_CREATION_REQUESTED should set the item creation data and activate the loading state', () => {
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
      const itemCreationData: PersonCreationData = { name: 'joe' };
      const result = reducer(state, {
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

    it('ITEM_CREATION_SUCCESS should reset the page index and increment the refresh counter', () => {
      const state: PersonPageState = {
        loadablePage: {
          isLoading: true,
          data: {
            items: [{ id: 2, name: 'zoe' }],
            totalItems: 2,
            totalPages: 2,
          },
        },
        pageParams: {
          index: 1,
          size: 1,
        },
        refreshPage: 0,
        itemCreationData: { name: 'joe' },
      };
      const result = reducer(state, { type: 'ITEM_CREATION_SUCCESS' });
      const expectedState: PersonPageState = {
        loadablePage: {
          isLoading: true,
          data: {
            items: [{ id: 2, name: 'zoe' }],
            totalItems: 2,
            totalPages: 2,
          },
        },
        pageParams: {
          index: 0,
          size: 1,
        },
        refreshPage: 1,
        itemCreationData: { name: 'joe' },
      };
      expect(result).toEqual(expectedState);
    });

    it('ITEM_CREATION_ERROR should deactivate the loading state', () => {
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
        itemCreationData: { name: 'joe' },
      };
      const result = reducer(state, { type: 'ITEM_CREATION_ERROR' });
      const expectedState: PersonPageState = {
        loadablePage: {
          isLoading: false,
          data: { items: [], totalItems: 0, totalPages: 0 },
        },
        pageParams: {
          index: 0,
          size: 10,
        },
        refreshPage: 0,
        itemCreationData: { name: 'joe' },
      };
      expect(result).toEqual(expectedState);
    });
  });

  describe('item deletion action', () => {
    it('ITEM_DELETION_REQUESTED should set the item id to delete and activate the loading state', () => {
      const state: PersonPageState = {
        loadablePage: {
          isLoading: false,
          data: {
            items: [{ id: 1, name: 'joe' }],
            totalItems: 1,
            totalPages: 1,
          },
        },
        pageParams: {
          index: 0,
          size: 10,
        },
        refreshPage: 0,
      };
      const itemIdToDelete = 1;
      const result = reducer(state, {
        type: 'ITEM_DELETION_REQUESTED',
        itemIdToDelete,
      });
      const expectedState: PersonPageState = {
        loadablePage: {
          isLoading: true,
          data: {
            items: [{ id: 1, name: 'joe' }],
            totalItems: 1,
            totalPages: 1,
          },
        },
        pageParams: {
          index: 0,
          size: 10,
        },
        refreshPage: 0,
        itemIdToDelete,
      };
      expect(result).toEqual(expectedState);
    });

    it('ITEM_DELETION_SUCCESS should increment the refresh counter', () => {
      const state: PersonPageState = {
        loadablePage: {
          isLoading: true,
          data: {
            items: [{ id: 1, name: 'joe' }],
            totalItems: 1,
            totalPages: 1,
          },
        },
        pageParams: {
          index: 0,
          size: 10,
        },
        refreshPage: 0,
        itemIdToDelete: 1,
      };
      const result = reducer(state, { type: 'ITEM_DELETION_SUCCESS' });
      const expectedState: PersonPageState = {
        loadablePage: {
          isLoading: true,
          data: {
            items: [{ id: 1, name: 'joe' }],
            totalItems: 1,
            totalPages: 1,
          },
        },
        pageParams: {
          index: 0,
          size: 10,
        },
        refreshPage: 1,
        itemIdToDelete: 1,
      };
      expect(result).toEqual(expectedState);
    });

    it('ITEM_DELETION_SUCCESS should increment the refresh counter and decrement the page index', () => {
      const state: PersonPageState = {
        loadablePage: {
          isLoading: true,
          data: {
            items: [{ id: 1, name: 'joe' }],
            totalItems: 2,
            totalPages: 2,
          },
        },
        pageParams: {
          index: 1,
          size: 1,
        },
        refreshPage: 0,
        itemIdToDelete: 1,
      };
      const result = reducer(state, { type: 'ITEM_DELETION_SUCCESS' });
      const expectedState: PersonPageState = {
        loadablePage: {
          isLoading: true,
          data: {
            items: [{ id: 1, name: 'joe' }],
            totalItems: 2,
            totalPages: 2,
          },
        },
        pageParams: {
          index: 0,
          size: 1,
        },
        refreshPage: 1,
        itemIdToDelete: 1,
      };
      expect(result).toEqual(expectedState);
    });

    it('ITEM_CREATION_ERROR should deactivate the loading state', () => {
      const state: PersonPageState = {
        loadablePage: {
          isLoading: true,
          data: {
            items: [{ id: 1, name: 'joe' }],
            totalItems: 1,
            totalPages: 1,
          },
        },
        pageParams: {
          index: 0,
          size: 10,
        },
        refreshPage: 0,
        itemIdToDelete: 1,
      };
      const result = reducer(state, { type: 'ITEM_DELETION_ERROR' });
      const expectedState: PersonPageState = {
        loadablePage: {
          isLoading: false,
          data: {
            items: [{ id: 1, name: 'joe' }],
            totalItems: 1,
            totalPages: 1,
          },
        },
        pageParams: {
          index: 0,
          size: 10,
        },
        refreshPage: 0,
        itemIdToDelete: 1,
      };
      expect(result).toEqual(expectedState);
    });
  });

  describe('item update action', () => {
    it('ITEM_UPDATE_REQUESTED should set the item update data', () => {
      const state: PersonPageState = {
        loadablePage: {
          isLoading: false,
          data: {
            items: [{ id: 1, name: 'joe' }],
            totalItems: 1,
            totalPages: 1,
          },
        },
        pageParams: {
          index: 0,
          size: 10,
        },
        refreshPage: 0,
      };
      const itemUpdateData: Person = { id: 1, name: 'joe (new)' };
      const result = reducer(state, {
        type: 'ITEM_UPDATE_REQUESTED',
        itemUpdateData,
      });
      const expectedState: PersonPageState = {
        loadablePage: {
          isLoading: false,
          data: {
            items: [{ id: 1, name: 'joe' }],
            totalItems: 1,
            totalPages: 1,
          },
        },
        pageParams: {
          index: 0,
          size: 10,
        },
        refreshPage: 0,
        itemUpdateData,
      };
      expect(result).toEqual(expectedState);
    });

    it('REFRESH_PAGE should increment the refresh counter', () => {
      const state: PersonPageState = {
        loadablePage: {
          isLoading: false,
          data: {
            items: [{ id: 1, name: 'joe' }],
            totalItems: 1,
            totalPages: 1,
          },
        },
        pageParams: {
          index: 0,
          size: 10,
        },
        refreshPage: 0,
        itemUpdateData: { id: 1, name: 'joe (new)' },
      };
      const result = reducer(state, { type: 'REFRESH_PAGE' });
      const expectedState: PersonPageState = {
        loadablePage: {
          isLoading: false,
          data: {
            items: [{ id: 1, name: 'joe' }],
            totalItems: 1,
            totalPages: 1,
          },
        },
        pageParams: {
          index: 0,
          size: 10,
        },
        refreshPage: 1,
        itemUpdateData: { id: 1, name: 'joe (new)' },
      };
      expect(result).toEqual(expectedState);
    });
  });
});
