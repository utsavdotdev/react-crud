import { useState } from "react";
import { Plus, Edit2, Trash2, Check } from "lucide-react";
function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Go to Gym",
      completed: false,
    },
    {
      id: 2,
      text: "Eat Breakfast",
      completed: true,
    },
    {
      id: 3,
      text: "Do Homework",
      completed: false,
    },
  ]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    console.log("Add Todo");
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
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center gap-2"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 bg-white p-4 rounded border border-gray-200"
              >
                <button
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                    todo.completed
                      ? "bg-gray-800 border-gray-800"
                      : "border-gray-300"
                  }`}
                >
                  {todo.completed && <Check size={16} className="text-white" />}
                </button>
                <span
                  className={`flex-1 ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
                >
                  {todo.text}
                </span>
                <div className="flex-shrink-0 flex gap-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit2 size={18} />
                  </button>
                  <button className="text-gray-400 hover:text-red-500">
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
