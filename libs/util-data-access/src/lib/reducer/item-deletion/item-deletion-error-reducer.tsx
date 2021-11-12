import { Item } from '../../item';
import { PageState } from '../../page-state';
import { ItemDeletionErrorAction } from '../../page-state-action';

export function itemDeletionErrorReducer<T extends Item<ID>, ID, C, F>(
  state: PageState<T, ID, C, F>,
  _action: ItemDeletionErrorAction
): PageState<T, ID, C, F> {
  return {
    ...state,
    loadablePage: {
      ...state.loadablePage,
      isLoading: false,
    },
  };
}
