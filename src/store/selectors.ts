import type { Todos } from "./todos";

export const selectAllTodoIds = (todos: Todos) => {
  console.log("selectAllTodoIds");
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
