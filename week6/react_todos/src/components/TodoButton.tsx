import { useContext } from "react";
import { TodoActions } from "../types";
import { ActionContext } from "../App";

function TodoButton({
  completed,
  actions,
  todoId,
}: {
  completed: boolean;
  actions: TodoActions;
  todoId: number;
}) {
  const todoActions = useContext(ActionContext);

  if (completed) {
    // return <button onClick={() => actions.handleDelete(todoId)}>Delete</button>;
    return (
      <button onClick={() => todoActions!.handleDelete(todoId)}>Delete</button>
    );
  } else {
    // return <button onClick={() => actions.handleComplete(todoId)}>Complete</button>;
    return (
      <button onClick={() => todoActions!.handleComplete(todoId)}>
        Complete
      </button>
    );
  }
}

export default TodoButton;
