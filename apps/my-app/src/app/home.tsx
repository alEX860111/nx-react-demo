import Typography from '@mui/material/Typography';
import { TodoInfoCard } from '@nx-react-demo/feature-todo';

export function Home() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Welcome
      </Typography>
      <TodoInfoCard />
    </>
  );
}
