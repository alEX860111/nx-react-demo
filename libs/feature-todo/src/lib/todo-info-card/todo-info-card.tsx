import InfoIcon from '@mui/icons-material/Info';
import { Button, Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import { useTodoPage } from '@nx-react-demo/data-access-todo';
import { NavLink } from 'react-router-dom';

export function TodoInfoCard() {
  const [state] = useTodoPage('open');

  const getTitle = (openTodosCount: number) =>
    openTodosCount > 0
      ? `You have ${openTodosCount} open todos`
      : 'You have no open todos';

  const getButtonLabel = (openTodosCount: number) =>
    openTodosCount > 0 ? 'Show open todos' : 'Create todo';

  const getButtonLink = (openTodosCount: number) =>
    openTodosCount > 0 ? '/todos?show=open' : '/todos?show=all';

  return (
    <Card>
      <CardHeader
        title={
          state.loadablePage.isLoading ? (
            <Skeleton variant="text" height={25} />
          ) : (
            getTitle(state.loadablePage.data.totalItems)
          )
        }
        avatar={
          state.loadablePage.isLoading ? (
            <Skeleton variant="circular" width={25} height={25} />
          ) : (
            <InfoIcon />
          )
        }
      />
      <CardActions>
        {state.loadablePage.isLoading ? (
          <Skeleton width={150} height={36} />
        ) : (
          <Button
            component={NavLink}
            end
            to={getButtonLink(state.loadablePage.data.totalItems)}
          >
            {getButtonLabel(state.loadablePage.data.totalItems)}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
