// js/simulations/part3-master-simulation.js

export function init() {
    const btnStart = document.getElementById('btn-master-run');
    const btnReset = document.getElementById('btn-master-reset');

    const elList = document.getElementById('m-event-loop');
    const wqList = document.getElementById('m-tp-queue');
    const fList = document.getElementById('m-futures');
    
    const workers = [
        document.getElementById('m-w1'),
        document.getElementById('m-w2'),
        document.getElementById('m-w3')
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

        // 1. Generate 10 Random Tasks (Some Heavy, Some Async)
        for(let i=1; i<=10; i++) {
            taskCounter++;
            const isHeavy = Math.random() > 0.5; // 50% heavy, 50% light
            const t = document.createElement('div');
            t.className = isHeavy ? 'm-task heavy' : 'm-task async';
            t.id = `mtask-${taskCounter}`;
            t.innerHTML = isHeavy ? `<i class="fas fa-weight-hanging"></i> Heavy Task ${taskCounter}` : `<i class="fas fa-bolt"></i> Async Task ${taskCounter}`;
            
            elList.appendChild(t);
            masterTasks.push({ 
                id: taskCounter, 
                el: t, 
                type: isHeavy ? 'heavy' : 'async', 
                status: 'in_loop' 
            });

            // Create Future placeholder
            const f = document.createElement('div');
            f.className = 'm-future pending';
            f.id = `mfuture-${taskCounter}`;
            f.innerHTML = `<div>Task ${taskCounter}</div><div class="f-badge">PENDING</div>`;
            fList.appendChild(f);
        }

        await sleep(1000);

        // 2. Event Loop processes tasks
        for(let task of masterTasks) {
            if(!isRunning) return;
            
            if (task.type === 'async') {
                // Event loop handles async quickly
                task.el.innerHTML = `<i class="fas fa-check"></i> Xong (Async ${task.id})`;
                task.el.style.opacity = '0.5';
                
                const f = document.getElementById(`mfuture-${task.id}`);
                if (f) {
                    f.className = 'm-future done';
                    f.querySelector('.f-badge').textContent = 'DONE';
                }
                task.status = 'done';
            } else {
                // Event loop delegates heavy tasks to queue
                task.el.style.padding = "2px 8px";
                wqList.appendChild(task.el);
                task.status = 'in_queue';
            }
            await sleep(200); 
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
        w.className = 'm-worker busy';
        w.innerHTML = `<i class="fas fa-cog fa-spin"></i> Chạy Heavy Task ${nextTask.id}...`;

        // Simulate computation delay
        const delay = Math.floor(Math.random() * 2000) + 2000;
        await sleep(delay);
        
        if(!isRunning) return;

        // Finish task
        w.className = 'm-worker';
        w.textContent = `Worker ${freeWorkerIdx + 1} (Rảnh)`;
        workerStatus[freeWorkerIdx] = false;
        nextTask.status = 'done';

        // Update Future Box
        const f = document.getElementById(`mfuture-${nextTask.id}`);
        if (f) {
            f.className = 'm-future done';
            f.querySelector('.f-badge').textContent = 'DONE';
        }

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
