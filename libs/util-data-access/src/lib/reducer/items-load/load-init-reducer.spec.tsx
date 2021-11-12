import { PageState } from '../../page-state';
import { loadInitReducer } from './load-init-reducer';

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

describe(loadInitReducer, () => {
  it('should erase the error and activate the loading state', () => {
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
      filter: {},
    };
    const result = loadInitReducer(state, { type: 'LOAD_INIT' });
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
      filter: {},
    };
    expect(result).toEqual(expectedState);
  });
});
