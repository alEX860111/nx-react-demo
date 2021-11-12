import { ItemUpdateRequestedAction } from '../../page-state-action';
import { isPageRefreshNeeded } from './is-page-refresh-needed';

interface Person {
  id: number;
  name: string;
  age: number;
  address: {
    city: string;
  };
}

interface PersonFilter {
  name?: string;
  age?: number;
  address?: {
    city: string;
  };
}

describe(isPageRefreshNeeded, () => {
  it('should return false if no filter is applied', () => {
    const action: ItemUpdateRequestedAction<Person> = {
      type: 'ITEM_UPDATE_REQUESTED',
      previousItem: { id: 1, name: 'joe', age: 42, address: { city: 'HH' } },
      itemUpdateData: {
        id: 1,
        name: 'joe (new)',
        age: 42,
        address: { city: 'HH' },
      },
    };
    const filter: PersonFilter = {};
    const result = isPageRefreshNeeded<Person, PersonFilter>(action, filter);
    expect(result).toBe(false);
  });

  it('should return true if filtered property is changed', () => {
    const action: ItemUpdateRequestedAction<Person> = {
      type: 'ITEM_UPDATE_REQUESTED',
      previousItem: { id: 1, name: 'joe', age: 42, address: { city: 'HH' } },
      itemUpdateData: {
        id: 1,
        name: 'joe (new)',
        age: 42,
        address: { city: 'HH' },
      },
    };
    const filter: PersonFilter = { name: 'joe' };
    const result = isPageRefreshNeeded<Person, PersonFilter>(action, filter);
    expect(result).toBe(true);
  });

  it('should return false if filtered property is not changed', () => {
    const action: ItemUpdateRequestedAction<Person> = {
      type: 'ITEM_UPDATE_REQUESTED',
      previousItem: { id: 1, name: 'joe', age: 42, address: { city: 'HH' } },
      itemUpdateData: {
        id: 1,
        name: 'joe (new)',
        age: 42,
        address: { city: 'HH' },
      },
    };
    const filter: PersonFilter = { age: 42 };
    const result = isPageRefreshNeeded<Person, PersonFilter>(action, filter);
    expect(result).toBe(false);
  });

  it('should return true if filtered property is changed with nesting', () => {
    const action: ItemUpdateRequestedAction<Person> = {
      type: 'ITEM_UPDATE_REQUESTED',
      previousItem: { id: 1, name: 'joe', age: 42, address: { city: 'HH' } },
      itemUpdateData: {
        id: 1,
        name: 'joe',
        age: 42,
        address: { city: 'HL' },
      },
    };
    const filter: PersonFilter = { address: { city: 'HH' } };
    const result = isPageRefreshNeeded<Person, PersonFilter>(action, filter);
    expect(result).toBe(true);
  });
});
