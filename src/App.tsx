import * as React from "react";
import store from "./store/store";
import { Provider } from "./store/store-interface";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h2>A simple todo list app to experiment with Redux Toolkit</h2>
        <TodoInput />
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
