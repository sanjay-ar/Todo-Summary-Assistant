const todoService = require('../services/todoService');
const openaiService = require('../services/openaiService');
const slackService = require('../services/slackService');

const summaryController = {
  async summarizeAndSend(req, res) {
    try {
      // Get all todos
      const todos = await todoService.getAllTodos();
      
      if (todos.length === 0) {
        return res.status(400).json({ error: 'No todos found to summarize' });
      }
      
      // Generate summary with OpenAI
      const summary = await openaiService.summarizeTodos(todos);
      
      // Send to Slack
      await slackService.sendToSlack(summary);
      
      res.status(200).json({ 
        message: 'Summary sent to Slack successfully',
        summary
      });
    } catch (error) {
      console.error('Summarize error:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = summaryController;