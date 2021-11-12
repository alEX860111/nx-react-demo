import { Item } from '../../item';
import { PageState } from '../../page-state';
import { LoadInitAction } from '../../page-state-action';

export function loadInitReducer<T extends Item<ID>, ID, C, F>(
  state: PageState<T, ID, C, F>,
  _action: LoadInitAction
): PageState<T, ID, C, F> {
  return {
    ...state,
    loadablePage: {
      ...state.loadablePage,
      isLoading: true,
      error: undefined,
    },
  };
}
