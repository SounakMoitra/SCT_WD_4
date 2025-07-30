import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Task, List, TaskFormData } from './types';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import AddList from './components/AddList';
import ListManager from './components/ListManager';
import './App.css';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [lists, setLists] = useLocalStorage<List[]>('lists', [
    {
      id: 'default',
      name: 'General',
      color: '#3B82F6',
      createdAt: new Date()
    }
  ]);
  
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddList, setShowAddList] = useState(false);
  const [showListManager, setShowListManager] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = (taskData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || undefined,
      completed: false,
      dueDate: taskData.dueDate && taskData.dueTime 
        ? new Date(`${taskData.dueDate}T${taskData.dueTime}`)
        : taskData.dueDate 
        ? new Date(taskData.dueDate)
        : undefined,
      priority: taskData.priority,
      listId: taskData.listId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (taskData: TaskFormData) => {
    if (!editingTask) return;

    const updatedTask: Task = {
      ...editingTask,
      title: taskData.title,
      description: taskData.description || undefined,
      dueDate: taskData.dueDate && taskData.dueTime 
        ? new Date(`${taskData.dueDate}T${taskData.dueTime}`)
        : taskData.dueDate 
        ? new Date(taskData.dueDate)
        : undefined,
      priority: taskData.priority,
      listId: taskData.listId,
      updatedAt: new Date()
    };

    setTasks(prev => prev.map(task => 
      task.id === editingTask.id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId 
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const editTask = (task: Task) => {
    setEditingTask(task);
    setShowAddTask(true);
  };

  const addList = (listData: Omit<List, 'id' | 'createdAt'>) => {
    const newList: List = {
      id: Date.now().toString(),
      name: listData.name,
      color: listData.color,
      createdAt: new Date()
    };

    setLists(prev => [...prev, newList]);
  };

  const deleteList = (listId: string) => {
    if (listId === 'default') return; // Prevent deleting default list
    
    setLists(prev => prev.filter(list => list.id !== listId));
    setTasks(prev => prev.filter(task => task.listId !== listId));
  };

  const handleAddTask = (taskData: TaskFormData) => {
    if (editingTask) {
      updateTask(taskData);
    } else {
      addTask(taskData);
    }
  };

  const handleCloseAddTask = () => {
    setShowAddTask(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onAddTask={() => setShowAddTask(true)}
        onAddList={() => setShowAddList(true)}
        onManageLists={() => setShowListManager(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        <TaskList
          tasks={tasks}
          lists={lists}
          onToggleComplete={toggleTaskComplete}
          onEdit={editTask}
          onDelete={deleteTask}
        />
      </main>

      <AddTask
        isOpen={showAddTask}
        onClose={handleCloseAddTask}
        onAdd={handleAddTask}
        lists={lists}
        editingTask={editingTask}
      />

      <AddList
        isOpen={showAddList}
        onClose={() => setShowAddList(false)}
        onAdd={addList}
      />

      <ListManager
        lists={lists}
        tasks={tasks}
        onDeleteList={deleteList}
        onClose={() => setShowListManager(false)}
        isOpen={showListManager}
      />
    </div>
  );
}

export default App;
