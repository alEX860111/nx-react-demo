/* eslint-disable @typescript-eslint/no-explicit-any */

import { isEqual, isObject, transform } from 'lodash';

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function diffObjects(object: any, base: any): Record<string, any> {
  return transform<Record<string, any>, Record<string, any>>(
    object,
    (result, value, key) => {
      if (!isEqual(value, base[key])) {
        result[key] =
          isObject(value) && isObject(base[key])
            ? diffObjects(value, base[key])
            : value;
      }
    }
  );
}
