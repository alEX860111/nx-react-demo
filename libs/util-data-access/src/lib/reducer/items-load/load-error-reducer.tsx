import { Item } from '../../item';
import { PageState } from '../../page-state';
import { LoadErrorAction } from '../../page-state-action';

export function loadErrorReducer<T extends Item<ID>, ID, C>(
  state: PageState<T, ID, C>,
  action: LoadErrorAction
): PageState<T, ID, C> {
  return {
    ...state,
    loadablePage: {
      ...state.loadablePage,
      isLoading: false,
      error: action.error,
    },
  };
}
