// STATE — all tasks live here
let tasks = [];
let currentFilter = 'all';

// Load from localStorage on startup
function loadTasks() {
  const saved = localStorage.getItem('tasks');
  tasks = saved ? JSON.parse(saved) : [];
}

// Save to localStorage after every change
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  tasks.push({ id: Date.now(), text: trimmed, completed: false });
  saveTasks();
  renderTasks();
}

// Delete a task by id
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

// Toggle complete/incomplete
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

// Save edited task text
function saveEdit(id, newText) {
  const trimmed = newText.trim();
  if (!trimmed) return;

  tasks = tasks.map(task =>
    task.id === id ? { ...task, text: trimmed } : task
  );
  saveTasks();
  renderTasks();
}

// Clear all completed tasks
function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

// Filter tasks based on active tab
function getFilteredTasks() {
  if (currentFilter === 'active') return tasks.filter(t => !t.completed);
  if (currentFilter === 'done')   return tasks.filter(t =>  t.completed);
  return tasks;
}

// Update task count in header
function updateCount() {
  const remaining = tasks.filter(t => !t.completed).length;
  document.getElementById('taskCount').textContent =
    `${remaining} task${remaining !== 1 ? 's' : ''} left`;
}

// Prevent XSS
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// RENDER — redraws list on every state change
function renderTasks() {
  const list     = document.getElementById('taskList');
  const empty    = document.getElementById('emptyState');
  const filtered = getFilteredTasks();

  list.innerHTML = '';
  empty.style.display = filtered.length === 0 ? 'block' : 'none';

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} title="Mark complete" />
      <span class="task-text ${task.completed ? 'completed' : ''}" title="Double-click to edit">
        ${escapeHTML(task.text)}
      </span>
      <div class="task-actions">
        <button class="btn-icon btn-edit" title="Edit task">✏️</button>
        <button class="btn-icon btn-delete" title="Delete task">🗑️</button>
      </div>
    `;

    li.querySelector('input[type="checkbox"]').addEventListener('change', () => toggleTask(task.id));
    li.querySelector('.task-text').addEventListener('dblclick', () => startEditing(li, task));
    li.querySelector('.btn-edit').addEventListener('click', () => startEditing(li, task));
    li.querySelector('.btn-delete').addEventListener('click', () => deleteTask(task.id));

    list.appendChild(li);
  });

  updateCount();
}

// Switch task text to editable input
function startEditing(li, task) {
  const textSpan = li.querySelector('.task-text');
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'edit-input';
  input.value = task.text;

  li.replaceChild(input, textSpan);
  input.focus();
  input.select();

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveEdit(task.id, input.value);
    if (e.key === 'Escape') renderTasks();
  });
  input.addEventListener('blur', () => saveEdit(task.id, input.value));
}

// Event Listeners
document.getElementById('addBtn').addEventListener('click', () => {
  const input = document.getElementById('taskInput');
  addTask(input.value);
  input.value = '';
  input.focus();
});

document.getElementById('taskInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const input = document.getElementById('taskInput');
    addTask(input.value);
    input.value = '';
  }
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    renderTasks();
  });
});

document.getElementById('clearDoneBtn').addEventListener('click', clearCompleted);

// Init
loadTasks();
renderTasks();