import React, { useState } from 'react';
import type { Task, List } from '../types';
import { isOverdue, getRelativeDateText } from '../utils/dateUtils';

interface TaskItemProps {
  task: Task;
  list: List;
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, list, onToggleComplete, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-colors ${
            task.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {task.completed && (
            <svg className="w-3 h-3 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`text-sm font-medium ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`text-sm mt-1 ${
                  task.completed ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              )}

              <div className="flex items-center space-x-3 mt-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: list.color }}
                />
                <span className="text-xs text-gray-500">{list.name}</span>
                
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                  {getPriorityText(task.priority)}
                </span>

                                 {task.dueDate && task.dueDate instanceof Date && !isNaN(task.dueDate.getTime()) && (
                   <span className={`text-xs ${
                     isOverdue(task.dueDate) && !task.completed ? 'text-red-600 font-medium' : 'text-gray-500'
                   }`}>
                     {isOverdue(task.dueDate) && !task.completed ? 'Overdue' : getRelativeDateText(task.dueDate)}
                   </span>
                 )}
              </div>
            </div>

            <div className="flex-shrink-0 ml-2">
              <button
                onClick={() => setShowActions(!showActions)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showActions && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="flex-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="flex-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem; 