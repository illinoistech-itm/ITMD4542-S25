import { Link } from "react-router";
import { Todo, TodoActions } from "../types";
import TodoButton from "./TodoButton";

function TodoItem({ todo, actions }: { todo: Todo; actions: TodoActions }) {
  return (
    <div>
      <Link to={`/todos/${todo.id}`}>
        <span>{todo.title}</span>
      </Link>
      <TodoButton
        todoId={todo.id}
        actions={actions}
        completed={todo.completed}
      />
    </div>
  );
}

export default TodoItem;
