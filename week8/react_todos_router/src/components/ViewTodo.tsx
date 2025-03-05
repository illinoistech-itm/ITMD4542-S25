import { useNavigate, useParams } from "react-router";
import { Todo, TodoActions } from "../types";
import TodoItem from "./TodoItem";
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
    <div>
      <h2>View Todo {todo.id}</h2>
      <div className="view-todo-wrapper">
        <form
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
          />{" "}
          <button type="submit">Save Todo</button>
        </form>
      </div>
    </div>
  );
}

export default ViewTodo;
