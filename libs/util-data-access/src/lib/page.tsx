export interface Page<T> {
  items: T[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
}
