import { Todo, TodoActions } from "../types";
import NewTodo from "./NewTodo";
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
  const newTodo = <NewTodo onSaveTodo={actions.handleSave} />;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-3xl">{headline}</h2>
      {completed ? null : newTodo}
      <ul className="bg-gray-200">
        {filteredTodos.map((todo) => {
          return (
            <li
              key={todo.id}
              className="border-b border-gray-400 last:border-b-0"
            >
              <TodoItem actions={actions} todo={todo} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
