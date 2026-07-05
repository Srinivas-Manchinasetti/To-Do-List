📝 To-Do List App

A clean, dark-themed to-do list built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies. Tasks persist locally in the browser via localStorage.


✨ Features


Add tasks — type and press Enter or click Add
Complete tasks — toggle with a custom circular checkbox
Edit in place — double-click a task (or click ✏️) to rename it, Enter to save, Esc to cancel
Delete tasks — remove any task with 🗑️
Filter tabs — switch between All, Active, and Done
Clear completed — bulk-remove all finished tasks in one click
Live task counter — header always shows how many tasks are left
Persistent storage — tasks are saved to localStorage, so they survive page refreshes
XSS-safe rendering — task text is escaped before being inserted into the DOM
Responsive, dark UI — cyan/blue theme that adapts to smaller screens


📂 Project Structure

├── index.html   # App markup / structure
├── style.css    # Dark theme styling, layout, and animations
└── app.js       # State management, rendering, and event logic

🚀 Getting Started

No build tools or installs required.


Clone or download the repository
Open index.html directly in your browser


bashgit clone <your-repo-url>
cd todo-list-app
open index.html   # or just double-click the file

🛠️ How It Works


State is kept in a single tasks array ({ id, text, completed }), with currentFilter tracking the active tab.
saveTasks() / loadTasks() sync that array to and from localStorage on every change and on page load.
renderTasks() re-draws the task list from scratch whenever state changes, based on the current filter (getFilteredTasks()).
Each rendered task wires up its own event listeners for checkbox toggling, editing, and deletion.


🎨 Tech Stack

LayerTechnologyStructureHTML5StylingCSS3 (custom properties, flexbox, keyframe animations)LogicVanilla JavaScript (ES6+)StorageBrowser localStorage

🔮 Possible Future Improvements


Drag-and-drop task reordering
Due dates / priority labels
Sync with a backend (Node.js + Express) instead of localStorage
Light/dark theme toggle

