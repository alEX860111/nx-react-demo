import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import styles from './skeleton-todo-list-item.module.scss';

export function SkeletonTodoListItem() {
  return (
    <ListItem>
      <Skeleton variant="circular" width={25} height={25} />
      <ListItemText
        className={styles.todoContentSkeleton}
        primary={<Skeleton variant="rectangular" height={42} />}
      />
      <Skeleton variant="circular" width={25} height={25} />
    </ListItem>
  );
}
