import { useRef, useState } from "react";
import "./NewTodo.css";

function NewTodo({ onSaveTodo }: { onSaveTodo: (title: string) => void }) {
  const [input, setInput] = useState("");
  const inpt = useRef<HTMLInputElement | null>(null);

  return (
    <div className="new-todo-wrapper">
      <form
        className="flex flex-row items-center gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Save Todo", input);
          onSaveTodo(input);
          setInput("");
          if (inpt.current) {
            inpt.current.focus();
          }
        }}
      >
        <label htmlFor="todoInput">New Todo</label>{" "}
        <input
          ref={inpt}
          onChange={(e) => setInput(e.target.value)}
          value={input}
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
  );
}

export default NewTodo;
