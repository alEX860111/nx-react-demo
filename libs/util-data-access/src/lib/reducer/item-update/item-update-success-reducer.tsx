import { Item } from '../../item';
import { PageState } from '../../page-state';
import { ItemUpdateSuccessAction } from '../../page-state-action';

export function itemUpdateSuccessReducer<T extends Item<ID>, ID, C, F>(
  state: PageState<T, ID, C, F>,
  action: ItemUpdateSuccessAction
): PageState<T, ID, C, F> {
  return {
    ...state,
    refreshPage: state.refreshPage + 1,
  };
}
