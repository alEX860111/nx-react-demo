import { SnackbarProvider } from 'notistack';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/app';

ReactDOM.render(
  <StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <App />
    </SnackbarProvider>
  </StrictMode>,
  document.getElementById('root')
);
