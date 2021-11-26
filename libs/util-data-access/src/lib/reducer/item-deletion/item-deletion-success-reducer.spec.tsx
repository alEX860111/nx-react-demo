import { PageState } from '../../page-state';
import { itemDeletionSuccessReducer } from './item-deletion-success-reducer';

interface Person {
  id: number;
  name: string;
}

type PersonCreationData = Pick<Person, 'name'>;

type PersonFilter = Partial<Pick<Person, 'name'>>;

type PersonPageState = PageState<
  Person,
  number,
  PersonCreationData,
  PersonFilter
>;

describe(itemDeletionSuccessReducer, () => {
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
      filter: {},
    };

    const result = itemDeletionSuccessReducer(state, {
      type: 'ITEM_DELETION_SUCCESS',
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
      itemIdToDelete: 1,
      filter: {},
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
      filter: {},
    };

    const result = itemDeletionSuccessReducer(state, {
      type: 'ITEM_DELETION_SUCCESS',
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
      itemIdToDelete: 1,
      filter: {},
    };
    expect(result).toEqual(expectedState);
  });
});
