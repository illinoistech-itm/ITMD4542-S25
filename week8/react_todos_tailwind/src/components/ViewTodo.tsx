import { useNavigate, useParams } from "react-router";
import { Todo, TodoActions } from "../types";
import { useState } from "react";

function ViewTodo({ todos, actions }: { todos: Todo[]; actions: TodoActions }) {
  const params = useParams();
  const todo = todos.find((todo) => todo.id === Number(params.todoId));
  const [text, setText] = useState(todo?.title || "");
  const navigate = useNavigate();

  if (!todo) {
    return <h2>Todo not found</h2>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-3xl">View Todo {todo.id}</h2>
      <div className="view-todo-wrapper">
        <form
          className="flex flex-row items-center gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Update Todo", text);
            actions.handleUpdate(todo.id, text);
            navigate(todo.completed ? "/completed" : "/");
          }}
        >
          <label htmlFor="todoInput">Todo Text</label>{" "}
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            id="todoInput"
            className="border rounded border-gray-400 grow"
          />{" "}
          <button
            className="border border-gray-400 py-1 px-2 rounded bg-white"
            type="submit"
          >
            Save Todo
          </button>
        </form>
      </div>
    </div>
  );
}

export default ViewTodo;
