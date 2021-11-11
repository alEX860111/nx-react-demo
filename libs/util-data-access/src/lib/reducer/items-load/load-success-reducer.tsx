import { Item } from '../../item';
import { PageState } from '../../page-state';
import { LoadSuccessAction } from '../../page-state-action';

export function loadSuccessReducer<T extends Item<ID>, ID, C>(
  state: PageState<T, ID, C>,
  action: LoadSuccessAction<T>
): PageState<T, ID, C> {
  return {
    ...state,
    loadablePage: {
      isLoading: false,
      error: undefined,
      data: action.page,
    },
  };
}
