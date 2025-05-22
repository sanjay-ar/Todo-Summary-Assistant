import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import SummaryButton from './SummaryButton';
import api from '../services/api';
import { toast } from 'react-hot-toast';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await api.getAllTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos. Please try again later.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTodoAdded = (newTodo) => {
    setTodos([newTodo, ...todos]);
    toast.success('Todo added successfully!');
  };

  const handleTodoUpdated = (updatedTodo) => {
    setTodos(todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  };

  const handleTodoDeleted = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.success('Todo deleted successfully!');
  };

  const handleGenerateSummary = async () => {
    try {
      const response = await api.generateSummary();
      setSummary(response.summary);
      toast.success('Summary sent to Slack!');
    } catch (error) {
      toast.error('Failed to generate summary.');
      console.error('Summary error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Todo Summary Assistant</h1>
      
      <TodoForm onTodoAdded={handleTodoAdded} />
      
      <div className="my-4">
        <SummaryButton 
          onGenerateSummary={handleGenerateSummary} 
          disabled={todos.length === 0}
        />
      </div>
      
      {summary && (
        <div className="my-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <h2 className="font-semibold mb-2">Generated Summary:</h2>
          <p className="whitespace-pre-line">{summary}</p>
        </div>
      )}
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Your Tasks</h2>
        
        {loading ? (
          <p className="text-center p-4">Loading todos...</p>
        ) : error ? (
          <p className="text-center text-red-500 p-4">{error}</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-500 p-4">No todos yet. Add one to get started!</p>
        ) : (
          <div>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onTodoUpdated={handleTodoUpdated}
                onTodoDeleted={handleTodoDeleted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;