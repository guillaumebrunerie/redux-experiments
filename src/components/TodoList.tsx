import { useSelector } from "../store/store-interface";
import { selectAllTodoIds } from "../store/selectors";
import Todo from "./Todo";

const TodoList = () => {
  const todoIds = useSelector(selectAllTodoIds);
  return (
    <div className="todoList">
      {todoIds.map((todoId) => (
        <Todo key={todoId} todoId={todoId} />
      ))}
    </div>
  );
};

export default TodoList;
