import styles from "./TodoList.module.css";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default async function TodoList() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const data = await response.json();
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <>
      <div>
        <h2>Todos list</h2>
        <ul className={styles.todoList}>
          {data.map((todo: Todo) => (
            <li className={styles.item} key={todo.id}>
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
