'use client';

import { useState } from 'react';
import { ThemeToggle } from './components/ThemeToggle';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  const addTodo = () => {
    if (inputText.trim() !== '') {
      setTodos([...todos, {
        id: Date.now(),
        text: inputText.trim(),
        completed: false
      }]);
      setInputText('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div 
      className="min-h-screen p-8 transition-colors"
      style={{ 
        backgroundColor: 'var(--background)', 
        color: 'var(--foreground)' 
      }}
    >
      <div className="max-w-md mx-auto">
        {/* Header with theme toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 
            className="text-3xl font-bold"
            style={{ color: 'var(--button-primary)' }}
          >
            Todo App
          </h1>
          <ThemeToggle />
        </div>
        
        {/* Add Todo Input */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 rounded-lg focus:outline-none transition-all duration-200"
            style={{
              backgroundColor: 'var(--input-bg)',
              borderColor: 'var(--input-border)',
              color: 'var(--foreground)',
              border: '1px solid var(--input-border)'
            }}
          />
          <button
            onClick={addTodo}
            className="px-6 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
            style={{
              backgroundColor: 'var(--button-primary)',
              color: 'white'
            }}
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p 
              className="text-center py-8"
              style={{ color: 'var(--text-muted)' }}
            >
              No tasks yet. Add one above!
            </p>
          ) : (
            todos.map(todo => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  todo.completed ? 'opacity-60' : ''
                }`}
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)'
                }}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: todo.completed ? 'var(--success)' : 'transparent',
                    borderColor: todo.completed ? 'var(--success)' : 'var(--text-muted)'
                  }}
                >
                  {todo.completed && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                
                <span
                  className={`flex-1 ${todo.completed ? 'line-through' : ''}`}
                  style={{
                    color: todo.completed ? 'var(--text-muted)' : 'var(--foreground)'
                  }}
                >
                  {todo.text}
                </span>
                
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-1 transition-colors hover:opacity-80"
                  style={{ color: 'var(--danger)' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div 
            className="mt-6 text-center text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            {todos.filter(todo => !todo.completed).length} of {todos.length} tasks remaining
          </div>
        )}
      </div>
    </div>
  );
}










