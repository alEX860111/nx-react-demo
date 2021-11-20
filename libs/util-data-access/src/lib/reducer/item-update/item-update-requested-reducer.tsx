import { Item } from '../../item';
import { PageState } from '../../page-state';
import { ItemUpdateRequestedAction } from '../../page-state-action';

export function itemUpdateRequestedReducer<T extends Item<ID>, ID, C, F>(
  state: PageState<T, ID, C, F>,
  action: ItemUpdateRequestedAction<T>
): PageState<T, ID, C, F> {
  return {
    ...state,
    loadablePage: {
      ...state.loadablePage,
      isLoading: action.refreshPage ? true : state.loadablePage.isLoading,
    },
    itemUpdateData: action.itemUpdateData,
  };
}
