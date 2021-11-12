import { Item } from '../../item';
import { PageState } from '../../page-state';
import { ItemUpdateSuccessAction } from '../../page-state-action';

export function itemUpdateSuccessReducer<T extends Item<ID>, ID, C, F>(
  state: PageState<T, ID, C, F>,
  action: ItemUpdateSuccessAction
): PageState<T, ID, C, F> {
  return {
    ...state,
    pageParams: {
      ...state.pageParams,
      index:
        action.requiresPageRefresh &&
        state.loadablePage.data.items.length === 1 &&
        state.pageParams.index > 0
          ? state.pageParams.index - 1
          : state.pageParams.index,
    },
    refreshPage: action.requiresPageRefresh
      ? state.refreshPage + 1
      : state.refreshPage,
  };
}
