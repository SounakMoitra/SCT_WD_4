# TaskMaster - To-Do Web App

A modern, feature-rich to-do application built with React, TypeScript, and Tailwind CSS.

## Features

### 🎯 Task Management
- **Add Tasks**: Create new tasks with title, description, due date/time, and priority
- **Edit Tasks**: Modify existing tasks with inline editing
- **Complete Tasks**: Mark tasks as completed with visual feedback
- **Delete Tasks**: Remove tasks with confirmation
- **Priority Levels**: Set tasks as Low, Medium, or High priority

### 📋 List Organization
- **Create Lists**: Organize tasks into different categories
- **Color Coding**: Each list has a unique color for easy identification
- **Filter by List**: View tasks from specific lists
- **List Management**: Create and manage multiple lists

### 📅 Date & Time Features
- **Due Dates**: Set specific due dates for tasks
- **Due Times**: Add specific times to tasks
- **Overdue Detection**: Visual indicators for overdue tasks
- **Relative Dates**: Shows "Today", "Tomorrow", or specific dates

### 🔍 Advanced Features
- **Sorting**: Sort tasks by due date, priority, or creation date
- **Filtering**: Filter by list and completion status
- **Search**: Find tasks quickly
- **Responsive Design**: Works perfectly on desktop and mobile
- **Data Persistence**: All data is saved locally in your browser

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SounakMoitra/SCT_WD_4.git
cd to-do-web-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Usage

### Creating Your First Task
1. Click the "Add Task" button in the header
2. Fill in the task details:
   - **Title** (required): The main task description
   - **Description** (optional): Additional details about the task
   - **Due Date**: When the task should be completed
   - **Due Time**: Specific time for the task
   - **Priority**: Low, Medium, or High
   - **List**: Choose which list to add the task to
3. Click "Add Task" to save

### Managing Lists
1. Click "New List" in the header
2. Enter a list name
3. Choose a color for the list
4. Click "Create List"

### Organizing Tasks
- Use the filter dropdown to view tasks from specific lists
- Sort tasks by different criteria using the sort dropdown
- Toggle "Show completed" to hide/show completed tasks
- Click the three dots on any task to edit or delete it

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Hooks with Local Storage
- **Icons**: Heroicons (SVG)

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # App header with navigation
│   ├── TaskList.tsx    # Main task list with filters
│   ├── TaskItem.tsx    # Individual task component
│   ├── AddTask.tsx     # Task creation/editing modal
│   └── AddList.tsx     # List creation modal
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── dateUtils.ts
└── App.tsx             # Main application component
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- [ ] Drag and drop task reordering
- [ ] Task categories and tags
- [ ] Recurring tasks
- [ ] Task sharing and collaboration
- [ ] Dark mode theme
- [ ] Export/import functionality
- [ ] Cloud synchronization
- [ ] Mobile app version
