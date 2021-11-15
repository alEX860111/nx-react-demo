import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { TodoFilterData } from '@nx-react-demo/data-access-todo';
import { useContext, useState } from 'react';
import { TodoDispatch } from '../todo-context';

type FilterValue = 'all' | 'completed' | 'open';

interface Props {
  filter: TodoFilterData;
}

export function TodoFilter(props: Props) {
  const dispatch = useContext(TodoDispatch);

  const getFilterValue = (filter: TodoFilterData): FilterValue => {
    if (filter.completed === true) {
      return 'completed';
    } else if (filter.completed === false) {
      return 'open';
    } else {
      return 'all';
    }
  };

  const getTodoFilterData = (filterValue: FilterValue): TodoFilterData => {
    if (filterValue === 'completed') {
      return { completed: true };
    } else if (filterValue === 'open') {
      return { completed: false };
    } else {
      return {};
    }
  };

  const [filterValue, setFilterValue] = useState<FilterValue>(
    getFilterValue(props.filter)
  );

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    filterValue: FilterValue
  ) => {
    setFilterValue(filterValue);
    const filter: TodoFilterData = getTodoFilterData(filterValue);
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
