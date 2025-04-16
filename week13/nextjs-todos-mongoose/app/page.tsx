import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { getAllTodos } from "./lib/todos-mongoose";

export default async function Home() {
  const todos = await getAllTodos();

  return (
    <div className="">
      <TodoForm />
      <TodoList todos={todos} />
    </div>
  );
}
