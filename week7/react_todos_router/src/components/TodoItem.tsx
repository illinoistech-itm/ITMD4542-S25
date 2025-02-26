import { Todo, TodoActions } from "../types";
import TodoButton from "./TodoButton";

function TodoItem({ todo, actions }: { todo: Todo; actions: TodoActions }) {
  return (
    <div>
      <span>{todo.title}</span>
      <TodoButton
        todoId={todo.id}
        actions={actions}
        completed={todo.completed}
      />
    </div>
  );
}

export default TodoItem;
