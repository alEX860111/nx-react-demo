import { Item } from '../../item';
import { PageState } from '../../page-state';
import { ItemDeletionRequestedAction } from '../../page-state-action';

export function itemDeletionRequestedReducer<T extends Item<ID>, ID, C>(
  state: PageState<T, ID, C>,
  action: ItemDeletionRequestedAction<ID>
): PageState<T, ID, C> {
  return {
    ...state,
    loadablePage: {
      ...state.loadablePage,
      isLoading: true,
    },
    itemIdToDelete: action.itemIdToDelete,
  };
}
