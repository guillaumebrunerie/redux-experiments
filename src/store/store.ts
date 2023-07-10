import { configureStore } from "./store-interface";
import todos, { type Todos } from "./todos";

type AnyAction = {
  type: string;
};

const store = configureStore({
  reducer: todos,
});

export type AppDispatch = (action: AnyAction) => void;
export type AppState = Todos;

export default store;
