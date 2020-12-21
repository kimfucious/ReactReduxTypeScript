import { ActionTypes } from "../actions";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
export interface ClearTodosStart {
  type: ActionTypes.CLEAR_TODOS_START;
}
export interface ClearTodosSuccess {
  type: ActionTypes.CLEAR_TODOS_SUCCESS;
}
export interface ClearTodosFail {
  type: ActionTypes.CLEAR_TODOS_FAIL;
  payload: Error;
}
export interface GetTodosStart {
  type: ActionTypes.GET_TODOS_START;
}
export interface GetTodosSuccess {
  type: ActionTypes.GET_TODOS_SUCCESS;
  payload: Todo[];
}
export interface GetTodosFail {
  type: ActionTypes.GET_TODOS_FAIL;
  payload: Error;
}

export interface DeleteTodosStart {
  type: ActionTypes.DELETE_TODO_START;
}
export interface DeleteTodosSuccess {
  type: ActionTypes.DELETE_TODO_SUCCESS;
  payload: number;
}
export interface DeleteTodosFail {
  type: ActionTypes.DELETE_TODO_FAIL;
  payload: Error;
}
