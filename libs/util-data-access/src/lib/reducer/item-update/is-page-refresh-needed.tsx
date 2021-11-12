import { ItemUpdateRequestedAction } from '../../page-state-action';
import { diffObjects } from '../../util/diff-objects';
import { flattenObject } from '../../util/flatten-object';

export function isPageRefreshNeeded<T, F>(
  action: ItemUpdateRequestedAction<T>,
  filter: F
): boolean {
  const diff = diffObjects(action.itemUpdateData, action.previousItem);
  const flattenedDiff = flattenObject(diff);
  const diffKeys = Object.keys(flattenedDiff);

  const flattendedFilter = flattenObject(filter);
  const filterKeys = Object.keys(flattendedFilter);

  return diffKeys.filter((diffKey) => filterKeys.includes(diffKey)).length > 0;
}
