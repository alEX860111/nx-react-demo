import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useTodoPage } from '@nx-react-demo/data-access-todo';
import { NavLink } from 'react-router-dom';

export function TodoInfoCard() {
  const [state] = useTodoPage('open');

  const getText = (openTodosCount: number) =>
    openTodosCount > 0
      ? `You have ${openTodosCount} open todos`
      : 'You have no open todos';

  const getButtonLabel = (openTodosCount: number) =>
    openTodosCount > 0 ? 'Show open todos' : 'Create todo';

  const getButtonLink = (openTodosCount: number) =>
    openTodosCount > 0 ? '/todos?show=open' : '/todos?show=all';

  return (
    <Card>
      <CardContent>
        <Typography variant="body1">
          {state.loadablePage.isLoading ? (
            <Skeleton />
          ) : (
            getText(state.loadablePage.data.totalItems)
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={NavLink}
          end
          to={getButtonLink(state.loadablePage.data.totalItems)}
        >
          {getButtonLabel(state.loadablePage.data.totalItems)}
        </Button>{' '}
      </CardActions>
    </Card>
  );
}
