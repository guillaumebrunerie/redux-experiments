// import { exportAllTodos, exportTodo } from "./logic";
import type { Todos } from "./todos";

export const selectAllTodoIds = (todos: Todos) => {
  console.log("selectTodoIds");
  return todos.allIds;
};

export const selectTodoMessage = (id: string) => (todos: Todos) => {
  const todo = todos.byId[id];
  console.log("selectTodoMessage", todo.message);
  return todo.message;
};

export const selectIsTodoCompleted = (id: string) => (todos: Todos) => {
  const todo = todos.byId[id];
  console.log("selectIsTodoCompleted", todo.message, todo.completed);
  return todo.completed;
};

// export const selectExportedTodo = (id: string) => (todos: Todos) => {
// 	const todo = todos.byId[id];
// 	console.log("selectExportedTodo", todo.message);
// 	return exportTodo(todo);
// };

// export const selectAllExportedTodos = (todos: Todos) => {
// 	console.log("selectAllExportedTodos");
// 	return exportAllTodos(todos);
// };
