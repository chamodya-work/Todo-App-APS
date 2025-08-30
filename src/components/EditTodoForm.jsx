import React, { useState } from "react";

export const EditTodoForm = ({ editTodo, task }) => {
  // Initialize state with the current task text for editing
  const [value, setValue] = useState(task.text);
  // State for handling validation error messages
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate input to prevent empty tasks
    if (!value.trim()) {
      setError("Task cannot be empty");
      return;
    }
    setError("");
    // Call the edit function with updated value and task ID
    editTodo(value, task.id);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          // Clear error on input change
          setError("");
        }}
        className="todo-input"
        placeholder="Update task"
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};
