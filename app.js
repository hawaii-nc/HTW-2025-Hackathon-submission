import { getAllTasks } from '../firebase-scripts/main.js';

document.addEventListener('DOMContentLoaded', async () => {
    const taskBoard = document.getElementById('task-board');
    const taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
    const modalTitle = document.getElementById('taskModalTitle');
    const modalDescription = document.getElementById('taskModalDescription');
    const modalBounty = document.getElementById('taskModalBounty');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let allTasks = [];

    const renderTasks = (filter = 'all') => {
        taskBoard.innerHTML = '';
        const filteredTasks = allTasks.filter(task => {
            if (filter === 'all') return true;
            return task.category === filter;
        });

        if (filteredTasks.length === 0) {
            taskBoard.innerHTML = '<p class="text-center">No tasks available for this category.</p>';
            return;
        }

        filteredTasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-4';
            taskCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${task.title}</h5>
                        <p class="card-text text-success">$${task.bounty}</p>
                        <p class="card-text">${task.description.substring(0, 100)}...</p>
                        <button class="btn btn-primary mt-auto">View Details</button>
                    </div>
                </div>
            `;

            taskCard.querySelector('.btn-primary').addEventListener('click', () => {
                modalTitle.textContent = task.title;
                modalDescription.textContent = task.description;
                modalBounty.textContent = `Bounty: $${task.bounty}`;
                taskModal.show();
            });

            taskBoard.appendChild(taskCard);
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            renderTasks(filter);
        });
    });

    // Initial Load
    try {
        allTasks = await getAllTasks();
        renderTasks(); // Render all tasks initially
    } catch (error) {
        console.error("Failed to load tasks:", error);
        taskBoard.innerHTML = '<p class="text-center text-danger">Could not load tasks. Please try again later.</p>';
    }
});