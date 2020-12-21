import { ActionTypes } from "./types";
import { Dispatch } from "redux";
import {
  ClearTodosFail,
  ClearTodosStart,
  ClearTodosSuccess,
  DeleteTodosFail,
  DeleteTodosStart,
  GetTodosFail,
  GetTodosStart,
  GetTodosSuccess,
  Todo
} from "../interfaces";
import axios from "axios";

export const getTodos = () => async (dispatch: Dispatch) => {
  try {
    dispatch<GetTodosStart>({ type: ActionTypes.GET_TODOS_START });
    const { data } = await axios.get<Todo[]>(
      "https://jsonplaceholder.typicode.com/todos"
    );
    dispatch<GetTodosSuccess>({
      type: ActionTypes.GET_TODOS_SUCCESS,
      payload: data
    });
    return Promise.resolve(data);
  } catch (error) {
    console.warn(error);
    dispatch<GetTodosFail>({
      type: ActionTypes.GET_TODOS_FAIL,
      payload: error
    });
    return Promise.reject(error);
  }
};

export const clearTodos = () => async (dispatch: Dispatch) => {
  try {
    dispatch<ClearTodosStart>({ type: ActionTypes.CLEAR_TODOS_START });
    dispatch<ClearTodosSuccess>({ type: ActionTypes.CLEAR_TODOS_SUCCESS });
    return Promise.resolve();
  } catch (error) {
    console.warn(error);
    dispatch<ClearTodosFail>({
      type: ActionTypes.CLEAR_TODOS_FAIL,
      payload: error
    });
    return Promise.reject(error);
  }
};

export const deleteTodo = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch<DeleteTodosStart>({ type: ActionTypes.DELETE_TODO_START });
    dispatch({ type: ActionTypes.DELETE_TODO_SUCCESS, payload: id });
    return Promise.resolve();
  } catch (error) {
    console.warn(error);
    dispatch<DeleteTodosFail>({
      type: ActionTypes.DELETE_TODO_FAIL,
      payload: error
    });
    return Promise.reject(error);
  }
};
