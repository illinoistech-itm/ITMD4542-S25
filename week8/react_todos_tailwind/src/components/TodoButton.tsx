import { TodoActions } from "../types";

function TodoButton({
  completed,
  actions,
  todoId,
}: {
  completed: boolean;
  actions: TodoActions;
  todoId: number;
}) {
  if (completed) {
    return (
      <button
        className="border border-gray-400 py-1 px-2 rounded bg-white"
        onClick={() => actions.handleDelete(todoId)}
      >
        Delete
      </button>
    );
  } else {
    return (
      <button
        className="border border-gray-400 py-1 px-2 rounded bg-white"
        onClick={() => actions.handleComplete(todoId)}
      >
        Complete
      </button>
    );
  }
}

export default TodoButton;
