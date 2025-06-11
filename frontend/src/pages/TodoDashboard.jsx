import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { todoAPI } from '../api/todoApi';
import TodoCard from '../components/todoCard';
import { Icons } from '../components/Icons';

const TodoDashboard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: ''
  });
  const [filter, setFilter] = useState('all'); // all, completed, pending
  
  const { logout } = useAuth();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoAPI.getTodos();
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const createdTodo = await todoAPI.createTodo(newTodo);
      setTodos(prev => [...prev, createdTodo]);
      setNewTodo({ title: '', description: '' });
      setShowForm(false);    } catch (error) {
      setError('Failed to create todo');
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = async (id, updatedData) => {
    try {
      const updatedTodo = await todoAPI.updateTodo(id, updatedData);
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));    } catch (error) {
      setError('Failed to update todo');
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    
    try {
      await todoAPI.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));    } catch (error) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <Icons.Spinner className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading your tasks...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="glass border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <Icons.TodoLogo className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Task Manager
                </h1>
                <p className="text-gray-400 text-sm">Stay organized, stay productive</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300 border border-red-500/20 hover:border-red-400/30"
            >
              <Icons.Logout className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                <Icons.BarChart className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Total Tasks</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500"
                style={{ width: stats.total > 0 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors">
                <Icons.CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-3xl font-bold text-white">{stats.completed}</p>
              </div>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500"
                style={{ width: stats.total > 0 ? `${(stats.completed / stats.total) * 100}%` : '0%' }}
              ></div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-500/20 rounded-xl group-hover:bg-yellow-500/30 transition-colors">
                <Icons.Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-3xl font-bold text-white">{stats.pending}</p>
              </div>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full transition-all duration-500"
                style={{ width: stats.total > 0 ? `${(stats.pending / stats.total) * 100}%` : '0%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex space-x-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'glass text-gray-300 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === 'pending'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/25'
                  : 'glass text-gray-300 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              Pending ({stats.pending})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === 'completed'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25'
                  : 'glass text-gray-300 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              Completed ({stats.completed})
            </button>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary px-6 py-3 rounded-xl font-semibold text-white flex items-center space-x-2"
          >
            {showForm ? (
              <>
                <Icons.X className="w-5 h-5" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Icons.Plus className="w-5 h-5" />
                <span>Add Task</span>
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl mb-6 backdrop-blur-sm slide-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Icons.X className="w-5 h-5 mr-3" />
                {error}
              </div>
              <button
                onClick={() => setError('')}
                className="text-red-400 hover:text-red-300"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Add Todo Form */}
        {showForm && (
          <div className="glass rounded-2xl p-8 mb-8 border border-white/10 slide-up">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg mr-3">
                <Icons.Plus className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Create New Task</h2>
            </div>
            <form onSubmit={handleCreateTodo} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
                  className="input-dark w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
                  placeholder="What needs to be done?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newTodo.description}
                  onChange={(e) => setNewTodo(prev => ({ ...prev, description: e.target.value }))}
                  className="input-dark w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 resize-none"
                  rows="4"
                  placeholder="Add more details about your task..."
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="btn-primary px-6 py-3 rounded-xl font-semibold text-white flex items-center space-x-2"
                >
                  <Icons.Save className="w-5 h-5" />
                  <span>Create Task</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
                >
                  <Icons.X className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-6">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-16">
              <div className="glass rounded-3xl p-12 border border-white/10 max-w-md mx-auto">
                <Icons.ClipboardList className="w-20 h-20 text-gray-500 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
                </h3>
                <p className="text-gray-400 mb-6">
                  {filter === 'all' 
                    ? 'Start by creating your first task to stay organized!' 
                    : `You don't have any ${filter} tasks at the moment.`
                  }
                </p>
                {filter === 'all' && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary px-6 py-3 rounded-xl font-semibold text-white inline-flex items-center space-x-2"
                  >
                    <Icons.Plus className="w-5 h-5" />
                    <span>Create Your First Task</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredTodos.map((todo, index) => (
                <div key={todo.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <TodoCard
                    todo={todo}
                    onUpdate={handleUpdateTodo}
                    onDelete={handleDeleteTodo}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoDashboard;