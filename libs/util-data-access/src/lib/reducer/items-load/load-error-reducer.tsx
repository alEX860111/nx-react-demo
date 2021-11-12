import { Item } from '../../item';
import { PageState } from '../../page-state';
import { LoadErrorAction } from '../../page-state-action';

export function loadErrorReducer<T extends Item<ID>, ID, C, F>(
  state: PageState<T, ID, C, F>,
  action: LoadErrorAction
): PageState<T, ID, C, F> {
  return {
    ...state,
    loadablePage: {
      ...state.loadablePage,
      isLoading: false,
      error: action.error,
    },
  };
}
