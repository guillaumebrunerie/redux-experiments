import { createAction, createReducer } from "./store-interface";

export type Todo = {
  id: string;
  message: string;
  completed: boolean;
}

export type Todos = {
  allIds: string[];
  byId: { [id: string]: Todo };
};

const initialState: Todos = {
  allIds: ["a", "b", "c"],
  byId: {
    a: { id: "a", message: "First todo", completed: false },
    b: { id: "b", message: "Second todo", completed: false },
    c: { id: "c", message: "Third todo", completed: false },
  },
};

export const addTodo = createAction<Todo>("addTodo");
export const deleteTodo = createAction<string>("deleteTodo");
export const completeTodo = createAction<string>("completeTodo");

const todos = createReducer(initialState, (builder) =>
  builder
    .addCase(addTodo, (state, action) => {
      const todo = action.payload;
      state.allIds = [...state.allIds, todo.id];
      state.byId[todo.id] = todo;
    })
    .addCase(deleteTodo, (state, action) => {
      state.allIds = state.allIds.filter((id) => id !== action.payload);
      delete state.byId[action.payload];
    })
    .addCase(completeTodo, (state, action) => {
      state.byId[action.payload].completed =
        !state.byId[action.payload].completed;
    }),
);

export default todos;
