import { Loadable } from './loadable';
import { Page } from './page';

export interface CrudContainer<T, C> {
  loadablePage: Loadable<Page<T>>;
  createdItem?: T;
  itemCreationData?: C;
}
