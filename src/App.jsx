import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Check, Save, X } from "lucide-react";
function App() {
  const [todos, setTodos] = useState(() => {
    const stored_todos = localStorage.getItem("todos");
    return stored_todos ? JSON.parse(stored_todos) : [];
  });
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: input,
          completed: false,
        },
      ]);
      setInput("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setInput(text);
  };

  const saveEdit = () => {
    if (editingId && input.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: input } : todo,
        ),
      );
      setEditingId(null);
      setInput("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setInput("");
  };

  const deleteTodo = (id) => {
    const filter_todo = todos.filter((todo) => todo.id != id);
    setTodos(filter_todo);
    setEditingId(null);
    setInput("");
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
          {todos.length === 0 && (
            <p className="text-center text-gray-400 mt-8">
              No todos yet. Add one to get started!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
