import TodoList from "../components/TodoList";
import { getTodos } from "../lib/todos";

export default async function Page() {
  const newTodos = await getTodos(false);
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-center mb-6">New Todos</h1>
      <TodoList todos={newTodos} />
    </div>
  );
}
