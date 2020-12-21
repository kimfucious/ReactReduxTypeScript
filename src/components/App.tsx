import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearTodos, getTodos } from "../actions";
import { TodosState } from "../reducers";
import { TodosList } from "./TodosList";

export const App = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: TodosState) => state);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClearTodos = async (): Promise<void> => {
    try {
      setIsSpinning(true);
      await dispatch(clearTodos());
      setIsSpinning(false);
    } catch (error) {
      setIsSpinning(false);
      console.warn(error);
    }
  };

  const handleGetTodos = async (): Promise<void> => {
    try {
      setIsSpinning(true);
      await dispatch(getTodos());
      setIsSpinning(false);
    } catch (error) {
      setIsSpinning(false);
      console.warn(error);
    }
  };
  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center ${
        todos.length < 3 ? "vh-100" : "mb-5"
      }`}
    >
      <div className={`display-4 ${todos.length < 3 ? "" : "mt-5"}`}>
        Hi there
      </div>
      <button
        className="btn btn-lg btn-primary mt-3"
        disabled={isSpinning || !!todos.length}
        onClick={() => handleGetTodos()}
      >
        Fetch
      </button>
      {todos.length ? (
        <div className="d-flex flex-column align-items-center">
          <button
            className="btn link text-muted mt-2"
            onClick={() => {
              handleClearTodos();
            }}
          >
            clear
          </button>
          <TodosList todos={todos} />
        </div>
      ) : null}
    </div>
  );
};
