import {
  Page,
  Todo,
  TodoCreationData,
  TodoService,
  TodoServiceDIToken,
} from '@nx-react-demo/data-access-todo';
import { withInjection } from '@nx-react-demo/util-di';
import React from 'react';
import { TodoInput } from '../todo-input/todo-input';
import { TodoList } from '../todo-list/todo-list';

interface Props {
  todoService: TodoService;
  label: string;
}

interface State {
  todoPage: Page<Todo>;
  loading: boolean;
}

class TodoWidgetComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      todoPage: {
        index: 0,
        size: 5,
        items: [],
        totalItems: 0,
        totalPages: 0,
      },
      loading: false,
    };

    this.handleCreateTodo = this.handleCreateTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handlePageIndexChange = this.handlePageIndexChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true }, this.loadTodos);
  }

  private handleCreateTodo(todoCreationData: TodoCreationData) {
    this.setState(
      (state) => ({
        loading: true,
        todoPage: { ...state.todoPage, index: 0 },
      }),
      async () => {
        await this.props.todoService.addTodo(todoCreationData);
        await this.loadTodos();
      }
    );
  }

  private handleDeleteTodo(todo: Todo) {
    this.setState({ loading: true }, async () => {
      await this.props.todoService.deleteTodo(todo);
      this.setState(
        (state) => {
          const multiplePagesExist = state.todoPage.totalPages > 1;
          const lastPageIsViewed =
            state.todoPage.index === state.todoPage.totalPages - 1;
          const oneItemOnPage = state.todoPage.items.length === 1;
          const goBackOnPage =
            multiplePagesExist && lastPageIsViewed && oneItemOnPage;

          return {
            loading: true,
            todoPage: {
              ...state.todoPage,
              index: goBackOnPage
                ? state.todoPage.index - 1
                : state.todoPage.index,
              totalItems: state.todoPage.totalItems - 1,
              totalPages: goBackOnPage
                ? state.todoPage.totalPages - 1
                : state.todoPage.totalPages,
            },
          };
        },
        async () => {
          await this.loadTodos();
        }
      );
    });
  }

  private handlePageIndexChange(pageIndex: number) {
    this.setState(
      (state) => ({
        loading: true,
        todoPage: { ...state.todoPage, index: pageIndex },
      }),
      async () => {
        await this.loadTodos();
      }
    );
  }

  private handlePageSizeChange(pageSize: number) {
    this.setState(
      (state) => ({
        loading: true,
        todoPage: { ...state.todoPage, index: 0, size: pageSize },
      }),
      async () => {
        await this.loadTodos();
      }
    );
  }

  private async loadTodos(): Promise<void> {
    return this.props.todoService
      .getTodos(this.state.todoPage.index, this.state.todoPage.size)
      .then((todoPage) => this.setState({ todoPage, loading: false }));
  }

  render() {
    return (
      <>
        <h2>{this.props.label}</h2>
        <TodoInput onCreateTodo={this.handleCreateTodo}></TodoInput>
        <TodoList
          todoPage={this.state.todoPage}
          loading={this.state.loading}
          onDeleteTodo={this.handleDeleteTodo}
          onPageIndexChange={this.handlePageIndexChange}
          onPageSizeChange={this.handlePageSizeChange}
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
