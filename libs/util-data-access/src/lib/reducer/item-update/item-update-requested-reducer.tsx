import { Item } from '../../item';
import { PageState } from '../../page-state';
import { ItemUpdateRequestedAction } from '../../page-state-action';

export function itemUpdateRequestedReducer<T extends Item<ID>, ID, C>(
  state: PageState<T, ID, C>,
  action: ItemUpdateRequestedAction<T>
): PageState<T, ID, C> {
  return {
    ...state,
    itemUpdateData: action.itemUpdateData,
  };
}
