import List from '@mui/material/List';
import { PageParams } from '@nx-react-demo/util-data-access';
import { SkeletonTodoListItem } from '../skeleton-todo-list-item/skeleton-todo-list-item';

interface Props {
  pageParams: PageParams;
}

export function SkeletonTodoList(props: Props) {
  const indices = [...Array(props.pageParams.size).keys()];
  return (
    <List>
      {indices.map((index) => (
        <SkeletonTodoListItem key={index} />
      ))}
    </List>
  );
}
