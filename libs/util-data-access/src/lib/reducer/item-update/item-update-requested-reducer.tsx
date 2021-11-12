import { Item } from '../../item';
import { PageState } from '../../page-state';
import { ItemUpdateRequestedAction } from '../../page-state-action';
import { isPageRefreshNeeded } from './is-page-refresh-needed';

export function itemUpdateRequestedReducer<T extends Item<ID>, ID, C, F>(
  state: PageState<T, ID, C, F>,
  action: ItemUpdateRequestedAction<T>
): PageState<T, ID, C, F> {
  const requiresPageRefresh = isPageRefreshNeeded(action, state.filter);
  return {
    ...state,
    loadablePage: {
      ...state.loadablePage,
      isLoading: requiresPageRefresh,
    },
    itemUpdateData: { item: action.itemUpdateData, requiresPageRefresh },
  };
}
