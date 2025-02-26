import { Todo, TodoActions } from "../types";
import TodoItem from "./TodoItem";

function TodoList({
  todos,
  headline,
  completed,
  actions,
}: {
  todos: Todo[];
  headline: string;
  completed: boolean;
  actions: TodoActions;
}) {
  const filteredTodos = todos.filter((todo) => todo.completed === completed);

  return (
    <div>
      <h2>{headline}</h2>
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <TodoItem actions={actions} todo={todo} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
