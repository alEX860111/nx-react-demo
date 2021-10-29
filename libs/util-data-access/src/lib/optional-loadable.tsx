export interface OptionalLoadable<T> {
  error?: string;
  isLoading: boolean;
  data?: T;
}
