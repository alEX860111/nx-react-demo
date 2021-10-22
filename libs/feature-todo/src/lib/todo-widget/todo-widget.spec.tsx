import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { TodoWidget } from './todo-widget';

describe('TodoWidget', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SnackbarProvider maxSnack={3}>
        <TodoWidget label="My todos" />
      </SnackbarProvider>
    );

    expect(baseElement).toBeTruthy();
  });
});
