// js/simulations/part2-gil.js

export function init() {
    const btn = document.getElementById('btn-simulate-gil');
    const gilLock = document.getElementById('gil-lock');
    const statusText = document.getElementById('gil-status');
    
    // Arrays for threads
    const threads = [
        { id: 1, bar: document.getElementById('t1-bar'), progress: 0, topPos: '15px' },
        { id: 2, bar: document.getElementById('t2-bar'), progress: 0, topPos: '85px' },
        { id: 3, bar: document.getElementById('t3-bar'), progress: 0, topPos: '160px' }
    ];

    let isRunning = false;
    let simInterval;

    btn.addEventListener('click', () => {
        if (isRunning) return;
        isRunning = true;
        btn.disabled = true;
        
        // Reset
        threads.forEach(t => {
            t.progress = 0;
            t.bar.style.width = '0%';
            t.bar.classList.remove('active');
        });

        statusText.textContent = "Các luồng đang tranh giành GIL...";
        
        // Simulation Loop
        simInterval = setInterval(() => {
            // Randomly select a thread to hold the GIL (context switch)
            const activeThreadIndex = Math.floor(Math.random() * threads.length);
            const activeThread = threads[activeThreadIndex];

            // Update UI to show who holds the lock
            gilLock.style.top = activeThread.topPos;

            threads.forEach((t, i) => {
                if (i === activeThreadIndex) {
                    t.bar.classList.add('active');
                    // Increment progress
                    t.progress += Math.random() * 5 + 2; 
                    if (t.progress > 100) t.progress = 100;
                    t.bar.style.width = `${t.progress}%`;
                } else {
                    t.bar.classList.remove('active');
                }
            });

            // Check if all done
            const allDone = threads.every(t => t.progress >= 100);
            if (allDone) {
                clearInterval(simInterval);
                statusText.textContent = "Hoàn thành! (Lưu ý: Mặc dù có 3 luồng, nhưng chúng thực thi tuần tự vì GIL)";
                threads.forEach(t => t.bar.classList.remove('active'));
                btn.disabled = false;
                isRunning = false;
            }

        }, 300); // Context switch every 300ms visually
    });
}
