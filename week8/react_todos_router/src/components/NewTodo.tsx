import { useRef, useState } from "react";
import "./NewTodo.css";

function NewTodo({ onSaveTodo }: { onSaveTodo: (title: string) => void }) {
  const [input, setInput] = useState("");
  const inpt = useRef<HTMLInputElement | null>(null);

  return (
    <div className="new-todo-wrapper">
      <form
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
        />{" "}
        <button type="submit">Save Todo</button>
      </form>
    </div>
  );
}

export default NewTodo;
