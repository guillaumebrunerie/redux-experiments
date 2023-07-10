import * as React from "react";
import { useSelector } from "../store/store-interface";
import {
  selectAllTodoIds,
  // selectAllExportedTodos,
} from "../store/selectors";
import Todo from "./Todo";

const TodoList: React.FC = () => {
  const todoIds = useSelector(selectAllTodoIds);
  // const exported = useSelector(selectAllExportedTodos);
  return (
    <div className="todoList">
      {todoIds.map((todoId) => (
        <Todo key={todoId} todoId={todoId} />
      ))}
      <div>{/*(exported: {exported})*/}</div>
    </div>
  );
};

export default TodoList;
