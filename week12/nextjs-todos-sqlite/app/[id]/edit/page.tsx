import EditTodoForm from "@/app/components/EditTodoForm";
import { getAllTodos, getTodoById } from "@/app/lib/todos-sqlite";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const todo = await getTodoById(id);

  if (!todo) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Edit Todo</h1>
      <EditTodoForm todo={todo} />
    </div>
  );
}

export async function generateStaticParams() {
  const todos = await getAllTodos();

  return todos.map((todo) => ({
    id: todo.id,
  }));
}
