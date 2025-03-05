import { Link } from "react-router";
import { Todo, TodoActions } from "../types";
import TodoButton from "./TodoButton";

function TodoItem({ todo, actions }: { todo: Todo; actions: TodoActions }) {
  return (
    <div className="flex flex-row items-center justify-between p-2">
      <Link className="underline" to={`/todos/${todo.id}`}>
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
