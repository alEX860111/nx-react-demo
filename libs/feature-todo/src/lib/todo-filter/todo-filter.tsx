import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Todo } from '@nx-react-demo/data-access-todo';
import { useContext, useState } from 'react';
import { TodoDispatch } from '../todo-context';

type FilterValue = 'all' | 'completed' | 'open';

export function TodoFilter() {
  const dispatch = useContext(TodoDispatch);

  const [filterValue, setFilterValue] = useState<FilterValue>('all');

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    filterValue: FilterValue
  ) => {
    setFilterValue(filterValue);

    const filter: Partial<Todo> = {};
    if (filterValue === 'completed') {
      filter.completed = true;
    } else if (filterValue === 'open') {
      filter.completed = false;
    }
    dispatch({ type: 'ITEM_FILTER_REQUESTED', filter });
  };

  return (
    <ToggleButtonGroup
      value={filterValue}
      exclusive
      onChange={handleChange}
      orientation="horizontal"
      size="small"
    >
      <ToggleButton value="all">all</ToggleButton>
      <ToggleButton value="completed">completed</ToggleButton>
      <ToggleButton value="open">open</ToggleButton>
    </ToggleButtonGroup>
  );
}
