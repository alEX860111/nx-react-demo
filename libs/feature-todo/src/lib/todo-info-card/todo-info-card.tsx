import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useTodoPage } from '@nx-react-demo/data-access-todo';
import { NavLink } from 'react-router-dom';

export function TodoInfoCard() {
  const [state] = useTodoPage({ completed: false });

  const getText = (openTodosCount: number) => {
    return openTodosCount > 0
      ? `You have ${openTodosCount} open todos`
      : 'You have no open todos';
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Todos
        </Typography>
        <Typography variant="body1">
          {state.loadablePage.isLoading ? (
            <Skeleton />
          ) : (
            getText(state.loadablePage.data.totalItems)
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={NavLink} exact to={'/todos'}>
          Open Todos
        </Button>
      </CardActions>
    </Card>
  );
}
