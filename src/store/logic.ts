import { memoize } from "./store-interface";
import type { Todo, Todos } from "./todos";

export const exportTodo = memoize((todo: Todo) => {
  console.log("---exportTodo", todo.message);
  return `${todo.message} ${todo.completed}`;
});

export const exportAllTodos = memoize((todos: Todos) => {
  console.log("---exportAllTodos");
  return todos.allIds
    .map((todoId) => exportTodo(todos.byId[todoId]))
    .join(" --- ");
});
