import { TodoPageStateAction } from '@nx-react-demo/data-access-todo';
import React from 'react';

export const TodoDispatch = React.createContext<
  React.Dispatch<TodoPageStateAction>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>(() => {});
