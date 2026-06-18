// js/simulations/part3-master-simulation.js

export function init() {
    const btnStart = document.getElementById('btn-master-start');
    const btnReset = document.getElementById('btn-master-reset');

    const elList = document.getElementById('el-task-list');
    const wqList = document.getElementById('pool-queue');
    const fList = document.getElementById('master-future-list');
    
    const workers = [
        document.getElementById('mw-1'),
        document.getElementById('mw-2'),
        document.getElementById('mw-3')
    ];

    let isRunning = false;
    let masterTasks = [];
    let workerStatus = [false, false, false]; // false = free, true = busy
    
    let taskCounter = 0;

    function reset() {
        isRunning = false;
        elList.innerHTML = '';
        wqList.innerHTML = '';
        fList.innerHTML = '';
        
        workers.forEach((w, idx) => {
            w.textContent = `Worker ${idx + 1} (Rảnh)`;
            w.className = 'm-worker';
        });

        workerStatus = [false, false, false];
        masterTasks = [];
        taskCounter = 0;
        
        btnStart.disabled = false;
    }

    btnReset.addEventListener('click', reset);

    btnStart.addEventListener('click', async () => {
        if(isRunning) return;
        isRunning = true;
        btnStart.disabled = true;

        // 1. Generate 10 API Tasks in Event Loop
        for(let i=1; i<=10; i++) {
            taskCounter++;
            const t = document.createElement('div');
            t.className = 'm-item';
            t.id = `mtask-${taskCounter}`;
            t.textContent = `API Request ${taskCounter}`;
            elList.appendChild(t);
            masterTasks.push({ id: taskCounter, el: t, status: 'in_loop' });
        }

        await sleep(1000);

        // 2. Event Loop delegates them to Worker Pool Queue
        for(let task of masterTasks) {
            if(!isRunning) return;
            // Move to queue
            task.el.style.borderColor = 'var(--color-cpu)';
            task.el.style.color = 'var(--color-cpu)';
            task.el.innerHTML = `<i class="fas fa-truck-loading"></i> Đang chờ (API ${task.id})`;
            wqList.appendChild(task.el);
            task.status = 'in_queue';
            await sleep(150); // fast delegation
            
            // Try process
            processQueue();
        }
    });

    async function processQueue() {
        if(!isRunning) return;
        
        // Find free worker
        const freeWorkerIdx = workerStatus.findIndex(s => !s);
        if(freeWorkerIdx === -1) return; // all busy
        
        // Find next task in queue
        const nextTask = masterTasks.find(t => t.status === 'in_queue');
        if(!nextTask) return; // queue empty

        // Assign task to worker
        workerStatus[freeWorkerIdx] = true;
        nextTask.status = 'processing';
        
        // Remove from queue visually
        if(nextTask.el.parentNode) nextTask.el.parentNode.removeChild(nextTask.el);
        
        // Update worker UI
        const w = workers[freeWorkerIdx];
        w.className = 'm-worker active';
        w.innerHTML = `<i class="fas fa-cog fa-spin"></i> Tải API ${nextTask.id}...`;

        // Simulate network delay (2 to 4 seconds)
        const delay = Math.floor(Math.random() * 2000) + 2000;
        await sleep(delay);
        
        if(!isRunning) return;

        // Finish task
        w.className = 'm-worker';
        w.textContent = `Worker ${freeWorkerIdx + 1} (Rảnh)`;
        workerStatus[freeWorkerIdx] = false;
        nextTask.status = 'done';

        // Put result in Futures Box
        const f = document.createElement('div');
        f.className = 'm-item done';
        f.style.borderColor = 'var(--color-success)';
        f.style.color = 'var(--color-success)';
        f.style.animation = 'popIn 0.3s';
        f.innerHTML = `<i class="fas fa-check-circle"></i> Kết quả API ${nextTask.id}`;
        fList.appendChild(f);

        // Check if all done
        if (masterTasks.every(t => t.status === 'done')) {
            isRunning = false;
            btnStart.disabled = false;
        } else {
            // Process next
            processQueue();
        }
    }

    function sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }
}
