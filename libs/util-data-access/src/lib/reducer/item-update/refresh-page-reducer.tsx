import { Item } from '../../item';
import { PageState } from '../../page-state';
import { RefreshPageAction } from '../../page-state-action';

export function refreshPageReducer<T extends Item<ID>, ID, C>(
  state: PageState<T, ID, C>,
  _action: RefreshPageAction
): PageState<T, ID, C> {
  return {
    ...state,
    refreshPage: state.refreshPage + 1,
  };
}
