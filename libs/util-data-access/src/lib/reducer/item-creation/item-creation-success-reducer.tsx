import { Item } from '../../item';
import { PageState } from '../../page-state';
import { ItemCreationSuccessAction } from '../../page-state-action';

export function itemCreationSuccessReducer<T extends Item<ID>, ID, C>(
  state: PageState<T, ID, C>,
  _action: ItemCreationSuccessAction
): PageState<T, ID, C> {
  return {
    ...state,
    pageParams: {
      ...state.pageParams,
      index: 0,
    },
    refreshPage: state.refreshPage + 1,
  };
}
