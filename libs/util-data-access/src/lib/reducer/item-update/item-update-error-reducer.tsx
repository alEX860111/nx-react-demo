import { Item } from '../../item';
import { PageState } from '../../page-state';
import { ItemUpdateErrorAction } from '../../page-state-action';

export function itemUpdateErrorReducer<T extends Item<ID>, ID, C, F>(
  state: PageState<T, ID, C, F>,
  _action: ItemUpdateErrorAction
): PageState<T, ID, C, F> {
  return {
    ...state,
    refreshPage: state.refreshPage + 1,
  };
}
