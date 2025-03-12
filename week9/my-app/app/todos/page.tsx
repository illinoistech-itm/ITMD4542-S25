import { Suspense } from "react";
import TodoList from "../ui/TodoList";

export default function Page() {
  return (
    <div>
      <h1>Todos</h1>
      <Suspense fallback={<div>Loading todolist ...</div>}>
        <TodoList />
      </Suspense>
    </div>
  );
}
