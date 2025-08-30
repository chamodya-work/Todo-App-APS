import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      <p
        // Apply 'completed' class if task is done, otherwise 'incompleted'
        className={`${task.completed ? "completed" : "incompleted"}`}
        // Toggle completion status on click
        onClick={() => toggleComplete(task.id)}
      >
        {task.text}
      </p>
      <div>
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          // Trigger edit mode on click
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          // Delete the task on click
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  );
};
