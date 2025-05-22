import { useState } from 'react';
import api from '../services/api';

function TodoForm({ onTodoAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    try {
      setIsSubmitting(true);
      const newTodo = await api.createTodo({
        title,
        description,
        completed: false
      });
      
      onTodoAdded(newTodo);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white rounded shadow">
      <div className="mb-3">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          placeholder="What needs to be done?"
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (optional)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          placeholder="Add details about this task..."
          rows="2"
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
      >
        {isSubmitting ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
}

export default TodoForm;