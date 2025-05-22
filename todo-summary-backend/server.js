require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for now (we'll replace with Supabase later)
let todos = [
  {
    id: '1',
    title: 'Sample Todo',
    description: 'This is a sample todo item',
    completed: false,
    created_at: new Date().toISOString()
  }
];

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Todo Summary Assistant Backend is running!' });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Todo Routes
app.get('/api/todos', (req, res) => {
  console.log('📋 Fetching todos...');
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  console.log('➕ Creating todo:', req.body);
  
  const { title, description } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const newTodo = {
    id: Date.now().toString(),
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false,
    created_at: new Date().toISOString()
  };
  
  todos.unshift(newTodo); // Add to beginning of array
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  console.log('✏️ Updating todo:', req.params.id, req.body);
  
  const { id } = req.params;
  const updates = req.body;
  
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos[todoIndex] = { ...todos[todoIndex], ...updates };
  res.json(todos[todoIndex]);
});

app.delete('/api/todos/:id', (req, res) => {
  console.log('🗑️ Deleting todo:', req.params.id);
  
  const { id } = req.params;
  const initialLength = todos.length;
  
  todos = todos.filter(todo => todo.id !== id);
  
  if (todos.length === initialLength) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  res.json({ message: 'Todo deleted successfully' });
});

app.post('/api/summarize', (req, res) => {
  console.log('🤖 Generating summary...');
  
  if (todos.length === 0) {
    return res.status(400).json({ error: 'No todos found to summarize' });
  }
  
  // Mock summary for now (we'll add AI later)
  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.filter(todo => !todo.completed).length;
  
  const mockSummary = `📋 Todo Summary Report
  
📊 Overview:
• Total tasks: ${todos.length}
• Completed: ${completedCount}
• Pending: ${pendingCount}

📝 Pending Tasks:
${todos.filter(todo => !todo.completed).map(todo => `• ${todo.title}`).join('\n')}

✅ Completed Tasks:
${todos.filter(todo => todo.completed).map(todo => `• ${todo.title}`).join('\n')}

🎯 Keep up the great work! ${pendingCount > 0 ? `You have ${pendingCount} tasks left to complete.` : 'All tasks completed! 🎉'}`;

  // Mock Slack success
  console.log('📤 Mock: Sending to Slack...');
  
  res.json({ 
    message: 'Summary sent to Slack successfully',
    summary: mockSummary
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  console.log('❓ Route not found:', req.method, req.originalUrl);
  res.status(404).json({ error: 'Route not found' });
});

// Start server with error handling
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`🌍 Health check: http://localhost:${PORT}/health`);
  console.log(`📋 Todos API: http://localhost:${PORT}/api/todos`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ Port ${PORT} is already in use`);
    console.log('💡 Try these solutions:');
    console.log(`   1. Use a different port: PORT=3002 npm run dev`);
    console.log(`   2. Kill existing process: kill -9 $(lsof -ti:${PORT})`);
    console.log(`   3. Change PORT in your .env file`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

module.exports = app;