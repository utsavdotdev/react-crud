import { useState } from "react";
import { Plus } from "lucide-react";
function App() {
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
        </div>
      </div>
    </>
  );
}

export default App;
