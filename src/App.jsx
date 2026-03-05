import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Check, Save, X } from "lucide-react";
import { toast } from "react-hot-toast";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/todos/`);
        if (!response.ok) {
          throw new Error("Unable to fetch todos");
        }
        const data = await response.json();
        setTodos(data);
      } catch {
        toast.error("Failed to load todos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!input.trim()) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/todos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input.trim(),
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to add todo");
      }

      const createdTodo = await response.json();
      setTodos((prevTodos) => [createdTodo, ...prevTodos]);
      toast.success("Todo added!");
      setInput("");
    } catch {
      toast.error("Failed to add todo");
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((item) => item.id === id);
    if (!todo) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to update todo");
      }

      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((item) => (item.id === id ? updatedTodo : item)),
      );
    } catch {
      toast.error("Failed to update todo");
    }
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setInput(text);
  };

  const saveEdit = async () => {
    if (!editingId || !input.trim()) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/todos/${editingId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to update todo");
      }

      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === editingId ? updatedTodo : todo)),
      );
      setEditingId(null);
      setInput("");
      toast.success("Todo updated!");
    } catch {
      toast.error("Failed to update todo");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setInput("");
    toast.info("Edit cancelled!");
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete todo");
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setEditingId(null);
      setInput("");
      toast.success("Todo deleted!");
    } catch {
      toast.error("Failed to delete todo");
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Todo App</h1>
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (editingId ? saveEdit() : addTodo())
              }
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
            />
            {editingId ? (
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-green-700 flex items-center gap-2 cursor-pointer"
              >
                <Save size={20} />
                Save
              </button>
            ) : (
              <button
                onClick={addTodo}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center gap-2 cursor-pointer"
              >
                <Plus size={20} />
                Add
              </button>
            )}
          </div>
          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 bg-white p-4 rounded border border-gray-200"
              >
                <button
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 cursor-pointer flex items-center justify-center ${
                    todo.completed
                      ? "bg-gray-800 border-gray-800"
                      : "border-gray-300"
                  }`}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed && <Check size={16} className="text-white" />}
                </button>
                <span
                  className={`flex-1 ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
                >
                  {todo.text}
                </span>
                <div className="flex-shrink-0 flex gap-2">
                  {editingId === todo.id ? (
                    <button
                      onClick={cancelEdit}
                      className="text-gray-400 hover:text-red-600 cursor-pointer"
                    >
                      <X size={20} />
                    </button>
                  ) : (
                    <button
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                      onClick={() => startEdit(todo.id, todo.text)}
                    >
                      <Edit2 size={18} />
                    </button>
                  )}

                  <button
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {!isLoading && todos.length === 0 && (
            <p className="text-center text-gray-400 mt-8">
              No todos yet. Add one to get started!
            </p>
          )}
          {isLoading && (
            <p className="text-center text-gray-400 mt-8">Loading todos...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
