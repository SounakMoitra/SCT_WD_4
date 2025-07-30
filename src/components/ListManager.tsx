import React, { useState } from 'react';
import type { List, Task } from '../types';

interface ListManagerProps {
  lists: List[];
  tasks: Task[];
  onDeleteList: (listId: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

const ListManager: React.FC<ListManagerProps> = ({ lists, tasks, onDeleteList, onClose, isOpen }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);

  const getTaskCount = (listId: string) => {
    return tasks.filter(task => task.listId === listId).length;
  };

  const getCompletedTaskCount = (listId: string) => {
    return tasks.filter(task => task.listId === listId && task.completed).length;
  };

  const handleDeleteClick = (listId: string) => {
    if (listId === 'default') {
      alert('Cannot delete the default list');
      return;
    }
    setShowConfirmDelete(listId);
  };

  const confirmDelete = (listId: string) => {
    onDeleteList(listId);
    setShowConfirmDelete(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-blue-900">Manage Lists</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {lists.map((list) => {
            const taskCount = getTaskCount(list.id);
            const completedCount = getCompletedTaskCount(list.id);
            const isDefault = list.id === 'default';
            
            return (
              <div
                key={list.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: list.color }}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {list.name}
                      {isDefault && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {completedCount} of {taskCount} tasks completed
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!isDefault && (
                    <button
                      onClick={() => handleDeleteClick(list.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      title="Delete list"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Confirmation Modal */}
        {showConfirmDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Delete List
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this list? All tasks in this list will also be deleted. This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmDelete(null)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDelete(showConfirmDelete)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListManager; 