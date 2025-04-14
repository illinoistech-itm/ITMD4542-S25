"use client";

import { addTodoAction } from "../actions";
import { useRef } from "react";

export default function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      className="mb-6 max-w-md mx-auto"
      action={async (formData) => {
        const result = await addTodoAction(formData);
        if (result.message === "Todo created successfully") {
          formRef.current?.reset();
        }
      }}
    >
      <div className="flex gap-2">
        <input
          type="text"
          name="title"
          placeholder="Enter a todo"
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}
