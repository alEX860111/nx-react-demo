import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {}

export class SkeletonTodoListItem extends React.Component<Props, State> {
  render() {
    return (
      <ListItem>
        <ListItemText primary={<Skeleton variant="text" />} />
        <ListItemSecondaryAction>
          <Skeleton variant="circular" width={25} height={25} />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}