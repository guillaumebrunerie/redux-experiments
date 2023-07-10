import { configureStore } from "./store-interface";
import todos from "./todos";

const store = configureStore({
  reducer: todos,
});

export default store;
