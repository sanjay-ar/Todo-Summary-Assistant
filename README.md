# Todo Summary Assistant

A full-stack web application that helps users manage todo items and generate AI-powered summaries that are sent to Slack.

## Demo video

[Todo Summary Assistant Demo](https://drive.google.com/file/d/1Iu_J1zRoevY6-38ImpbVRkIbCKhCWljM/view?usp=sharing)

## Features

- ✅ Create, edit, and delete todo items
- ✅ Mark todos as complete/incomplete
- ✅ AI-powered todo summarization using OpenAI
- ✅ Automatic Slack notifications with summaries
- ✅ Real-time updates and notifications
- ✅ Responsive design for all devices

## Tech Stack

### Frontend
- **React** - User interface library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Supabase** - Database and backend services
- **OpenAI API** - AI text generation
- **Slack Webhooks** - Slack integration

## Project Structure

```
todo-summary-assistant/
├── todo-summary-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.jsx
│   │   │   ├── TodoList.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   ├── SummaryButton.jsx
│   │   │   └── Header.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
└── todo-summary-backend/
    ├── src/
    │   ├── controllers/
    │   │   ├── todoController.js
    │   │   └── summaryController.js
    │   ├── services/
    │   │   ├── todoService.js
    │   │   ├── openaiService.js
    │   │   └── slackService.js
    │   ├── db/
    │   │   └── supabase.js
    │   └── routes/
    │       └── api.js
    ├── .env
    ├── package.json
    └── server.js
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- OpenAI API key
- Slack workspace and webhook URL

### Environment Variables

Create `.env` files in both frontend and backend directories:

#### Backend (.env)
```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/todo-summary-assistant.git
   cd todo-summary-assistant
   ```

2. **Setup Backend**
   ```bash
   cd todo-summary-backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../todo-summary-frontend
   npm install
   ```

4. **Database Setup**
   - Create a new project in Supabase
   - Run the following SQL to create the todos table:
   ```sql
   CREATE TABLE todos (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     title TEXT NOT NULL,
     description TEXT,
     completed BOOLEAN DEFAULT FALSE
   );
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd todo-summary-backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd todo-summary-frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## API Endpoints

### Todos
- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Summary
- `POST /api/summarize` - Generate AI summary and send to Slack

## Setup Instructions

### Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Go to Settings → API to get your project URL and anon key
3. Navigate to SQL Editor and run the database schema (provided above)
4. Add the URL and key to your backend `.env` file

### OpenAI API Setup

1. Create an account at https://platform.openai.com/
2. Navigate to API Keys and create a new secret key
3. Add the key to your backend `.env` file as `OPENAI_API_KEY`

### Slack Webhook Setup

1. Go to https://api.slack.com/apps and create a new app
2. Under "Features", select "Incoming Webhooks"
3. Activate incoming webhooks and create a new webhook for your desired channel
4. Copy the webhook URL and add it to your backend `.env` file as `SLACK_WEBHOOK_URL`

## Deployment

### Backend Deployment (Render/Heroku)

1. **Using Render:**
   - Connect your GitHub repository
   - Set environment variables in Render dashboard
   - Deploy the backend service

2. **Using Heroku:**
   ```bash
   heroku create your-app-name-backend
   heroku config:set SUPABASE_URL=your_url
   heroku config:set SUPABASE_KEY=your_key
   heroku config:set OPENAI_API_KEY=your_key
   heroku config:set SLACK_WEBHOOK_URL=your_webhook_url
   git push heroku main
   ```



## Architecture Decisions

### Why Node.js + Express?
- Rapid development and prototyping
- Large ecosystem of packages
- JavaScript consistency across frontend and backend
- Good performance for I/O intensive operations

### Why Supabase?
- Real-time capabilities out of the box
- Built-in authentication (if needed later)
- PostgreSQL with modern features
- Easy to set up and deploy

### Why OpenAI?
- High-quality text generation
- Easy-to-use API
- Good free tier for development
- Reliable service with good documentation

### Component Architecture
- **Separation of Concerns**: Each component has a single responsibility
- **Service Layer**: API calls centralized in service files
- **Error Handling**: Consistent error handling across all components
- **State Management**: Local state with React hooks for simplicity

## Development Guidelines

### Code Style
- Use ES6+ features consistently
- Follow React best practices and hooks patterns
- Implement proper error handling
- Add meaningful comments for complex logic

### Testing Strategy
- Manual testing for all user flows
- API endpoint testing with tools like Postman
- Integration testing for external services

### Security Considerations
- Environment variables for sensitive data
- Input validation on both frontend and backend
- CORS configuration for API endpoints
- Rate limiting for API endpoints (recommended for production)

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured correctly
   - Check that frontend is making requests to correct backend URL

2. **Supabase Connection Issues**
   - Verify URL and key are correct
   - Check if database table exists with correct schema

3. **OpenAI API Issues**
   - Ensure API key is valid and has credits
   - Check rate limits and quota

4. **Slack Integration Issues**
   - Verify webhook URL is correct
   - Check if webhook is active in Slack app settings

### Environment Setup Issues

- Ensure all environment variables are properly set
- Check that `.env` files are in correct directories
- Restart servers after changing environment variables

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature-name'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Demo

[Todo Summary Assistant Demo](https://drive.google.com/file/d/1Iu_J1zRoevY6-38ImpbVRkIbCKhCWljM/view?usp=sharing)

### Key Features Demonstrated:
1. **Todo Management** - Add, edit, delete, and mark todos as complete
2. **AI Summarization** - Generate intelligent summaries of your todo list
3. **Slack Integration** - Automatically send summaries to your Slack channel
4. **Real-time Updates** - Immediate feedback and notifications

---

**Built with ❤️ for efficient task management and team communication.**
