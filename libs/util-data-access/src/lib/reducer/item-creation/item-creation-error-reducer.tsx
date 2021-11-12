import { Item } from '../../item';
import { PageState } from '../../page-state';
import { ItemCreationErrorAction } from '../../page-state-action';

export function itemCreationErrorReducer<T extends Item<ID>, ID, C, F>(
  state: PageState<T, ID, C, F>,
  _action: ItemCreationErrorAction
): PageState<T, ID, C, F> {
  return {
    ...state,
    loadablePage: {
      ...state.loadablePage,
      isLoading: false,
    },
  };
}
