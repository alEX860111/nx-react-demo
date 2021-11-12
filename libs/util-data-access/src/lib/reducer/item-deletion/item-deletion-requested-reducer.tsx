import { Item } from '../../item';
import { PageState } from '../../page-state';
import { ItemDeletionRequestedAction } from '../../page-state-action';

export function itemDeletionRequestedReducer<T extends Item<ID>, ID, C, F>(
  state: PageState<T, ID, C, F>,
  action: ItemDeletionRequestedAction<ID>
): PageState<T, ID, C, F> {
  return {
    ...state,
    loadablePage: {
      ...state.loadablePage,
      isLoading: true,
    },
    itemIdToDelete: action.itemIdToDelete,
  };
}
