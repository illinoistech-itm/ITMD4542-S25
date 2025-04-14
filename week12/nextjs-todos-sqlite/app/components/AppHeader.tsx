export default function AppHeader() {
  return (
    <header className="bg-gray-800 text-white p-8 flex flex-col items-center gap-2">
      <h1 className="font-bold text-4xl">NextJS Sqlite Todos</h1>
      <p className="text-gray-300">
        This is a simple Todo App using NextJS, Tailwind, and Sqlite as a
        database.
      </p>
    </header>
  );
}
