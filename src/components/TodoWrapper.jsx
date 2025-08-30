import React from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { useTodos } from "../hooks/useTodos";

export const TodoWrapper = () => {
  // Destructure hook values for managing todos, loading, errors, and updates
  const {
    isLoading,
    data: todos,
    create: handleCreate,
    update: handleUpdate,
    delete: handleDelete,
    error,
    localUpdate,
  } = useTodos();

  // Function to add a new todo via API
  const addTodo = async (text) => {
    await handleCreate({ text, completed: false });
  };

  // Function to toggle todo completion status
  const toggleComplete = async (id) => {
    const current = todos.find((t) => t.id === id);
    if (!current) return;
    await handleUpdate(id, { completed: !current.completed });
  };

  // Function to delete a todo
  const deleteTodo = async (id) => {
    await handleDelete(id);
  };

  // Function to toggle edit mode locally
  const editTodo = (id) => {
    const current = todos.find((t) => t.id === id);
    if (current) {
      localUpdate(id, { isEditing: !current.isEditing });
    }
  };

  // Function to update todo text and close edit mode
  const editTask = async (text, id) => {
    // Immediately close edit mode locally for better UX
    localUpdate(id, { isEditing: false });
    await handleUpdate(id, { text });
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {error.message && <div className="error">{error.message}</div>}
      {isLoading && <div className="loading">Loading...</div>}
      {todos.map((todo) =>
        // Conditionally render edit form or todo item
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
