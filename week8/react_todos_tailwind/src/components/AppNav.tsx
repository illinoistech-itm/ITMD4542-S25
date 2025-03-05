import { NavLink } from "react-router";

function AppNav() {
  return (
    <nav className="bg-gray-400">
      <ul className="flex flex-row justify-center">
        <li className="flex">
          <NavLink className="py-1.5 px-2 hover:bg-gray-300" to="/">
            Todos
          </NavLink>
        </li>
        <li className="flex">
          <NavLink className="py-1.5 px-2 hover:bg-gray-300" to="/completed">
            Completed
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
