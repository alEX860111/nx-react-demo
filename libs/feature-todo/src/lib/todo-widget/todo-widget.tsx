import React from 'react';
import { Todo } from '../todo';
import { TodoInput } from '../todo-input/todo-input';
import { TodoList } from '../todo-list/todo-list';
import { TodoService } from '../todo-service';

// eslint-disable-next-line
export interface TodoWidgetProps {
  todoService: TodoService;
}

interface State {
  todoList: Todo[];
}

export class TodoWidget extends React.Component<TodoWidgetProps, State> {
  constructor(props: TodoWidgetProps) {
    super(props);

    this.state = {
      todoList: [],
    };
    this.handleTodo = this.handleTodo.bind(this);
  }

  componentDidMount() {
    this.props.todoService
      .getTodos()
      .then((todoList) => this.setState({ todoList }));
  }

  private async handleTodo(todo: Todo) {
    const newTodoList = await this.props.todoService.addTodo(todo);
    this.setState(() => ({ todoList: newTodoList }));
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
