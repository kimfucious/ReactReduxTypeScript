import { combineReducers } from "redux";
import { Todo } from "../interfaces";
import { todosReducer } from "./todosReducer";

export interface TodosState {
  todos: Todo[];
}
export const reducers = combineReducers<TodosState>({
  todos: todosReducer
});
