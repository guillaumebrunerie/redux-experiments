import { createAction, createReducer } from "./store-interface";

export interface Todo {
  id: string;
  message: string;
  completed: boolean;
}

export type Todos = {
  allIds: string[];
  byId: { [id: string]: Todo };
};

const initialState: Todos = {
  allIds: ["xxx", "yyy", "zzz"],
  byId: {
    xxx: { id: "xxx", message: "XXX", completed: false },
    yyy: { id: "yyy", message: "YYY", completed: false },
    zzz: { id: "zzz", message: "ZZZ", completed: false },
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
