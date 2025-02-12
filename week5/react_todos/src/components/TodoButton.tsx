function TodoButton({ completed }: { completed: boolean }) {
  if (completed) {
    return <button>Delete</button>;
  } else {
    return <button>Complete</button>;
  }
}

export default TodoButton;
