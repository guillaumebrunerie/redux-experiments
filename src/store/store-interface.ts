// Common
export { createAction } from "@reduxjs/toolkit";

/* Uncomment exactly one of the blocks of code below */


////////// Regular React Redux /////////

/*
export { configureStore, createReducer } from "@reduxjs/toolkit";
export { Provider, useSelector, useDispatch } from "react-redux";
*/


////////// React Redux Tracked /////////

export { configureStore, createReducer } from "@reduxjs/toolkit";
export { Provider, useSelector, useDispatch } from "react-redux-tracked";


//////////// Solid-inspired ////////////

/*
export {
  configureStore,
  createReducer,
  Provider,
  useSelector,
  useDispatch,
} from "./solid-redux-js";
*/
