// js/simulations/part1-event-loop.js

export function init() {
    const btnFast = document.getElementById('btn-add-fast');
    const btnSlow = document.getElementById('btn-add-slow');
    const queue = document.getElementById('task-queue');
    const mainThread = document.getElementById('main-thread');
    const bgThread = document.getElementById('bg-thread');
    const loopWheel = document.getElementById('loop-wheel');

    let taskCounter = 1;
    let isLoopRunning = false;
    let tasks = [];

    // Add Tasks to Queue
    btnFast.addEventListener('click', () => addTask('fast'));
    btnSlow.addEventListener('click', () => addTask('slow'));

    function addTask(type) {
        const task = {
            id: taskCounter++,
            type: type, // 'fast' or 'slow'
            status: 'queued'
        };
        tasks.push(task);
        renderQueue();
        
        // Wake up event loop if sleeping
        if (!isLoopRunning) {
            runEventLoop();
        }
    }

    function renderQueue() {
        queue.innerHTML = '';
        tasks.filter(t => t.status === 'queued').forEach(t => {
            const el = document.createElement('div');
            el.className = `sim-task task-${t.type}`;
            el.textContent = t.isContinuation ? `Task ${t.id} (Sẵn sàng)` : `Task ${t.id} (${t.type})`;
            queue.appendChild(el);
        });
    }

    async function runEventLoop() {
        if (tasks.filter(t => t.status === 'queued').length === 0) {
            isLoopRunning = false;
            loopWheel.classList.remove('spinning');
            return;
        }

        isLoopRunning = true;
        loopWheel.classList.add('spinning');

        // Grab first task
        const taskIndex = tasks.findIndex(t => t.status === 'queued');
        const task = tasks[taskIndex];
        task.status = 'executing';
        renderQueue();

        // Move to main thread
        const el = document.createElement('div');
        el.className = `sim-task task-${task.type}`;
        el.textContent = task.isContinuation ? `Tiếp tục Task ${task.id}...` : `Đang chạy Task ${task.id}`;
        mainThread.innerHTML = '';
        mainThread.appendChild(el);

        if (task.type === 'fast') {
            // CPU task blocks for 1 second
            await sleep(1000);
            mainThread.innerHTML = ''; // Done
            tasks.splice(taskIndex, 1); // Remove completed
            runEventLoop(); // Check for next
        } else {
            if (task.isContinuation) {
                // Phase 2: Resume after I/O and finish
                await sleep(500); // Small processing after I/O
                mainThread.innerHTML = ''; // Done
                tasks.splice(taskIndex, 1); // Remove completed
                runEventLoop(); // Check for next
            } else {
                // Phase 1: Slow I/O task: Execute briefly, then yield
                await sleep(400);
                task.status = 'suspended';
                mainThread.innerHTML = '';
                
                // Move to Background
                const bgEl = document.createElement('div');
                bgEl.className = `sim-task task-${task.type}`;
                bgEl.textContent = `I/O Task ${task.id} đang chờ...`;
                bgThread.appendChild(bgEl);

                // Yield control immediately to Event Loop to run next task
                runEventLoop();

                // Background completes after 3 seconds
                setTimeout(() => {
                    if (bgThread.contains(bgEl)) bgThread.removeChild(bgEl);
                    // Put back into queue!
                    task.status = 'queued';
                    task.isContinuation = true;
                    renderQueue();
                    
                    if (!isLoopRunning) {
                        runEventLoop();
                    }
                }, 3000);
            }
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
