import { Todo } from "../types";
import TodoItem from "./TodoItem";

function TodoList({
  todos,
  headline,
  completed,
}: {
  todos: Todo[];
  headline: string;
  completed: boolean;
}) {
  const filteredTodos = todos.filter((todo) => todo.completed === completed);

  return (
    <>
      <h2>{headline}</h2>
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <TodoItem todo={todo} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default TodoList;
