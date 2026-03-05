const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error("API request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const fetchTodos = () => request("/todos/");

export const createTodo = (text) =>
  request("/todos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      completed: false,
    }),
  });

export const updateTodo = (id, payload) =>
  request(`/todos/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

export const removeTodo = (id) =>
  request(`/todos/${id}/`, {
    method: "DELETE",
  });
