// js/simulations/part2-super-dashboard.js

export function init() {
    const btnRun = document.getElementById('btn-sd-run');
    const btnSpam = document.getElementById('btn-sd-spam');
    const btnReset = document.getElementById('btn-sd-reset');

    const futureList = document.getElementById('sd-future-list');
    const queueList = document.getElementById('sd-queue-list');
    const qCount = document.getElementById('sd-q-count');
    
    const workers = [
        { id: 1, el: document.getElementById('sd-w1'), isBusy: false },
        { id: 2, el: document.getElementById('sd-w2'), isBusy: false },
        { id: 3, el: document.getElementById('sd-w3'), isBusy: false }
    ];

    let taskCounter = 1;
    let queue = [];
    let isPolling = false;
    let isRunningCode = false;

    function reset() {
        queue = [];
        futureList.innerHTML = '';
        queueList.innerHTML = '';
        qCount.textContent = '(0)';
        workers.forEach(w => {
            w.isBusy = false;
            w.el.className = 'sd-worker';
            w.el.textContent = `Worker ${w.id} (Rảnh)`;
        });
        for(let i=1; i<=15; i++) highlightLine(i, false);
        isRunningCode = false;
        btnRun.disabled = false;
    }

    btnReset.addEventListener('click', reset);

    function highlightLine(lineNum, isActive = true) {
        const el = document.getElementById(`line-${lineNum}`);
        if(el) {
            if(isActive) {
                // Clear all others first
                for(let i=1; i<=15; i++) {
                    const other = document.getElementById(`line-${i}`);
                    if(other) other.classList.remove('active');
                }
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        }
    }

    async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

    // Line by Line Execution
    btnRun.addEventListener('click', async () => {
        if(isRunningCode) return;
        isRunningCode = true;
        btnRun.disabled = true;
        reset();

        highlightLine(4); await sleep(1000); // with ThreadPoolExecutor
        
        // Loop simulation
        highlightLine(6); await sleep(500); // for i in range(5)
        highlightLine(7); // submit
        // Submit 5 mixed tasks rapidly
        for(let i=0; i<5; i++) {
            const isFast = Math.random() > 0.4;
            submitTask(isFast ? 'fast' : 'slow', true);
            await sleep(150);
        }
        highlightLine(8); await sleep(800); // append
        
        highlightLine(10); await sleep(1000); // print Main thread
        
        highlightLine(12); // for f in futures
        await sleep(500);
        highlightLine(13); // f.result()
        // Wait for all tasks to finish
        while(queue.length > 0 || workers.some(w => w.isBusy)) {
            await sleep(200);
        }
        await sleep(500);
        
        highlightLine(0); // clear
        isRunningCode = false;
        btnRun.disabled = false;
    });

    // Spam 10 Tasks
    btnSpam.addEventListener('click', () => {
        for(let i=0; i<10; i++) {
            const isFast = Math.random() > 0.4;
            submitTask(isFast ? 'fast' : 'slow', false);
        }
    });

    function submitTask(type, isSpecific) {
        const tId = taskCounter++;
        
        // 1. Create Future (Top Right)
        const fEl = document.createElement('div');
        fEl.className = 'sd-future';
        fEl.id = `f-${tId}`;
        fEl.textContent = `F-${tId} (Pending)`;
        futureList.appendChild(fEl);

        // 2. Add to Queue (Bottom Left)
        const qEl = document.createElement('div');
        qEl.className = `sd-task ${type}`;
        qEl.id = `q-${tId}`;
        qEl.textContent = `Task ${tId}`;
        queueList.appendChild(qEl);
        
        queue.push({
            id: tId,
            type: type,
            duration: type === 'fast' ? 1000 : 3500
        });
        
        qCount.textContent = `(${queue.length})`;
        pollQueue();
    }

    async function pollQueue() {
        if (isPolling) return;
        isPolling = true;

        while (queue.length > 0) {
            const idleWorker = workers.find(w => !w.isBusy);
            
            if (idleWorker) {
                const task = queue.shift();
                
                // Remove from queue visually
                const qEl = document.getElementById(`q-${task.id}`);
                if(qEl) qEl.remove();
                qCount.textContent = `(${queue.length})`;
                
                executeTask(idleWorker, task);
            } else {
                await sleep(100); // Wait for a worker to free up
            }
        }
        isPolling = false;
    }

    async function executeTask(worker, task) {
        worker.isBusy = true;
        
        // Update Worker visually (Bottom Right)
        worker.el.className = `sd-worker busy-${task.type}`;
        worker.el.textContent = `Worker ${worker.id} (Task ${task.id})`;
        
        await sleep(task.duration);
        
        // Finish task
        worker.el.className = 'sd-worker';
        worker.el.textContent = `Worker ${worker.id} (Rảnh)`;
        worker.isBusy = false;
        
        // Complete Future (Top Right)
        const fEl = document.getElementById(`f-${task.id}`);
        if(fEl) {
            fEl.className = 'sd-future done';
            fEl.textContent = `F-${task.id} (Done)`;
            
            // Visualize Garbage Collection after 3 seconds
            setTimeout(() => {
                if(fEl && fEl.parentNode) {
                    fEl.style.transition = 'all 0.5s ease';
                    fEl.style.opacity = '0';
                    fEl.style.transform = 'scale(0.5)';
                    setTimeout(() => fEl.remove(), 500);
                }
            }, 3000);
        }
        
        if (!isPolling && queue.length > 0) {
            pollQueue();
        }
    }
}
