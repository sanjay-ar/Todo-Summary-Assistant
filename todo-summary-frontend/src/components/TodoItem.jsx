import { useState } from 'react';
import api from '../services/api';

function TodoItem({ todo, onTodoUpdated, onTodoDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [completed, setCompleted] = useState(todo.completed);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async () => {
    try {
      setIsLoading(true);
      const updatedTodo = await api.updateTodo(todo.id, { 
        completed: !completed 
      });
      setCompleted(updatedTodo.completed);
      onTodoUpdated(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await api.deleteTodo(todo.id);
      onTodoDeleted(todo.id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) return;
    
    try {
      setIsLoading(true);
      const updatedTodo = await api.updateTodo(todo.id, {
        title,
        description,
        completed
      });
      onTodoUpdated(updatedTodo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="p-4 mb-2 bg-white rounded shadow">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          rows="2"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-3 py-1 bg-gray-200 rounded"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-3 py-1 bg-blue-500 text-white rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 mb-2 rounded shadow flex items-start justify-between ${completed ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex items-start flex-1">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggleComplete}
          disabled={isLoading}
          className="mt-1 mr-3"
        />
        <div>
          <h3 className={`font-medium ${completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`text-sm mt-1 ${completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {todo.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex space-x-2 ml-4">
        <button
          onClick={() => setIsEditing(true)}
          className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          disabled={isLoading}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
          disabled={isLoading}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;