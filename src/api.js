import axios from "axios";

// Create an Axios instance with base configuration
const http = axios.create({
  baseURL: import.meta.env.VITE_MOCKAPI_BASE_URL,
  timeout: 5000,
  headers: {
    "content-type": "application/json",
  },
});  

// Interceptor to directly return response data
http.interceptors.response.use(({ data }) => data);

export const api = {
  todos: {
    // Fetch all todos, handle 404 as empty array
    getAll(params = {}) {
      return http
        .get("todos", { params })
        .catch((error) =>
          error?.response.status === 404 ? [] : Promise.reject(error)
        );
    },
    // Create a new todo
    create(data) {
      return http.post("todos", data);
    },
    // Update an existing todo by ID
    update(id, data) {
      return http.put(`todos/${id}`, data);
    },
    // Delete a todo by ID
    delete(id) {
      return http.delete(`todos/${id}`);
    },
  }
};