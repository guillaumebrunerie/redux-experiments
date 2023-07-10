import React, { useState } from "react";
import { useDispatch } from "../store/store-interface";
import { addTodo } from "../store/todos";

const TodoInput = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  return (
    <form
      className="todoInput"
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(
          addTodo({
            id: crypto.randomUUID(),
            message: inputValue,
            completed: false,
          }),
        );
        setInputValue("");
      }}
    >
      <label htmlFor="todo-input">Enter Todo Here</label>
      <input
        id="todo-input"
        value={inputValue}
        onChange={(event) => setInputValue(event.currentTarget.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoInput;
