import { getAllTasks } from '../firebase-scripts/main.js';

document.addEventListener('DOMContentLoaded', () => {
    const posterGrid = document.getElementById('posterGrid');

    if (!posterGrid) {
        console.error("The 'posterGrid' element was not found in the DOM.");
        return;
    }

    const fetchAndDisplayTasks = async () => {
        // Clear any existing static content (like the example posters)
        posterGrid.innerHTML = 'Loading tasks...';
        const tasks = await getAllTasks();

        // Clear the loading message
        posterGrid.innerHTML = '';

        if (tasks.length === 0) {
            posterGrid.innerHTML = '<p class="subtitle">No tasks available right now. Check back later!</p>';
            return;
        }

        tasks.forEach(task => {
            const card = document.createElement('div');
            // Use the category from Firestore to add the correct class for filtering
            card.className = `col-12 col-md-6 col-lg-4 poster-card ${task.category || ''}`;
            
            // Store the task ID on the element for future use (e.g., clicking to see details)
            card.dataset.taskId = task.id;

            card.innerHTML = `
              <div class="poster">
                <div class="poster-header">${task.title}</div>
                <div class="poster-body">
                  <p>${task.description}</p>
                  <p class="bounty">🌺 Bounty: ${task.bounty} Points</p>
                  <p class="status ${task.status.toLowerCase()}">${task.status.toUpperCase()}</p>
                </div>
                <div class="poster-footer">
                  <div class="poster-image no-image">NO IMAGE</div>
                </div>
              </div>
            `;

            // You can add click event listeners here to lead to a task details page
            card.addEventListener('click', () => {
                console.log(`Clicked task ID: ${task.id}`);
                // For example, you could redirect to a new page:
                // window.location.href = `/task-details.html?id=${task.id}`;
            });

            posterGrid.appendChild(card);
        });
    };

    fetchAndDisplayTasks();
});
