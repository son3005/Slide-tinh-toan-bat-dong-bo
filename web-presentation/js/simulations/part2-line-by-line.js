// js/simulations/part2-line-by-line.js

export function init() {
    const btnRun = document.getElementById('btn-run-lbl');
    const consoleOut = document.getElementById('console-output');
    const futureContainer = document.getElementById('future-container');
    const worker1 = document.getElementById('worker-1');
    const worker2 = document.getElementById('worker-2');

    let isRunning = false;

    // Simulate async task completion in the background
    function simulateTask(workerEl, futureId, delay) {
        workerEl.classList.add('busy');
        workerEl.textContent = `Worker: Running ${futureId}`;
        
        setTimeout(() => {
            workerEl.classList.remove('busy');
            workerEl.textContent = `Worker: N/A`;
            
            const fCard = document.getElementById(`f-${futureId}`);
            if (fCard) {
                fCard.classList.remove('pending');
                fCard.classList.add('done');
                fCard.textContent = `${futureId} (Done)`;
            }
        }, delay);
    }

    function logConsole(msg) {
        consoleOut.innerHTML += `> ${msg}<br>`;
    }

    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function highlight(lineNumber) {
        // Clear all
        for(let i=1; i<=10; i++) {
            const el = document.getElementById(`line-${i}`);
            if(el) el.classList.remove('active');
        }
        // Set new
        const activeEl = document.getElementById(`line-${lineNumber}`);
        if(activeEl) activeEl.classList.add('active');
    }

    btnRun.addEventListener('click', async () => {
        if (isRunning) return;
        isRunning = true;
        btnRun.disabled = true;
        
        // Reset state
        consoleOut.innerHTML = '> Console Ready...<br>';
        futureContainer.innerHTML = '';
        worker1.classList.remove('busy'); worker1.textContent = 'Worker 1: N/A';
        worker2.classList.remove('busy'); worker2.textContent = 'Worker 2: N/A';

        // LINE 1
        highlight(1);
        await sleep(1000);
        
        // LINE 2
        highlight(2);
        logConsole("Gửi tác vụ...");
        await sleep(1000);
        
        // LINE 3
        highlight(3);
        const f1 = document.createElement('div');
        f1.className = 'future-card pending';
        f1.id = 'f-Future-A';
        f1.textContent = 'Future A (Pending)';
        futureContainer.appendChild(f1);
        simulateTask(worker1, 'Future-A', 4000); // Takes 4s to complete
        await sleep(1000);

        // LINE 4
        highlight(4);
        const f2 = document.createElement('div');
        f2.className = 'future-card pending';
        f2.id = 'f-Future-B';
        f2.textContent = 'Future B (Pending)';
        futureContainer.appendChild(f2);
        simulateTask(worker2, 'Future-B', 3000); // Takes 3s to complete
        await sleep(1000);

        // LINE 6
        highlight(6);
        logConsole("Main thread vẫn chạy!");
        await sleep(1500);

        // LINE 9
        highlight(9);
        logConsole("Waiting for Future A...");
        // Wait until it's done visually
        while(!f1.classList.contains('done')) {
            await sleep(200);
        }
        logConsole("Result A: Success!");
        await sleep(1000);

        // LINE 10
        highlight(10);
        logConsole("Waiting for Future B...");
        while(!f2.classList.contains('done')) {
            await sleep(200);
        }
        logConsole("Result B: Success!");
        
        // Done
        await sleep(1000);
        highlight(0); // clear
        btnRun.disabled = false;
        isRunning = false;
        logConsole("Execution Completed.");
    });
}
