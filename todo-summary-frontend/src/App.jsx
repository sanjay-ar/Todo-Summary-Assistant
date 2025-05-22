import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <Header />
      <main className="container mx-auto py-8 px-4">
        <TodoList />
      </main>
    </div>
  );
}

export default App;