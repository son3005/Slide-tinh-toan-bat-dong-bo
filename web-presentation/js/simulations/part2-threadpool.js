// js/simulations/part2-threadpool.js

export function init() {
    const btnFast = document.getElementById('btn-tp-fast');
    const btnSlow = document.getElementById('btn-tp-slow');
    const btnBatch = document.getElementById('btn-tp-batch');
    const btnClear = document.getElementById('btn-tp-clear');
    
    const queueEl = document.getElementById('tp-queue');
    const doneEl = document.getElementById('tp-done');
    const queueCountEl = document.getElementById('queue-count');
    const doneCountEl = document.getElementById('done-count');
    
    const workers = [
        { id: 1, el: document.getElementById('tp-w1'), isBusy: false },
        { id: 2, el: document.getElementById('tp-w2'), isBusy: false },
        { id: 3, el: document.getElementById('tp-w3'), isBusy: false }
    ];

    let taskCounter = 1;
    let doneCounter = 0;
    let queue = [];
    let isPolling = false;

    function updateCounts() {
        queueCountEl.textContent = `(${queue.length})`;
        doneCountEl.textContent = `(${doneCounter})`;
    }

    function renderQueue() {
        queueEl.innerHTML = '';
        queue.forEach(t => {
            const el = document.createElement('div');
            el.className = `tp-task ${t.type}`;
            el.textContent = `Task ${t.id} (${t.type})`;
            queueEl.appendChild(el);
        });
        updateCounts();
    }

    function addTask(type) {
        queue.push({
            id: taskCounter++,
            type: type, // 'fast' or 'slow'
            duration: type === 'fast' ? 1000 : 4000 // Fast = 1s, Slow = 4s
        });
        renderQueue();
        pollQueue(); // Wake up ThreadPool
    }

    btnFast.addEventListener('click', () => addTask('fast'));
    btnSlow.addEventListener('click', () => addTask('slow'));
    
    btnBatch.addEventListener('click', () => {
        for(let i=0; i<10; i++) {
            const isFast = Math.random() > 0.3; // 70% fast, 30% slow
            queue.push({
                id: taskCounter++,
                type: isFast ? 'fast' : 'slow',
                duration: isFast ? (Math.random() * 500 + 500) : (Math.random() * 2000 + 3000)
            });
        }
        renderQueue();
        pollQueue();
    });

    btnClear.addEventListener('click', () => {
        queue = [];
        doneCounter = 0;
        queueEl.innerHTML = '';
        doneEl.innerHTML = '';
        updateCounts();
        // Workers that are currently busy will finish their current task and then stop
    });

    async function pollQueue() {
        if (isPolling) return;
        isPolling = true;

        while (queue.length > 0) {
            // Find idle worker
            const idleWorker = workers.find(w => !w.isBusy);
            
            if (idleWorker) {
                // Pull task
                const task = queue.shift();
                renderQueue();
                
                // Assign to worker
                executeTask(idleWorker, task);
            } else {
                // All workers busy, wait a bit and check again
                await sleep(100);
            }
        }
        isPolling = false;
    }

    async function executeTask(worker, task) {
        worker.isBusy = true;
        
        // Update Worker UI
        worker.el.classList.add(`busy-${task.type}`);
        const statusSpan = worker.el.querySelector('.w-status');
        statusSpan.textContent = `Chạy Task ${task.id}...`;
        
        // Wait for execution duration
        await sleep(task.duration);
        
        // Finish task
        worker.el.classList.remove(`busy-${task.type}`);
        statusSpan.textContent = 'Đang rảnh';
        worker.isBusy = false;
        
        // Move to Done queue
        doneCounter++;
        const doneTaskEl = document.createElement('div');
        doneTaskEl.className = `tp-task done`;
        doneTaskEl.textContent = `Task ${task.id} (${task.type})`;
        
        // Prepend so newest is on top
        if (doneEl.firstChild) {
            doneEl.insertBefore(doneTaskEl, doneEl.firstChild);
        } else {
            doneEl.appendChild(doneTaskEl);
        }
        
        updateCounts();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
