// js/simulations/part1-asyncio-simulation.js

export function init() {
    const btnStart = document.getElementById('btn-coro-sim-start');
    const btnReset = document.getElementById('btn-coro-sim-reset');
    
    if (!btnStart) return;

    let simActive = false;
    let simCounter = 0;

    btnReset.addEventListener('click', resetSim);
    btnStart.addEventListener('click', () => {
        if (!simActive) {
            runSimulation();
        }
    });

    function clearLines() {
        for(let i=1; i<=16; i++) {
            const line = document.getElementById(`c-line-${i}`);
            if (line) {
                line.classList.remove('active', 'awaiting');
            }
        }
    }

    function setCpu(state, taskName = null, color = null) {
        const box = document.getElementById('coro-cpu-box');
        const status = document.getElementById('coro-cpu-status');
        const taskWrap = document.getElementById('coro-cpu-task');
        const ball = document.getElementById('cpu-task-ball');

        if (state === 'IDLE') {
            box.style.borderColor = 'var(--text-secondary)';
            status.style.opacity = '1';
            status.textContent = 'RẢNH RỖI';
            status.style.color = 'var(--text-secondary)';
            taskWrap.style.opacity = '0';
        } else if (state === 'BUSY') {
            box.style.borderColor = color;
            status.style.opacity = '0';
            taskWrap.style.opacity = '1';
            ball.textContent = taskName;
            ball.style.backgroundColor = color;
        }
    }

    function pushToRam(taskId, title, color) {
        const ramBox = document.getElementById('coro-ram-box');
        const empty = document.getElementById('ram-empty');
        if (empty) empty.style.display = 'none';

        const frame = document.createElement('div');
        frame.className = 'frozen-frame';
        frame.id = `ram-frame-${taskId}`;
        frame.style.borderColor = color;
        
        frame.innerHTML = `
            <div>
                <strong style="color: ${color};">${title}</strong>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;">Biến cục bộ được lưu...</div>
            </div>
            <i class="fas fa-snowflake" style="color: var(--color-wait); font-size: 1.5rem; animation: spin 4s linear infinite;"></i>
        `;
        
        ramBox.appendChild(frame);
    }

    function pushToFuture(taskId, taskName, color) {
        const futureBox = document.getElementById('coro-future-box');
        const empty = document.getElementById('future-empty');
        if (empty) empty.style.display = 'none';

        const futureCard = document.createElement('div');
        futureCard.id = `future-card-${taskId}`;
        futureCard.style.padding = '0.8rem';
        futureCard.style.border = `1px solid ${color}`;
        futureCard.style.borderRadius = '8px';
        futureCard.style.background = 'var(--bg-secondary)';
        futureCard.style.display = 'flex';
        futureCard.style.alignItems = 'center';
        futureCard.style.justifyContent = 'space-between';
        futureCard.style.animation = 'slideInFromLeft 0.4s var(--ease-spring)';
        
        futureCard.innerHTML = `
            <div>
                <strong style="color: ${color};"><i class="fas fa-receipt"></i> Future: ${taskName}</strong>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;">Đang chờ I/O...</div>
            </div>
            <i class="fas fa-clock" style="color: var(--color-wait); font-size: 1.2rem; animation: spin 2s linear infinite;"></i>
        `;

        futureBox.appendChild(futureCard);
    }

    function removeFromRamAndFuture(taskId) {
        const frame = document.getElementById(`ram-frame-${taskId}`);
        if (frame) frame.remove();
        
        const futureCard = document.getElementById(`future-card-${taskId}`);
        if (futureCard) futureCard.remove();
        
        const ramBox = document.getElementById('coro-ram-box');
        if (ramBox.querySelectorAll('.frozen-frame').length === 0) {
            const empty = document.getElementById('ram-empty');
            if (empty) empty.style.display = 'block';
        }

        const futureBox = document.getElementById('coro-future-box');
        if (futureBox.querySelectorAll('[id^="future-card-"]').length === 0) {
            const empty = document.getElementById('future-empty');
            if (empty) empty.style.display = 'block';
        }
    }

    function resetSim() {
        simCounter++;
        simActive = false;
        btnStart.disabled = false;
        btnStart.style.opacity = '1';
        
        clearLines();
        setCpu('IDLE');
        
        const ramBox = document.getElementById('coro-ram-box');
        const frames = ramBox.querySelectorAll('.frozen-frame');
        frames.forEach(f => f.remove());
        const emptyRam = document.getElementById('ram-empty');
        if (emptyRam) emptyRam.style.display = 'block';

        const futureBox = document.getElementById('coro-future-box');
        const futures = futureBox.querySelectorAll('[id^="future-card-"]');
        futures.forEach(f => f.remove());
        const emptyFuture = document.getElementById('future-empty');
        if (emptyFuture) emptyFuture.style.display = 'block';
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function runSimulation() {
        simActive = true;
        simCounter++;
        const currentSim = simCounter;
        btnStart.disabled = true;
        btnStart.style.opacity = '0.5';

        const COLOR_A = 'var(--accent-primary)';
        const COLOR_B = 'var(--color-success)';
        const COLOR_MAIN = 'var(--color-cpu)';

        // --- Bắt đầu từ asyncio.run() ---
        document.getElementById('c-line-16').classList.add('active');
        setCpu('BUSY', 'Event Loop', COLOR_MAIN);
        await sleep(800);
        if (simCounter !== currentSim) return;

        // --- Chạy main() ---
        document.getElementById('c-line-16').classList.remove('active');
        document.getElementById('c-line-9').classList.add('active');
        setCpu('BUSY', 'main()', COLOR_MAIN);
        await sleep(800);
        if (simCounter !== currentSim) return;

        // Gọi gather()
        document.getElementById('c-line-9').classList.remove('active');
        document.getElementById('c-line-11').classList.add('active');
        document.getElementById('c-line-12').classList.add('active');
        document.getElementById('c-line-13').classList.add('active');
        await sleep(1000);
        if (simCounter !== currentSim) return;

        // --- Task A Bắt đầu ---
        // main() nhường quyền để Event Loop gọi Task A
        document.getElementById('c-line-11').classList.remove('active');
        document.getElementById('c-line-12').classList.remove('active');
        document.getElementById('c-line-13').classList.remove('active');
        
        document.getElementById('c-line-1').classList.add('active');
        setCpu('BUSY', 'Task A', COLOR_A);
        await sleep(800);
        if (simCounter !== currentSim) return;

        document.getElementById('c-line-1').classList.remove('active');
        document.getElementById('c-line-2').classList.add('active');
        await sleep(800);
        if (simCounter !== currentSim) return;

        // Task A gặp await
        document.getElementById('c-line-2').classList.remove('active');
        document.getElementById('c-line-3').classList.add('awaiting');
        pushToRam('A', 'Frame: Task A', COLOR_A);
        pushToFuture('A', 'Task A', COLOR_A);
        setCpu('IDLE'); // CPU is freed
        
        await sleep(800);
        if (simCounter !== currentSim) return;

        // --- Task B Bắt đầu ---
        document.getElementById('c-line-5').classList.add('active');
        setCpu('BUSY', 'Task B', COLOR_B);
        await sleep(800);
        if (simCounter !== currentSim) return;

        document.getElementById('c-line-5').classList.remove('active');
        document.getElementById('c-line-6').classList.add('active');
        await sleep(1000);
        if (simCounter !== currentSim) return;

        // Task B gặp await
        document.getElementById('c-line-6').classList.remove('active');
        document.getElementById('c-line-7').classList.add('awaiting');
        pushToRam('B', 'Frame: Task B', COLOR_B);
        pushToFuture('B', 'Task B', COLOR_B);
        setCpu('IDLE'); // CPU is freed

        await sleep(1500); // Đóng băng cả 2
        if (simCounter !== currentSim) return;

        // --- Task A tỉnh dậy (I/O xong) ---
        removeFromRamAndFuture('A');
        document.getElementById('c-line-3').classList.remove('awaiting');
        document.getElementById('c-line-4').classList.add('active');
        setCpu('BUSY', 'Task A', COLOR_A);
        
        await sleep(1000);
        if (simCounter !== currentSim) return;
        document.getElementById('c-line-4').classList.remove('active');
        setCpu('IDLE');

        await sleep(500);
        if (simCounter !== currentSim) return;

        // --- Task B tỉnh dậy (I/O xong) ---
        removeFromRamAndFuture('B');
        document.getElementById('c-line-7').classList.remove('awaiting');
        document.getElementById('c-line-8').classList.add('active');
        setCpu('BUSY', 'Task B', COLOR_B);
        
        await sleep(1000);
        if (simCounter !== currentSim) return;
        document.getElementById('c-line-8').classList.remove('active');
        setCpu('IDLE');

        // Quay lại main()
        document.getElementById('c-line-14').classList.add('active');
        setCpu('BUSY', 'main()', COLOR_MAIN);
        await sleep(800);
        if (simCounter !== currentSim) return;
        
        document.getElementById('c-line-14').classList.remove('active');

        // Quay lại asyncio.run()
        document.getElementById('c-line-16').classList.add('active');
        setCpu('BUSY', 'Event Loop', COLOR_MAIN);
        await sleep(800);
        if (simCounter !== currentSim) return;

        document.getElementById('c-line-16').classList.remove('active');
        setCpu('IDLE');

        // Hoàn tất
        btnStart.disabled = false;
        btnStart.style.opacity = '1';
        simActive = false;
    }
}
