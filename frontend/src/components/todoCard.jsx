import { useState } from 'react';
import { Icons } from './Icons';

const TodoCard = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
    completed: todo.completed
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(todo.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: todo.title,
      description: todo.description,
      completed: todo.completed
    });
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate(todo.id, { ...todo, completed: !todo.completed });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  return (
    <div className={`glass rounded-2xl p-6 border transition-all duration-300 hover:shadow-2xl ${
      todo.completed 
        ? 'border-green-500/30 bg-green-500/5 hover:border-green-400/50' 
        : 'border-white/10 hover:border-white/20'
    }`}>
      {isEditing ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="input-dark w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
              placeholder="Enter task title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={editData.description}
              onChange={handleChange}
              className="input-dark w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 resize-none"
              rows="4"
              placeholder="Enter task description"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="completed"
              checked={editData.completed}
              onChange={handleChange}
              className="mr-3 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-slate-700"
            />
            <label className="text-sm text-gray-300">Mark as completed</label>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="btn-primary px-6 py-3 rounded-xl font-semibold text-white flex items-center space-x-2"
            >
              <Icons.Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
            <button
              onClick={handleCancel}
              className="btn-secondary px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
            >
              <Icons.X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <button
                  onClick={handleToggleComplete}
                  className={`mr-4 p-2 rounded-xl transition-all duration-300 ${
                    todo.completed 
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                      : 'bg-slate-700/50 text-gray-400 hover:bg-indigo-500/20 hover:text-indigo-400'
                  }`}
                >
                  {todo.completed ? (
                    <Icons.CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icons.Clock className="w-5 h-5" />
                  )}
                </button>
                <h3 className={`text-lg font-semibold transition-all duration-300 ${
                  todo.completed 
                    ? 'line-through text-gray-500' 
                    : 'text-white'
                }`}>
                  {todo.title}
                </h3>
              </div>
              {todo.description && (
                <p className={`text-gray-400 ml-12 transition-all duration-300 ${
                  todo.completed ? 'line-through opacity-60' : ''
                }`}>
                  {todo.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                todo.completed
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              }`}>
                {todo.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center space-x-3">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-all duration-300 ${
                todo.completed 
                  ? 'bg-green-500/10 text-green-400' 
                  : 'bg-indigo-500/10 text-indigo-400'
              }`}>
                {todo.completed ? (
                  <>
                    <Icons.Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Done</span>
                  </>
                ) : (
                  <>
                    <Icons.Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">To Do</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-all duration-300"
              >
                <Icons.Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300"
              >
                <Icons.Delete className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoCard;