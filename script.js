// Task Manager App
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.completedTasks = this.loadCompletedTasks();
        this.currentEditingTask = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderTasks();
        this.renderCompletedTasks();
        this.updateStatistics();
        this.initializeTelegramWebApp();
    }

    initializeTelegramWebApp() {
        // Initialize Telegram Web App
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
            
            // Set theme colors
            const themeParams = window.Telegram.WebApp.themeParams;
            if (themeParams) {
                document.documentElement.style.setProperty('--tg-theme-bg-color', themeParams.bg_color);
                document.documentElement.style.setProperty('--tg-theme-text-color', themeParams.text_color);
                document.documentElement.style.setProperty('--tg-theme-hint-color', themeParams.hint_color);
                document.documentElement.style.setProperty('--tg-theme-button-color', themeParams.button_color);
                document.documentElement.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color);
            }
        }
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Add task button
        document.getElementById('add-task-btn').addEventListener('click', () => {
            this.openTaskModal();
        });

        document.getElementById('create-first-task').addEventListener('click', () => {
            this.openTaskModal();
        });

        // Modal controls
        document.getElementById('close-task-modal').addEventListener('click', () => {
            this.closeTaskModal();
        });

        document.getElementById('close-details-modal').addEventListener('click', () => {
            this.closeTaskDetailsModal();
        });

        document.getElementById('cancel-task').addEventListener('click', () => {
            this.closeTaskModal();
        });

        // Task form submission
        document.getElementById('task-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTask();
        });

        // Frequency change handler
        document.getElementById('task-frequency').addEventListener('change', (e) => {
            this.updateDaysSelector(e.target.value);
        });

        // Task details modal actions
        document.getElementById('complete-task').addEventListener('click', () => {
            this.completeTask();
        });

        document.getElementById('edit-task').addEventListener('click', () => {
            this.editTask();
        });

        document.getElementById('delete-task').addEventListener('click', () => {
            this.deleteTask();
        });

        // Filter changes
        document.getElementById('filter-frequency').addEventListener('change', () => {
            this.renderTasks();
        });

        document.getElementById('filter-period').addEventListener('change', () => {
            this.renderCompletedTasks();
        });

        // Close modals when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    // Restore body scroll when closing modal
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Handle Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open modal
                const taskModal = document.getElementById('task-modal');
                const detailsModal = document.getElementById('task-details-modal');
                
                if (taskModal.style.display === 'block') {
                    this.closeTaskModal();
                } else if (detailsModal.style.display === 'block') {
                    this.closeTaskDetailsModal();
                }
            }
        });
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Update statistics when switching to stats tab
        if (tabName === 'statistics') {
            this.updateStatistics();
        }
    }

    openTaskModal(task = null) {
        this.currentEditingTask = task;
        const modal = document.getElementById('task-modal');
        const title = document.getElementById('modal-title');
        
        if (task) {
            title.textContent = 'Редактировать задание';
            this.populateTaskForm(task);
        } else {
            title.textContent = 'Создать задание';
            document.getElementById('task-form').reset();
            // Set default days for weekly tasks
            this.updateDaysSelector('weekly');
        }
        
        modal.style.display = 'block';
        
        // Force modal to be scrollable
        setTimeout(() => {
            const modalBody = modal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.scrollTop = 0;
                // Add force-scroll class
                modalBody.classList.add('force-scroll');
                // Force scroll to be enabled
                modalBody.style.overflowY = 'auto';
                modalBody.style.webkitOverflowScrolling = 'touch';
                modalBody.style.maxHeight = 'calc(100vh - 200px)';
                
                // Ensure content is scrollable
                if (modalBody.scrollHeight > modalBody.clientHeight) {
                    modalBody.style.overflowY = 'auto';
                }
            }
        }, 100);
        
        // Prevent body scroll on mobile
        document.body.style.overflow = 'hidden';
    }

    closeTaskModal() {
        const modal = document.getElementById('task-modal');
        modal.style.display = 'none';
        this.currentEditingTask = null;
        
        // Remove force-scroll class
        const modalBody = modal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.classList.remove('force-scroll');
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    openTaskDetailsModal(task) {
        const modal = document.getElementById('task-details-modal');
        const content = document.getElementById('task-details-content');
        
        content.innerHTML = `
            <h4>${task.title}</h4>
            ${task.description ? `<p>${task.description}</p>` : ''}
            <div class="detail-item">
                <span class="detail-label">Частота:</span>
                <span class="detail-value">${this.getFrequencyText(task.frequency)}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Время:</span>
                <span class="detail-value">${task.time}</span>
            </div>
            ${task.days && task.days.length > 0 ? `
                <div class="detail-item">
                    <span class="detail-label">Дни:</span>
                    <span class="detail-value">${task.days.map(day => this.getDayText(day)).join(', ')}</span>
                </div>
            ` : ''}
            <div class="detail-item">
                <span class="detail-label">Приоритет:</span>
                <span class="detail-value">${this.getPriorityText(task.priority)}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Создано:</span>
                <span class="detail-value">${new Date(task.createdAt).toLocaleDateString('ru-RU')}</span>
            </div>
        `;
        
        modal.style.display = 'block';
        
        // Scroll to top of modal on mobile
        setTimeout(() => {
            const modalBody = modal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.scrollTop = 0;
                // Force scroll to be enabled
                modalBody.style.overflowY = 'auto';
                modalBody.style.webkitOverflowScrolling = 'touch';
            }
        }, 100);
        
        // Prevent body scroll on mobile
        document.body.style.overflow = 'hidden';
    }

    closeTaskDetailsModal() {
        document.getElementById('task-details-modal').style.display = 'none';
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    populateTaskForm(task) {
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description || '';
        document.getElementById('task-frequency').value = task.frequency;
        document.getElementById('task-time').value = task.time;
        document.getElementById('task-priority').value = task.priority;
        
        // Update days selector
        this.updateDaysSelector(task.frequency);
        if (task.days) {
            task.days.forEach(day => {
                const checkbox = document.querySelector(`input[value="${day}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
    }

    updateDaysSelector(frequency) {
        const daysSelector = document.getElementById('days-selector');
        if (frequency === 'weekly') {
            daysSelector.style.display = 'flex';
        } else {
            daysSelector.style.display = 'none';
            // Uncheck all days for non-weekly tasks
            document.querySelectorAll('#days-selector input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
        }
    }

    saveTask() {
        const formData = {
            title: document.getElementById('task-title').value.trim(),
            description: document.getElementById('task-description').value.trim(),
            frequency: document.getElementById('task-frequency').value,
            time: document.getElementById('task-time').value,
            priority: document.getElementById('task-priority').value,
            days: []
        };

        // Get selected days for weekly tasks
        if (formData.frequency === 'weekly') {
            document.querySelectorAll('#days-selector input[type="checkbox"]:checked').forEach(cb => {
                formData.days.push(cb.value);
            });
        }

        // Validation
        if (!formData.title) {
            this.showToast('Введите название задания', 'error');
            return;
        }

        if (formData.frequency === 'weekly' && formData.days.length === 0) {
            this.showToast('Выберите хотя бы один день для еженедельного задания', 'error');
            return;
        }

        if (this.currentEditingTask) {
            // Update existing task
            const index = this.tasks.findIndex(t => t.id === this.currentEditingTask.id);
            if (index !== -1) {
                this.tasks[index] = { ...this.tasks[index], ...formData };
                this.showToast('Задание обновлено', 'success');
            }
        } else {
            // Create new task
            const newTask = {
                id: Date.now().toString(),
                ...formData,
                createdAt: new Date().toISOString(),
                completedToday: false
            };
            this.tasks.push(newTask);
            this.showToast('Задание создано', 'success');
        }

        this.saveTasks();
        this.renderTasks();
        this.closeTaskModal();
    }

    completeTask() {
        if (!this.currentEditingTask) return;

        const today = new Date().toDateString();
        const completedTask = {
            ...this.currentEditingTask,
            completedAt: new Date().toISOString(),
            completedDate: today
        };

        this.completedTasks.push(completedTask);
        this.saveCompletedTasks();
        
        // Mark task as completed today
        const taskIndex = this.tasks.findIndex(t => t.id === this.currentEditingTask.id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].completedToday = true;
            this.saveTasks();
        }

        this.showToast('Задание выполнено!', 'success');
        this.closeTaskDetailsModal();
        this.renderTasks();
        this.renderCompletedTasks();
        this.updateStatistics();
    }

    editTask() {
        if (!this.currentEditingTask) return;
        
        this.closeTaskDetailsModal();
        this.openTaskModal(this.currentEditingTask);
    }

    deleteTask() {
        if (!this.currentEditingTask) return;

        if (confirm('Вы уверены, что хотите удалить это задание?')) {
            this.tasks = this.tasks.filter(t => t.id !== this.currentEditingTask.id);
            this.saveTasks();
            this.showToast('Задание удалено', 'success');
            this.closeTaskDetailsModal();
            this.renderTasks();
            this.updateStatistics();
        }
    }

    renderTasks() {
        const tasksList = document.getElementById('tasks-list');
        const emptyState = document.getElementById('empty-tasks');
        const filter = document.getElementById('filter-frequency').value;
        
        let filteredTasks = this.tasks;
        if (filter !== 'all') {
            filteredTasks = this.tasks.filter(task => task.frequency === filter);
        }

        if (filteredTasks.length === 0) {
            tasksList.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        tasksList.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');
        
        // Add event listeners to task items
        tasksList.querySelectorAll('.task-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('task-complete-btn')) {
                    this.currentEditingTask = this.tasks.find(t => t.id === item.dataset.taskId);
                    this.openTaskDetailsModal(this.currentEditingTask);
                }
            });
        });

        // Add event listeners to complete buttons
        tasksList.querySelectorAll('.task-complete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const taskId = btn.closest('.task-item').dataset.taskId;
                this.currentEditingTask = this.tasks.find(t => t.id === taskId);
                this.completeTask();
            });
        });
    }

    createTaskHTML(task) {
        const isCompletedToday = task.completedToday;
        const priorityClass = `priority-${task.priority}`;
        
        return `
            <div class="task-item" data-task-id="${task.id}">
                <div class="task-header">
                    <h3 class="task-title">${task.title}</h3>
                    <span class="task-priority ${priorityClass}">${this.getPriorityText(task.priority)}</span>
                </div>
                ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
                <div class="task-meta">
                    <div class="task-frequency">
                        <span>🔄</span>
                        <span>${this.getFrequencyText(task.frequency)}</span>
                    </div>
                    <div class="task-time">
                        <span>⏰</span>
                        <span>${task.time}</span>
                    </div>
                    ${task.days && task.days.length > 0 ? `
                        <div class="task-days">
                            <span>📅</span>
                            <span>${task.days.map(day => this.getDayText(day)).join(', ')}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="task-actions">
                    <button class="task-complete-btn" ${isCompletedToday ? 'disabled' : ''}>
                        ${isCompletedToday ? 'Выполнено' : 'Выполнить'}
                    </button>
                </div>
            </div>
        `;
    }

    renderCompletedTasks() {
        const completedList = document.getElementById('completed-list');
        const emptyState = document.getElementById('empty-completed');
        const filter = document.getElementById('filter-period').value;
        
        let filteredTasks = this.completedTasks;
        const today = new Date();
        
        switch (filter) {
            case 'today':
                filteredTasks = this.completedTasks.filter(task => 
                    new Date(task.completedDate).toDateString() === today.toDateString()
                );
                break;
            case 'week':
                const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                filteredTasks = this.completedTasks.filter(task => 
                    new Date(task.completedDate) >= weekAgo
                );
                break;
            case 'month':
                const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                filteredTasks = this.completedTasks.filter(task => 
                    new Date(task.completedDate) >= monthAgo
                );
                break;
        }

        if (filteredTasks.length === 0) {
            completedList.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        completedList.innerHTML = filteredTasks
            .sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))
            .map(task => this.createCompletedTaskHTML(task))
            .join('');
    }

    createCompletedTaskHTML(task) {
        return `
            <div class="completed-item">
                <div class="completed-header">
                    <h3 class="completed-title">${task.title}</h3>
                    <span class="completed-date">${new Date(task.completedDate).toLocaleDateString('ru-RU')}</span>
                </div>
                ${task.description ? `<p>${task.description}</p>` : ''}
            </div>
        `;
    }

    updateStatistics() {
        const today = new Date().toDateString();
        const completedToday = this.completedTasks.filter(task => 
            new Date(task.completedDate).toDateString() === today
        ).length;

        // Calculate streak
        const streak = this.calculateStreak();
        
        // Calculate completion rate
        const totalTasks = this.tasks.length;
        const completionRate = totalTasks > 0 ? Math.round((completedToday / totalTasks) * 100) : 0;

        // Update UI
        document.getElementById('streak-count').textContent = streak;
        document.getElementById('completed-today').textContent = completedToday;
        document.getElementById('completion-rate').textContent = `${completionRate}%`;
        document.getElementById('total-tasks').textContent = totalTasks;

        // Update progress chart
        this.updateProgressChart();
    }

    calculateStreak() {
        if (this.completedTasks.length === 0) return 0;

        const today = new Date();
        let streak = 0;
        let currentDate = new Date(today);

        while (true) {
            const dateString = currentDate.toDateString();
            const hasCompletedToday = this.completedTasks.some(task => 
                new Date(task.completedDate).toDateString() === dateString
            );

            if (hasCompletedToday) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    }

    updateProgressChart() {
        const chart = document.getElementById('progress-chart');
        const last7Days = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            last7Days.push(date.toDateString());
        }

        const chartData = last7Days.map(date => {
            const completed = this.completedTasks.filter(task => 
                new Date(task.completedDate).toDateString() === date
            ).length;
            return { date, completed };
        });

        const maxCompleted = Math.max(...chartData.map(d => d.completed), 1);
        
        chart.innerHTML = chartData.map((data, index) => {
            const height = (data.completed / maxCompleted) * 100;
            const dayName = new Date(data.date).toLocaleDateString('ru-RU', { weekday: 'short' });
            
            return `
                <div class="chart-bar" style="height: ${height}%">
                    <div class="chart-label">${dayName}</div>
                </div>
            `;
        }).join('');
    }

    getFrequencyText(frequency) {
        const frequencies = {
            'daily': 'Ежедневно',
            'weekly': 'Еженедельно',
            'monthly': 'Ежемесячно'
        };
        return frequencies[frequency] || frequency;
    }

    getPriorityText(priority) {
        const priorities = {
            'low': 'Низкий',
            'medium': 'Средний',
            'high': 'Высокий'
        };
        return priorities[priority] || priority;
    }

    getDayText(day) {
        const days = {
            'monday': 'Пн',
            'tuesday': 'Вт',
            'wednesday': 'Ср',
            'thursday': 'Чт',
            'friday': 'Пт',
            'saturday': 'Сб',
            'sunday': 'Вс'
        };
        return days[day] || day;
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div>${message}</div>
            <button class="toast-close">&times;</button>
        `;

        container.appendChild(toast);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        });
    }

    // Data persistence
    loadTasks() {
        const saved = localStorage.getItem('taskManager_tasks');
        return saved ? JSON.parse(saved) : [];
    }

    saveTasks() {
        localStorage.setItem('taskManager_tasks', JSON.stringify(this.tasks));
    }

    loadCompletedTasks() {
        const saved = localStorage.getItem('taskManager_completed');
        return saved ? JSON.parse(saved) : [];
    }

    saveCompletedTasks() {
        localStorage.setItem('taskManager_completed', JSON.stringify(this.completedTasks));
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});