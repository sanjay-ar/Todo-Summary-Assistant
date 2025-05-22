const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiService = {
  async summarizeTodos(todos) {
    try {
      const todoText = todos.map(todo => 
        `- ${todo.title}${todo.description ? `: ${todo.description}` : ''} (${todo.completed ? 'Completed' : 'Pending'})`
      ).join('\n');
      
      const prompt = `Please summarize the following todo list and provide insights:
      
${todoText}

Summarize the todos in a clear, concise way. Include:
1. Total count of todos (pending vs completed)
2. Group similar tasks if any
3. Suggestion for prioritization
4. A motivational message`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error in OpenAI service:', error);
      throw new Error('Failed to generate summary');
    }
  }
};

module.exports = openaiService;