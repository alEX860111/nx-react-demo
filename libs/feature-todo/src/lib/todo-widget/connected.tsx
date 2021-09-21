import withInjection from '../injection';
import { TodoService } from '../todo-service';
import { TodoWidget, TodoWidgetProps } from './todo-widget';

interface IInjectedProps {
  todoService: TodoService;
}
const x = withInjection<TodoWidgetProps, IInjectedProps>(TodoWidget, {
  todoService: 'foo',
});

export default x;
