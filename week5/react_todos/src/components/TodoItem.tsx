import { Todo } from "../types";
import TodoButton from "./TodoButton";

function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div>
      <span>{todo.title}</span>
      <TodoButton completed={todo.completed} />
    </div>
  );
}

export default TodoItem;
