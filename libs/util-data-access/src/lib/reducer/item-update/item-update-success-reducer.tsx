import { Item } from '../../item';
import { PageState } from '../../page-state';
import { ItemUpdateSuccessAction } from '../../page-state-action';

export function itemUpdateSuccessReducer<T extends Item<ID>, ID, C, F>(
  state: PageState<T, ID, C, F>,
  _action: ItemUpdateSuccessAction
): PageState<T, ID, C, F> {
  return {
    ...state,
    pageParams: {
      ...state.pageParams,
      index:
        state.loadablePage.isLoading &&
        state.loadablePage.data.items.length === 1 &&
        state.pageParams.index > 0
          ? state.pageParams.index - 1
          : state.pageParams.index,
    },
    refreshPage: state.loadablePage.isLoading
      ? state.refreshPage + 1
      : state.refreshPage,
  };
}
