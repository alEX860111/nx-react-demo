import { Item } from '../../item';
import { PageState } from '../../page-state';
import { ItemDeletionSuccessAction } from '../../page-state-action';

export function itemDeletionSuccessReducer<T extends Item<ID>, ID, C, F>(
  state: PageState<T, ID, C, F>,
  _action: ItemDeletionSuccessAction
): PageState<T, ID, C, F> {
  return {
    ...state,
    pageParams: {
      ...state.pageParams,
      index:
        state.loadablePage.data.items.length === 1 && state.pageParams.index > 0
          ? state.pageParams.index - 1
          : state.pageParams.index,
    },
    refreshPage: state.refreshPage + 1,
  };
}
