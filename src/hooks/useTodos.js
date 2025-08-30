import { useState, useEffect } from 'react';
import { api } from '../api';

export function useTodos() {
  // State for storing the list of todos
  const [todos, setTodos] = useState([]);
  // State for filters (not currently used but available for future expansion)
  const [filters, setFilters] = useState({});
  // State for error messages from API operations
  const [errorMessage, setErrorMessage] = useState();
  // State for loading indicator during API calls
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch todos from API
  async function fetchTodos() {
    setIsLoading(true);
    try {
      const data = await api.todos.getAll(filters);
      // Map API data to local state format
      const mapped = data.map(todo => ({
        id: todo.id,
        text: todo.text,
        completed: todo.completed,
        isEditing: false
      }));
      setTodos(mapped);
    } catch (error) {
      setErrorMessage("Failed to fetch todos: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch todos on component mount or when filters change
  useEffect(() => {
    fetchTodos();
  }, [filters]);

  // Function to create a new todo
  async function handleCreate(newTodo) {
    setIsLoading(true);
    try {
      const apiData = {
        text: newTodo.text,
        completed: newTodo.completed || false
      };
      await api.todos.create(apiData);
      // Refresh list after creation
      await fetchTodos();
    } catch (error) {
      setErrorMessage("Failed to create todo: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Function to update an existing todo
  async function handleUpdate(id, updates) {
    setIsLoading(true);
    try {
      const current = todos.find(t => t.id === id);
      if (!current) return;
      const updatedTodo = { ...current, ...updates };
      // Remove local-only 'isEditing' from API data
      delete updatedTodo.isEditing;
      const apiData = {
        ...updatedTodo,
        text: updatedTodo.text || current.text,
        completed: updatedTodo.completed ?? current.completed
      };
      await api.todos.update(id, apiData);
      // Refresh list after update
      await fetchTodos();
    } catch (error) {
      setErrorMessage("Failed to update todo: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Function to delete a todo
  async function handleDelete(id) {
    setIsLoading(true);
    try {
      await api.todos.delete(id);
      // Refresh list after deletion
      await fetchTodos();
    } catch (error) {
      setErrorMessage("Failed to delete todo: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Function for local state updates without API call (e.g., toggling edit mode)
  const localUpdate = (id, updates) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  return {
    isLoading,
    data: todos,
    fetch: fetchTodos,
    filter: setFilters,
    create: handleCreate,
    update: handleUpdate,
    delete: handleDelete,
    localUpdate,
    error: {
      message: errorMessage,
      // Method to clear error message
      clear: () => setErrorMessage(),
    }
  };
}