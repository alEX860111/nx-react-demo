import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

export function SkeletonTodoListItem() {
  return (
    <ListItem>
      <ListItemText primary={<Skeleton variant="text" />} />
      <ListItemSecondaryAction>
        <Skeleton variant="circular" width={25} height={25} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
