import { withInjection } from '@nx-react-demo/util-di';
import React from 'react';
import { Todo } from '../todo';
import { TodoCreationData } from '../todo-creation-data';
import { TodoInput } from '../todo-input/todo-input';
import { TodoList } from '../todo-list/todo-list';
import { TodoService, TodoServiceDIToken } from '../todo-service';

interface Props {
  todoService: TodoService;
  label: string;
}

interface State {
  todoList: Todo[];
}

class TodoWidgetComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      todoList: [],
    };

    this.handleTodoCreationData = this.handleTodoCreationData.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
  }

  componentDidMount() {
    this.props.todoService
      .getTodos()
      .then((todoList) => this.setState({ todoList }));
  }

  private async handleTodoCreationData(todoCreationData: TodoCreationData) {
    await this.props.todoService.addTodo(todoCreationData);

    this.props.todoService
      .getTodos()
      .then((todoList) => this.setState({ todoList }));
  }

  private async handleDeleteTodo(todo: Todo) {
    await this.props.todoService.deleteTodo(todo);

    this.props.todoService
      .getTodos()
      .then((todoList) => this.setState({ todoList }));
  }

  render() {
    return (
      <>
        <h2>{this.props.label}</h2>
        <TodoInput
          handleTodoCreationData={this.handleTodoCreationData}
        ></TodoInput>
        <TodoList
          todoList={this.state.todoList}
          handleDeleteTodo={this.handleDeleteTodo}
        ></TodoList>
      </>
    );
  }
}

type InjectedProps = Pick<Props, 'todoService'>;

export const TodoWidget = withInjection<Props, InjectedProps>(
  TodoWidgetComponent,
  {
    todoService: TodoServiceDIToken,
  }
);
