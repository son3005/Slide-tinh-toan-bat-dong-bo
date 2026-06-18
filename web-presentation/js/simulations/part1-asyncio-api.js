// js/simulations/part1-asyncio-api.js

export function init() {
    const kws = document.querySelectorAll('.interactive-kw');
    const views = document.querySelectorAll('.state-view');

    let currentAnimId = 0;

    kws.forEach(kw => {
        kw.addEventListener('click', () => {
            // Remove active from all keywords
            kws.forEach(k => k.classList.remove('active'));
            // Add active to clicked
            kw.classList.add('active');

            // Hide all views
            views.forEach(v => v.classList.remove('active'));

            // Show target view
            const targetId = `state-${kw.getAttribute('data-target')}`;
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.add('active');
            }

            // Handle specific animations
            if (targetId === 'state-await') {
                runAwaitAnimation();
            } else {
                currentAnimId++; // Cancel any running animation
            }

            if (targetId === 'state-create-task') {
                runCreateTaskAnimation();
            }
        });
    });

    async function runAwaitAnimation() {
        currentAnimId++;
        const animId = currentAnimId;
        
        const task = document.getElementById('v-task-await');
        const arrow = document.getElementById('v-await-arrow');
        
        // Reset state immediately (No transition)
        task.style.transition = 'none';
        task.style.transform = 'translateX(0)';
        task.style.opacity = '1';
        arrow.style.transition = 'none';
        arrow.style.opacity = '0';
        arrow.style.transform = 'translateX(0)';
        
        // Force DOM reflow so transition=none takes effect before next step
        void task.offsetWidth;

        await sleep(400);
        if (currentAnimId !== animId) return;

        // Move task forward
        task.style.transition = 'transform 0.5s ease';
        task.style.transform = 'translateX(60px)';
        
        await sleep(500);
        if (currentAnimId !== animId) return;

        // Show "Yield" arrow
        arrow.style.transition = 'all 0.5s ease';
        arrow.style.opacity = '1';
        arrow.style.transform = 'translateX(20px)';
        
        await sleep(1000);
        if (currentAnimId !== animId) return;

        // Task yields into loop (Shrink and disappear)
        task.style.transform = 'translateX(180px) scale(0.5)';
        task.style.opacity = '0';
    }

    function runCreateTaskAnimation() {
        const queue = document.getElementById('v-create-queue');
        
        // Create new task pill
        const newTask = document.createElement('div');
        newTask.className = 'v-task';
        newTask.textContent = 'Task Mới';
        // Using the newly added popIn animation
        newTask.style.animation = 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        queue.appendChild(newTask);
        
        // Remove old tasks to keep UI clean
        if (queue.children.length > 3) {
            queue.removeChild(queue.firstChild);
        }
    }

    function sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }
}
