import React from 'react';
import { TodoInput } from '../todo-input/todo-input';
import { TodoList } from '../todo-list/todo-list';
import { Todo } from '../todo/todo';

interface Props {}

interface State {
  todoList: Todo[];
}

export class TodoWidget extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      todoList: [
        { id: 1, content: 'foo' },
        { id: 2, content: 'bar' },
      ],
    };

    this.handleTodo = this.handleTodo.bind(this);
  }

  private handleTodo(todo: Todo) {
    this.setState((previousState) => {
      const newTodoList: Todo[] = previousState.todoList.map((todo: Todo) => ({
        ...todo,
      }));
      newTodoList.push(todo);

      return { todoList: newTodoList };
    });
  }

  render() {
    return (
      <>
        <TodoInput handleTodo={this.handleTodo}></TodoInput>
        <TodoList todoList={this.state.todoList}></TodoList>
      </>
    );
  }
}
