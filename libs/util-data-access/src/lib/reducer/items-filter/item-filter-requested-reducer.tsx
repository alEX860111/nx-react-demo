import { Item } from '../../item';
import { PageState } from '../../page-state';
import { ItemFilterRequestedAction } from '../../page-state-action';

export function itemFilterRequestedReducer<T extends Item<ID>, ID, C>(
  state: PageState<T, ID, C>,
  action: ItemFilterRequestedAction<T>
): PageState<T, ID, C> {
  return {
    ...state,
    loadablePage: {
      ...state.loadablePage,
      isLoading: true,
    },
    pageParams: {
      ...state.pageParams,
      index: 0,
    },
    filter: action.filter,
  };
}
