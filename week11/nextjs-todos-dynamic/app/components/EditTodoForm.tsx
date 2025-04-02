"use client";

import { useRouter } from "next/navigation";
import { updateTodoAction } from "../actions";
import { Todo } from "../lib/types";

export default function EditTodoForm({ todo }: { todo: Todo }) {
  const router = useRouter();

  return (
    <form
      className="mb-6 max-w-md mx-auto flex flex-col gap-4"
      action={async (formData) => {
        const result = await updateTodoAction(todo.id, formData);
        if (result.message === "Todo updated successfully") {
          router.back();
        }
      }}
    >
      <div className="flex">
        <input
          type="text"
          name="title"
          placeholder="Enter a todo"
          required
          defaultValue={todo.title}
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
        <button
          onClick={() => {
            router.back();
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
