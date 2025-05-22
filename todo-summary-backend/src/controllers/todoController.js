const todoService = require('../services/todoService');

const todoController = {
  async getAllTodos(req, res) {
    try {
      const todos = await todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  async createTodo(req, res) {
    try {
      const todo = req.body;
      const newTodo = await todoService.createTodo(todo);
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      await todoService.deleteTodo(id);
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedTodo = await todoService.updateTodo(id, updates);
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = todoController;