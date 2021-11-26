import { PageState } from '../../page-state';
import { itemCreationRequestedReducer } from './item-creation-requested-reducer';

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

describe(itemCreationRequestedReducer, () => {
  it('should set the item creation data and activate the loading state', () => {
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
      filter: {},
    };

    const itemCreationData: PersonCreationData = { name: 'joe' };
    const result = itemCreationRequestedReducer(state, {
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
      filter: {},
      itemCreationData,
    };
    expect(result).toEqual(expectedState);
  });
});
