import { PageState } from '../../page-state';
import { itemCreationErrorReducer } from './item-creation-error-reducer';

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

describe(itemCreationErrorReducer, () => {
  it('should deactivate the loading state', () => {
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
      filter: {},
    };

    const result = itemCreationErrorReducer(state, {
      type: 'ITEM_CREATION_ERROR',
    });

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
      filter: {},
    };
    expect(result).toEqual(expectedState);
  });
});
