"use client";
import Link from "next/link";
import { deleteTodoAction, toggleTodoCompletionAction } from "../actions";
import { Todo } from "../lib/types";

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  return (
    <div className="max-w-md mx-auto space-y-2">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No Todos Found</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-white p-3 rounded shadow-stone-400"
            >
              <form
                action={async () => {
                  await toggleTodoCompletionAction(todo.id);
                }}
                className="flex items-center space-x-3"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={async () => {
                    await toggleTodoCompletionAction(todo.id);
                  }}
                  className="h-5 w-5 cursor-pointer"
                />
                <Link
                  href={`/${todo.id}/edit`}
                  className="hover:[&>span]:text-blue-500"
                >
                  <span
                    className={`${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-500"
                    }`}
                  >
                    {todo.title}
                  </span>
                </Link>
              </form>
              <form
                action={async () => {
                  await deleteTodoAction(todo.id);
                }}
              >
                <button
                  className="text-red-500 hover:text-red-700 border-2 border-red-500 rounded px-2 py-1 cursor-pointer"
                  type="submit"
                >
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
