// js/simulations/part2-thread-vs-process.js

export function init() {
    const btnIO = document.getElementById('btn-tvp-io');
    const btnCPU = document.getElementById('btn-tvp-cpu');
    const btnReset = document.getElementById('btn-tvp-reset');

    const tTimer = document.getElementById('timer-thread');
    const pTimer = document.getElementById('timer-process');
    const gilStatus = document.getElementById('gil-status');

    let isRunning = false;
    let tAnimationFrames = [];
    let pAnimationFrames = [];

    function reset() {
        isRunning = false;
        tAnimationFrames.forEach(cancelAnimationFrame);
        pAnimationFrames.forEach(cancelAnimationFrame);
        tAnimationFrames = [];
        pAnimationFrames = [];

        tTimer.textContent = '0.0';
        pTimer.textContent = '0.0';

        gilStatus.textContent = 'GIL: Đang Rảnh';
        gilStatus.parentNode.classList.remove('locked');

        for(let i=1; i<=3; i++) {
            // Reset Thread
            const tw = document.getElementById(`tw-${i}`);
            tw.className = 'tvp-worker';
            document.getElementById(`tt-${i}`).textContent = 'Trống';
            const tp = document.getElementById(`tprog-${i}`);
            tp.style.width = '0%';
            tp.style.transition = 'none';

            // Reset Process
            const pw = document.getElementById(`pw-${i}`);
            pw.className = 'tvp-worker process-worker';
            document.getElementById(`pt-${i}`).textContent = 'Trống';
            const pp = document.getElementById(`pprog-${i}`);
            pp.style.width = '0%';
            pp.style.transition = 'none';
        }

        btnIO.disabled = false;
        btnCPU.disabled = false;
    }

    btnReset.addEventListener('click', reset);

    btnIO.addEventListener('click', () => runSimulation('io'));
    btnCPU.addEventListener('click', () => runSimulation('cpu'));

    async function runSimulation(type) {
        if(isRunning) return;
        isRunning = true;
        btnIO.disabled = true;
        btnCPU.disabled = true;

        const duration = 3000; // 3 seconds per task

        // Start both pools
        runThreadPool(type, duration);
        runProcessPool(type, duration);
    }

    async function runThreadPool(type, duration) {
        let startTime = performance.now();
        
        // Update timer
        function updateTimer() {
            if(!isRunning) return;
            const now = performance.now();
            tTimer.textContent = ((now - startTime) / 1000).toFixed(1);
            tAnimationFrames.push(requestAnimationFrame(updateTimer));
        }
        tAnimationFrames.push(requestAnimationFrame(updateTimer));

        if (type === 'io') {
            // I/O Bound: All threads run CONCURRENTLY (GIL is released during wait)
            gilStatus.textContent = 'GIL: Được nhả liên tục (I/O)';
            gilStatus.parentNode.classList.remove('locked');

            const promises = [1, 2, 3].map(i => {
                const w = document.getElementById(`tw-${i}`);
                w.className = 'tvp-worker status-io';
                document.getElementById(`tt-${i}`).textContent = 'Tải File ' + i;
                const p = document.getElementById(`tprog-${i}`);
                
                return animateProgress(p, duration, tAnimationFrames).then(() => {
                    document.getElementById(`tt-${i}`).textContent = 'Xong';
                    w.className = 'tvp-worker';
                });
            });

            await Promise.all(promises);
            gilStatus.textContent = 'GIL: Đang Rảnh';

        } else {
            // CPU Bound: Threads run SEQUENTIALLY due to GIL
            gilStatus.textContent = 'GIL: BỊ KHÓA CHẶT (CPU Bound)';
            gilStatus.parentNode.classList.add('locked');

            for(let i=1; i<=3; i++) {
                if(!isRunning) break;
                // Others are waiting
                for(let j=1; j<=3; j++) {
                    if (j > i) {
                        document.getElementById(`tw-${j}`).className = 'tvp-worker status-waiting';
                        document.getElementById(`tt-${j}`).textContent = 'Đợi GIL...';
                    }
                }

                // Current running
                const w = document.getElementById(`tw-${i}`);
                w.className = 'tvp-worker status-cpu';
                document.getElementById(`tt-${i}`).textContent = 'Tính toán ' + i;
                const p = document.getElementById(`tprog-${i}`);

                await animateProgress(p, duration, tAnimationFrames);
                
                document.getElementById(`tt-${i}`).textContent = 'Xong';
                w.className = 'tvp-worker';
            }
            gilStatus.textContent = 'GIL: Đang Rảnh';
            gilStatus.parentNode.classList.remove('locked');
        }

        // Stop timer
        tAnimationFrames.forEach(cancelAnimationFrame);
        const total = (performance.now() - startTime) / 1000;
        tTimer.textContent = total.toFixed(1);
        checkGlobalFinish();
    }

    async function runProcessPool(type, duration) {
        let startTime = performance.now();
        
        // Process creation overhead
        await new Promise(r => setTimeout(r, 500));
        startTime = performance.now() - 500; // keep timer accurate to click

        function updateTimer() {
            if(!isRunning) return;
            const now = performance.now();
            pTimer.textContent = ((now - startTime) / 1000).toFixed(1);
            pAnimationFrames.push(requestAnimationFrame(updateTimer));
        }
        pAnimationFrames.push(requestAnimationFrame(updateTimer));

        // ProcessPool runs BOTH I/O and CPU in PARALLEL because they have separate memory
        const typeClass = type === 'io' ? 'status-io' : 'status-cpu';
        const taskName = type === 'io' ? 'Tải File ' : 'Tính toán ';

        const promises = [1, 2, 3].map(i => {
            const w = document.getElementById(`pw-${i}`);
            w.className = `tvp-worker process-worker ${typeClass}`;
            document.getElementById(`pt-${i}`).textContent = taskName + i;
            const p = document.getElementById(`pprog-${i}`);
            
            return animateProgress(p, duration, pAnimationFrames).then(() => {
                document.getElementById(`pt-${i}`).textContent = 'Xong';
                w.className = 'tvp-worker process-worker';
            });
        });

        await Promise.all(promises);

        // Stop timer
        pAnimationFrames.forEach(cancelAnimationFrame);
        const total = (performance.now() - startTime) / 1000;
        pTimer.textContent = total.toFixed(1);
        checkGlobalFinish();
    }

    let finishedPools = 0;
    function checkGlobalFinish() {
        finishedPools++;
        if(finishedPools >= 2) {
            isRunning = false;
            btnIO.disabled = false;
            btnCPU.disabled = false;
            finishedPools = 0;
        }
    }

    function animateProgress(el, duration, frameList) {
        return new Promise(resolve => {
            let start = performance.now();
            function step(timestamp) {
                if(!isRunning) return resolve();
                let progress = (timestamp - start) / duration;
                if (progress >= 1) progress = 1;
                el.style.width = (progress * 100) + '%';
                
                if (progress < 1) {
                    frameList.push(requestAnimationFrame(step));
                } else {
                    resolve();
                }
            }
            frameList.push(requestAnimationFrame(step));
        });
    }
}
