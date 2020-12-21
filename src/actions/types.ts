import {
  ClearTodosSuccess,
  GetTodosSuccess,
  DeleteTodosSuccess
} from "../interfaces";

export type Action = ClearTodosSuccess | GetTodosSuccess | DeleteTodosSuccess;

export enum ActionTypes {
  CLEAR_TODOS_START,
  CLEAR_TODOS_SUCCESS,
  CLEAR_TODOS_FAIL,
  DELETE_TODO_START,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  GET_TODOS_START,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAIL
}
