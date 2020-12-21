import { Action, ActionTypes } from "../actions";

import { Todo } from "../interfaces";

export const todosReducer = (state: Todo[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_TODOS_SUCCESS:
      return [];
    case ActionTypes.GET_TODOS_SUCCESS:
      return action.payload;
    case ActionTypes.DELETE_TODO_SUCCESS:
      return state.filter((item: Todo) => item.id !== action.payload);
    default:
      return state;
  }
};
