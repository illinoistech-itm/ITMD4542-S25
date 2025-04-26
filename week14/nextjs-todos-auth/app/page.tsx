// import { auth } from "@/auth";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { getAllTodos } from "./lib/todos-postgres";

export default async function Home() {
  // const session = await auth();
  // if (!session) return <div>Not authenticated</div>;

  const todos = await getAllTodos();

  return (
    <div className="">
      <TodoForm />
      <TodoList todos={todos} />
    </div>
  );
}
