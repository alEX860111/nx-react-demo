const stateFilters = ['all', 'completed', 'open'] as const;

export type TodoStateFilter = typeof stateFilters[number];

export function isTodoStateFilter(value: unknown): value is TodoStateFilter {
  return (
    typeof value === 'string' && stateFilters.includes(value as TodoStateFilter)
  );
}
