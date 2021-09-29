import { withInjection } from '@nx-react-demo/util-di';
import React from 'react';
import { Todo } from '../todo';
import { TodoInput } from '../todo-input/todo-input';
import { TodoList } from '../todo-list/todo-list';
import { TodoService } from '../todo-service';

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
        <h2>{this.props.label}</h2>
        <TodoInput handleTodo={this.handleTodo}></TodoInput>
        <TodoList todoList={this.state.todoList}></TodoList>
      </>
    );
  }
}

type InjectedProps = Pick<Props, 'todoService'>;

export const TodoWidget = withInjection<Props, InjectedProps>(
  TodoWidgetComponent,
  {
    todoService: 'foo',
  }
);
