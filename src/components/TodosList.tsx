import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../actions";
import { Todo } from "../interfaces";

interface todoListProps {
  todos: Todo[];
}

export const TodosList = (props: todoListProps) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState("");
  const handleDeleteItem = async (id: number): Promise<void> => {
    try {
      setIsDeleting(id.toString());
      await dispatch(deleteTodo(id));
      setIsDeleting("");
    } catch (error) {
      console.warn(error);
      setIsDeleting("");
    }
  };

  const renderTodos = (): JSX.Element[] =>
    props.todos.map((item: Todo) => (
      <li
        className={`d-flex list-group-item ${
          isDeleting === item.id.toString() ? "list-group-item-danger" : ""
        } justify-content-between`}
        key={item.id}
      >
        <div
          className="d-flex flex-column justify-content-center"
          style={{ fontSize: 18 }}
        >
          <div>
            <strong>ID:</strong> {item.id}
          </div>
          <div>
            <strong>Title:</strong> {item.title}
          </div>
          <div>
            <strong>Status:</strong>{" "}
            {item.completed ? "Complete" : "Incomplete"}
          </div>
        </div>
        <div className="d-flex align-items-center">
          <span
            onClick={() => handleDeleteItem(item.id)}
            role="img"
            aria-label="delete"
            style={{ cursor: "pointer", fontSize: 24 }}
          >
            🗑️
          </span>
        </div>
      </li>
    ));

  return (
    <div>
      <ul className="list-group mt-3">{renderTodos()}</ul>
    </div>
  );
};
