import { Item } from '../../item';
import { PageState } from '../../page-state';
import { ItemCreationRequestedAction } from '../../page-state-action';

export function itemCreationRequestedReducer<T extends Item<ID>, ID, C>(
  state: PageState<T, ID, C>,
  action: ItemCreationRequestedAction<C>
): PageState<T, ID, C> {
  return {
    ...state,
    loadablePage: {
      ...state.loadablePage,
      isLoading: true,
    },
    itemCreationData: action.itemCreationData,
  };
}
