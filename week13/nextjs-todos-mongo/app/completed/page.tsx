import TodoList from "../components/TodoList";
import { getTodos } from "../lib/todos-mongo";

export default async function Page() {
  const completedTodos = await getTodos(true);
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-center mb-6">Completed Todos</h1>
      <TodoList todos={completedTodos} />
    </div>
  );
}
