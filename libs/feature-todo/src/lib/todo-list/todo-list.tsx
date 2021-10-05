import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import { Todo } from '../todo';
import { TodoListItem } from '../todo-list-item/todo-list-item';

interface Props {
  todoList: Todo[];
  loading: boolean;
  handleDeleteTodo: (todo: Todo) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {}

export class TodoList extends React.Component<Props, State> {
  private getSkeletons() {
    const indices = [...Array(5).keys()];
    return (
      <div>
        {indices.map((index) => (
          <Skeleton key={index} variant="text" height={48} />
        ))}
      </div>
    );
  }

  render() {
    return this.props.loading ? (
      this.getSkeletons()
    ) : (
      <List>
        {this.props.todoList.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            handleDeleteTodo={this.props.handleDeleteTodo}
          ></TodoListItem>
        ))}
      </List>
    );
  }
}
