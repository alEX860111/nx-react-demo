import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { TodoStateFilter } from '@nx-react-demo/data-access-todo';
import { useContext, useState } from 'react';
import { TodoDispatch } from '../todo-context';

interface Props {
  filter: TodoStateFilter;
}

const all: TodoStateFilter = 'all';
const completed: TodoStateFilter = 'completed';
const open: TodoStateFilter = 'open';

export function TodoFilter(props: Props) {
  const dispatch = useContext(TodoDispatch);

  const [filter, setFilter] = useState<TodoStateFilter>(props.filter);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: TodoStateFilter
  ) => {
    if (newFilter) {
      setFilter(newFilter);
      dispatch({ type: 'ITEM_FILTER_REQUESTED', filter: newFilter });
    }
  };

  return (
    <ToggleButtonGroup
      value={filter}
      exclusive
      onChange={handleChange}
      orientation="horizontal"
      size="small"
    >
      <ToggleButton value={all}>{all}</ToggleButton>
      <ToggleButton value={completed}>{completed}</ToggleButton>
      <ToggleButton value={open}>{open}</ToggleButton>
    </ToggleButtonGroup>
  );
}
