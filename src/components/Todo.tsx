import * as React from "react";
import cn from "classnames";
import { useSelector, useDispatch } from "../store/store-interface";
import { completeTodo, deleteTodo } from "../store/todos";
import { selectIsTodoCompleted, selectTodoMessage } from "../store/selectors";
// import {
//   selectExportedTodo,
// } from "../store/selectors";

const Todo = ({ todoId }: { todoId: string }) => {
  const dispatch = useDispatch();
  const message = useSelector(selectTodoMessage(todoId));
  const isCompleted = useSelector(selectIsTodoCompleted(todoId));
  // const exported = useSelector(selectExportedTodo(todoId));
  return (
    <div
      key={todoId}
      className={cn("todo", {
        completeTodo: isCompleted,
      })}
    >
      <input
        className="todoCheck"
        type="checkbox"
        checked={isCompleted}
        onChange={() => dispatch(completeTodo(todoId))}
      />
      <span className="todoMessage">{message}</span>
      <button
        type="button"
        className="todoDelete"
        onClick={() => dispatch(deleteTodo(todoId))}
      >
        X
      </button>
      {/*<span style={{color: "red"}}>{exported}</span>*/}
    </div>
  );
};

export default Todo;
