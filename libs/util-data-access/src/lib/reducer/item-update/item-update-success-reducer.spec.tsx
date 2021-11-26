import { PageState } from '../../page-state';
import { itemUpdateSuccessReducer } from './item-update-success-reducer';

interface Person {
  id: number;
  name: string;
}

type PersonCreationData = Pick<Person, 'name'>;

type PersonFilter = 'all' | 'validated' | 'unvalidated';

type PersonPageState = PageState<
  Person,
  number,
  PersonCreationData,
  PersonFilter
>;

describe(itemUpdateSuccessReducer, () => {
  it('should increment the refresh counter if page is in loading state', () => {
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
      itemUpdateData: { id: 1, name: 'joe (new)' },
      filter: 'all',
      initialFilter: 'all',
    };

    const result = itemUpdateSuccessReducer(state, {
      type: 'ITEM_UPDATE_SUCCESS',
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
      refreshPage: 1,
      itemUpdateData: { id: 1, name: 'joe (new)' },
      filter: 'all',
      initialFilter: 'all',
    };
    expect(result).toEqual(expectedState);
  });

  it('should increment the refresh counter and decrement the page index if page is in loading state', () => {
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
      itemUpdateData: { id: 1, name: 'joe (new)' },
      filter: 'all',
      initialFilter: 'all',
    };

    const result = itemUpdateSuccessReducer(state, {
      type: 'ITEM_UPDATE_SUCCESS',
    });

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
      itemUpdateData: { id: 1, name: 'joe (new)' },
      filter: 'all',
      initialFilter: 'all',
    };
    expect(result).toEqual(expectedState);
  });

  it('should not increment the refresh counter if page is not in loading state', () => {
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
      filter: 'all',
      initialFilter: 'all',
    };

    const result = itemUpdateSuccessReducer(state, {
      type: 'ITEM_UPDATE_SUCCESS',
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
      itemUpdateData: { id: 1, name: 'joe (new)' },
      filter: 'all',
      initialFilter: 'all',
    };
    expect(result).toEqual(expectedState);
  });
});
