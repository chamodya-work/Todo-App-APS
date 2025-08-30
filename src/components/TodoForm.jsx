import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  // State for the new task input value
  const [value, setValue] = useState("");
  // State for validation error messages
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate to prevent adding empty tasks
    if (!value.trim()) {
      setError("Task cannot be empty");
      return;
    }
    setError("");
    // Add the new task
    addTodo(value);
    // Clear input after submission
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <div className="form-row">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            // Clear error on input change
            setError("");
          }}
          className="todo-input"
          placeholder="What is the task today?"
        />
        <button type="submit" className="todo-btn">
          + Add Task
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
