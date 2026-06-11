document.addEventListener('DOMContentLoaded', () => {
    // Read theme from localStorage, default to light-theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.remove('light-theme');
    } else {
        document.body.classList.add('light-theme');
    }
    
    const totalSlides = 36;
    const slidesWrapper = document.getElementById('slidesWrapper');
    const loadingSpinner = document.getElementById('loadingSpinnerWrapper');
    
    const loadPromises = [];
    for (let i = 1; i <= totalSlides; i++) {
        loadPromises.push(
            fetch(`content/slide-${i}.html`)
                .then(res => {
                    if (!res.ok) throw new Error(`Không thể tải slide-${i}.html`);
                    return res.text();
                })
                .then(html => {
                    const section = document.createElement('section');
                    section.className = 'slide';
                    section.id = `slide-${i}`;
                    section.innerHTML = html;
                    return { index: i, element: section };
                })
        );
    }
    
    Promise.all(loadPromises)
        .then(loadedSlides => {
            if (loadingSpinner) loadingSpinner.remove();
            
            // Sắp xếp đúng thứ tự
            loadedSlides.sort((a, b) => a.index - b.index);
            loadedSlides.forEach(slide => {
                slidesWrapper.appendChild(slide.element);
            });
            
            // Khởi tạo các tính năng
            initializeSlideshow();
        })
        .catch(err => {
            console.error(err);
            if (slidesWrapper) {
                slidesWrapper.innerHTML = `
                    <div class="glass-card title-card" style="border-color: var(--accent-rose);">
                        <h2 style="color: var(--accent-rose); margin-bottom: 1rem;">Đã xảy ra lỗi khi tải slide</h2>
                        <p style="color: var(--text-secondary); font-family: var(--font-code);">${err.message}</p>
                        <p style="margin-top: 1.5rem; font-size: 0.9rem;">Vui lòng đảm bảo bạn đang chạy slide qua máy chủ HTTP (localhost) và các tệp slide trong thư mục content/ tồn tại đầy đủ.</p>
                    </div>
                `;
            }
        });
});

// -----------------------------------------------------------------
// GLOBAL RESET FUNCTIONS FOR SIMULATIONS & DIAGRAMS
// -----------------------------------------------------------------
let resetCpuLoadSimGlobal = null;
let resetLoopSimGlobal = null;
let resetPoolSimGlobal = null;
let resetPoolFlowSimGlobal = null; // Slide 10 Pool Flowchart
let resetFutureSimGlobal = null;
let resetEventFlowSimGlobal = null;
let resetCoroSimGlobal = null;
let resetPoolDispSimGlobal = null; // Slide 18 Pool Dispatcher
let resetSim22Global = null; // Slide 22 Pool Simulator
let resetAsyncCodeSimGlobal = null; // Slide 31 Async Code
let resetCancelCodeSimGlobal = null; // Slide 33 Cancel Task
let resetFutureCodeSimGlobal = null; // Slide 34 Future Callback

// -----------------------------------------------------------------
// SLIDE NAVIGATION CONTROLS
// -----------------------------------------------------------------
function initializeSlideshow() {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideNum = document.getElementById('currentSlideNum');
    const totalSlidesNum = document.getElementById('totalSlidesNum');
    const progressBar = document.getElementById('progressBar');
    
    let currentIndex = 0;
    totalSlidesNum.textContent = slides.length;
    
    // Đọc slide index từ URL hash (nếu có)
    if (window.location.hash) {
        const hashMatch = window.location.hash.match(/#slide-(\d+)/);
        if (hashMatch) {
            const requestedSlideNum = parseInt(hashMatch[1], 10);
            if (requestedSlideNum >= 1 && requestedSlideNum <= slides.length) {
                currentIndex = requestedSlideNum - 1;
            }
        }
    }
    
    function updateSlides() {
        // Tự động dừng/reset các bộ mô phỏng khi chuyển slide để tránh rò rỉ tài nguyên
        if (currentIndex !== 6 && resetCpuLoadSimGlobal) resetCpuLoadSimGlobal();   // Slide 7 (Index 6)
        if (currentIndex !== 8 && resetLoopSimGlobal) resetLoopSimGlobal();       // Slide 9 (Index 8)
        if (currentIndex !== 9 && resetPoolFlowSimGlobal) resetPoolFlowSimGlobal(); // Slide 10 (Index 9)
        if (currentIndex !== 10 && resetPoolSimGlobal) resetPoolSimGlobal();     // Slide 11 (Index 10)
        if (currentIndex !== 15 && resetFutureSimGlobal) resetFutureSimGlobal(); // Slide 16 (Index 15)
        if (currentIndex !== 17 && resetPoolDispSimGlobal) resetPoolDispSimGlobal(); // Slide 18 (Index 17)
        if (currentIndex !== 21 && resetSim22Global) resetSim22Global();           // Slide 22 (Index 21)
        if (currentIndex !== 24 && resetEventFlowSimGlobal) resetEventFlowSimGlobal(); // Slide 25 (Index 24)
        if (currentIndex !== 30 && resetAsyncCodeSimGlobal) resetAsyncCodeSimGlobal(); // Slide 31 (Index 30)
        if (currentIndex !== 31 && resetCoroSimGlobal) resetCoroSimGlobal();     // Slide 32 (Index 31)
        if (currentIndex !== 32 && resetCancelCodeSimGlobal) resetCancelCodeSimGlobal(); // Slide 33 (Index 32)
        if (currentIndex !== 33 && resetFutureCodeSimGlobal) resetFutureCodeSimGlobal(); // Slide 34 (Index 33)

        slides.forEach((slide, idx) => {
            slide.classList.remove('active', 'prev');
            if (idx === currentIndex) {
                slide.classList.add('active');
            } else if (idx < currentIndex) {
                slide.classList.add('prev');
            }
        });
        
        currentSlideNum.textContent = currentIndex + 1;
        const progress = (currentIndex / (slides.length - 1)) * 100;
        progressBar.style.width = `${progress}%`;
        
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        
        nextBtn.style.opacity = currentIndex === slides.length - 1 ? '0.3' : '1';
        nextBtn.style.pointerEvents = currentIndex === slides.length - 1 ? 'none' : 'auto';
        
        // Cập nhật URL hash để lưu trạng thái trang hiện tại
        window.location.hash = `slide-${currentIndex + 1}`;
    }
    
    function nextSlide() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlides();
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlides();
        }
    }
    
    prevBtn.replaceWith(prevBtn.cloneNode(true));
    nextBtn.replaceWith(nextBtn.cloneNode(true));
    
    const newPrevBtn = document.getElementById('prevBtn');
    const newNextBtn = document.getElementById('nextBtn');
    
    newNextBtn.addEventListener('click', nextSlide);
    newPrevBtn.addEventListener('click', prevSlide);
    
    // Theme Toggle Button Binding
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        const newThemeToggleBtn = themeToggleBtn.cloneNode(true);
        themeToggleBtn.replaceWith(newThemeToggleBtn);
        newThemeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }
    
    // Listen for hashchange event to support browser back/forward navigation
    window.addEventListener('hashchange', () => {
        const hashMatch = window.location.hash.match(/#slide-(\d+)/);
        if (hashMatch) {
            const requestedSlideNum = parseInt(hashMatch[1], 10);
            if (requestedSlideNum >= 1 && requestedSlideNum <= slides.length) {
                const targetIndex = requestedSlideNum - 1;
                if (targetIndex !== currentIndex) {
                    currentIndex = targetIndex;
                    updateSlides();
                }
            }
        }
    });

    // Loại bỏ và gán lại event keydown để tránh trùng lặp
    document.onkeydown = null;
    document.onkeydown = (e) => {
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
                e.preventDefault();
                prevSlide();
            }
        }
    };
    
    updateSlides();
    initializeSimulations();
}

// -----------------------------------------------------------------
// INITIALIZE SIMULATIONS & DIAGRAMS
// -----------------------------------------------------------------
function initializeSimulations() {
    // --- SIMULATION 4: CPU BUSY/IDLE (Slide 7) ---
    const runSeqCpuBtn = document.getElementById('runSeqCpuBtn');
    const runAsyncCpuBtn = document.getElementById('runAsyncCpuBtn');
    const resetCpuLoadSimBtn = document.getElementById('resetCpuLoadSimBtn');
    const cpuTaskABar = document.getElementById('cpuTaskABar');
    const cpuTaskBBar = document.getElementById('cpuTaskBBar');
    const cpuLoadTimeline = document.getElementById('cpuLoadTimeline');

    if (runSeqCpuBtn) {
        let cpuSimRunning = false;
        let cpuSimTimers = [];

        function resetCpuLoadSim() {
            cpuSimTimers.forEach(clearTimeout);
            cpuSimTimers = [];
            cpuSimRunning = false;
            if (cpuTaskABar) cpuTaskABar.style.width = '0%';
            if (cpuTaskBBar) cpuTaskBBar.style.width = '0%';
            if (cpuLoadTimeline) cpuLoadTimeline.innerHTML = '';
            if (runSeqCpuBtn) runSeqCpuBtn.disabled = false;
            if (runAsyncCpuBtn) runAsyncCpuBtn.disabled = false;
        }

        runSeqCpuBtn.onclick = () => {
            if (cpuSimRunning) return;
            cpuSimRunning = true;
            runSeqCpuBtn.disabled = true;
            runAsyncCpuBtn.disabled = true;
            cpuLoadTimeline.innerHTML = '';

            // Sequential Simulation
            let t1 = setTimeout(() => {
                cpuTaskABar.style.width = '50%';
                addTimelineBlock(20, 'var(--accent-rose)', 'Busy (A)');
            }, 500);

            let t2 = setTimeout(() => {
                cpuTaskABar.style.width = '100%';
                addTimelineBlock(30, '#475569', 'Idle Waiting (A)');
            }, 1500);

            let t3 = setTimeout(() => {
                cpuTaskBBar.style.width = '50%';
                addTimelineBlock(20, 'var(--accent-rose)', 'Busy (B)');
            }, 2500);

            let t4 = setTimeout(() => {
                cpuTaskBBar.style.width = '100%';
                addTimelineBlock(30, '#475569', 'Idle Waiting (B)');
                cpuSimRunning = false;
            }, 3500);

            cpuSimTimers.push(t1, t2, t3, t4);
        };

        runAsyncCpuBtn.onclick = () => {
            if (cpuSimRunning) return;
            cpuSimRunning = true;
            runSeqCpuBtn.disabled = true;
            runAsyncCpuBtn.disabled = true;
            cpuLoadTimeline.innerHTML = '';

            // Concurrent Simulation
            let t1 = setTimeout(() => {
                cpuTaskABar.style.width = '50%';
                addTimelineBlock(15, 'var(--accent-rose)', 'Busy (A)');
            }, 400);

            let t2 = setTimeout(() => {
                cpuTaskBBar.style.width = '50%';
                addTimelineBlock(15, 'var(--accent-rose)', 'Busy (B)');
            }, 800);

            let t3 = setTimeout(() => {
                addTimelineBlock(40, '#475569', 'Idle Waiting (A & B)');
            }, 1800);

            let t4 = setTimeout(() => {
                cpuTaskABar.style.width = '100%';
                addTimelineBlock(15, 'var(--accent-rose)', 'Busy (A)');
            }, 2200);

            let t5 = setTimeout(() => {
                cpuTaskBBar.style.width = '100%';
                addTimelineBlock(15, 'var(--accent-rose)', 'Busy (B)');
                cpuSimRunning = false;
            }, 2600);

            cpuSimTimers.push(t1, t2, t3, t4, t5);
        };

        function addTimelineBlock(widthPercent, color, text) {
            if (!cpuLoadTimeline) return;
            const block = document.createElement('div');
            block.style.width = `${widthPercent}%`;
            block.style.background = color;
            block.style.height = '100%';
            block.style.display = 'flex';
            block.style.justifyContent = 'center';
            block.style.alignItems = 'center';
            block.style.color = '#fff';
            block.style.fontSize = '0.65rem';
            block.style.fontWeight = 'bold';
            block.style.animation = 'scaleIn 0.3s ease forwards';
            block.textContent = text;
            cpuLoadTimeline.appendChild(block);
        }

        resetCpuLoadSimBtn.onclick = resetCpuLoadSim;
        resetCpuLoadSimGlobal = resetCpuLoadSim;
    }

    // --- SIMULATION 1: EVENT LOOP (Slide 9) ---
    const spawnClickBtn = document.getElementById('spawnClickBtn');
    const spawnNetworkBtn = document.getElementById('spawnNetworkBtn');
    const spawnCpuBtn = document.getElementById('spawnCpuBtn');
    const resetLoopSimBtn = document.getElementById('resetLoopSimBtn');
    const simEventQueue = document.getElementById('simEventQueue');
    const cpuActiveState = document.getElementById('cpuActiveState');
    const cpuCurrentTask = document.getElementById('cpuCurrentTask');
    const mainThreadCpu = document.getElementById('mainThreadCpu');
    const loopSpinner = document.getElementById('loopSpinner');

    if (spawnClickBtn) {
        let eventQueue = [];
        let isCpuBusy = false;
        let eventLoopInterval = null;
        let taskIdCounter = 1;

        function pushTaskToQueue(name, type, duration) {
            const emptyText = simEventQueue.querySelector('.queue-empty-text');
            if (emptyText) emptyText.remove();

            const task = {
                id: taskIdCounter++,
                name: `${name} #${taskIdCounter}`,
                type: type,
                duration: duration
            };

            eventQueue.push(task);

            const ball = document.createElement('div');
            ball.className = `sim-task-ball ${type}-task`;
            ball.id = `task-ball-${task.id}`;
            ball.textContent = task.name;
            simEventQueue.appendChild(ball);
        }

        spawnClickBtn.onclick = () => pushTaskToQueue('Click Event', 'click', 800);
        spawnNetworkBtn.onclick = () => pushTaskToQueue('Network I/O', 'io', 1500);
        spawnCpuBtn.onclick = () => pushTaskToQueue('Tính toán CPU', 'cpu', 2500);

        function resetLoopSim() {
            eventQueue = [];
            isCpuBusy = false;
            if (simEventQueue) {
                simEventQueue.innerHTML = '<span class="queue-empty-text">Hàng đợi trống...</span>';
            }
            if (mainThreadCpu) {
                mainThreadCpu.className = 'main-thread-cpu';
            }
            if (cpuActiveState) {
                cpuActiveState.textContent = 'RẢNH RỖI';
                cpuActiveState.style.color = 'var(--text-muted)';
            }
            if (cpuCurrentTask) {
                cpuCurrentTask.innerHTML = '';
            }
            if (loopSpinner) {
                loopSpinner.style.animationPlayState = 'running';
            }
        }

        resetLoopSimBtn.onclick = resetLoopSim;
        resetLoopSimGlobal = resetLoopSim;

        function runEventLoopStep() {
            if (!mainThreadCpu || isCpuBusy || eventQueue.length === 0) return;

            const currentTask = eventQueue.shift();
            const ball = document.getElementById(`task-ball-${currentTask.id}`);
            if (ball) ball.remove();

            if (eventQueue.length === 0 && simEventQueue) {
                simEventQueue.innerHTML = '<span class="queue-empty-text">Hàng đợi trống...</span>';
            }

            isCpuBusy = true;
            
            if (currentTask.type === 'cpu') {
                mainThreadCpu.className = 'main-thread-cpu busy';
                cpuActiveState.textContent = 'BẬN (CPU-BOUND)';
                cpuActiveState.style.color = 'var(--accent-rose)';
                loopSpinner.style.animationPlayState = 'paused';
            } else {
                mainThreadCpu.className = 'main-thread-cpu active-task';
                cpuActiveState.textContent = 'ĐANG XỬ LÝ (NON-BLOCKING)';
                cpuActiveState.style.color = 'var(--accent-sky)';
            }

            const taskElement = document.createElement('div');
            taskElement.className = `sim-task-ball ${currentTask.type}-task`;
            taskElement.textContent = currentTask.name;
            cpuCurrentTask.appendChild(taskElement);

            setTimeout(() => {
                if (cpuCurrentTask) cpuCurrentTask.innerHTML = '';
                if (mainThreadCpu) mainThreadCpu.className = 'main-thread-cpu';
                if (cpuActiveState) {
                    cpuActiveState.textContent = 'RẢNH RỖI';
                    cpuActiveState.style.color = 'var(--text-muted)';
                }
                if (loopSpinner) loopSpinner.style.animationPlayState = 'running';
                isCpuBusy = false;
            }, currentTask.duration);
        }

        if (eventLoopInterval) clearInterval(eventLoopInterval);
        eventLoopInterval = setInterval(runEventLoopStep, 200);
    }

    // --- SIMULATION 2: EXECUTOR POOL (Slide 11) ---
    const useThreadPoolBtn = document.getElementById('useThreadPoolBtn');
    const useProcessPoolBtn = document.getElementById('useProcessPoolBtn');
    const runPoolTasksBtn = document.getElementById('runPoolTasksBtn');
    const resetPoolSimBtn = document.getElementById('resetPoolSimBtn');
    const gilLockIndicator = document.getElementById('gilLockIndicator');
    const workerNodes = Array.from(document.querySelectorAll('.pool-workers .worker-node'));
    const barElements = Array.from(document.querySelectorAll('.cpu-cores-graphs .graph-bar'));
    const valElements = Array.from(document.querySelectorAll('.cpu-cores-graphs .core-val'));

    if (useThreadPoolBtn) {
        let simMode = 'thread'; // 'thread' or 'process'
        let isPoolRunning = false;
        let poolTimelineTimers = [];

        useThreadPoolBtn.onclick = () => {
            if (isPoolRunning) return;
            simMode = 'thread';
            useThreadPoolBtn.classList.add('active');
            useProcessPoolBtn.classList.remove('active');
            gilLockIndicator.style.opacity = '0.3';
        };

        useProcessPoolBtn.onclick = () => {
            if (isPoolRunning) return;
            simMode = 'process';
            useProcessPoolBtn.classList.add('active');
            useThreadPoolBtn.classList.remove('active');
            gilLockIndicator.style.opacity = '0.1';
        };

        function setCoreLoad(coreIdx, percentage, maxColor = false) {
            if (!barElements[coreIdx]) return;
            barElements[coreIdx].style.width = `${percentage}%`;
            valElements[coreIdx].textContent = `${percentage}%`;
            if (maxColor) {
                barElements[coreIdx].classList.add('cpu-max');
            } else {
                barElements[coreIdx].classList.remove('cpu-max');
            }
        }

        function runExecutorPoolSimulation() {
            if (isPoolRunning) return;
            isPoolRunning = true;
            
            if (simMode === 'thread') {
                gilLockIndicator.classList.add('locked');
                
                let activeWorker = -1;
                let currentTimerIndex = 0;
                
                function gilSwitch() {
                    if (!isPoolRunning) return;
                    
                    workerNodes.forEach((node, idx) => {
                        node.className = 'worker-node';
                        node.querySelector('.w-status').textContent = 'Chờ GIL';
                        setCoreLoad(idx, 0);
                    });
                    
                    if (currentTimerIndex >= 16) {
                        endPoolSim();
                        return;
                    }
                    
                    activeWorker = currentTimerIndex % 4;
                    
                    workerNodes.forEach((node, idx) => {
                        if (idx === activeWorker) {
                            node.className = 'worker-node busy';
                            node.querySelector('.w-status').textContent = 'Chạy CPU';
                            setCoreLoad(idx, 95, true);
                        } else {
                            node.className = 'worker-node gil-waiting';
                        }
                    });
                    
                    currentTimerIndex++;
                    let timer = setTimeout(gilSwitch, 350);
                    poolTimelineTimers.push(timer);
                }
                
                gilSwitch();
                
            } else {
                gilLockIndicator.classList.remove('locked');
                gilLockIndicator.style.opacity = '0.05';
                
                workerNodes.forEach((node, idx) => {
                    node.className = 'worker-node busy';
                    node.querySelector('.w-status').textContent = 'Chạy CPU';
                    setCoreLoad(idx, 100, true);
                });
                
                let timer1 = setTimeout(() => {
                    workerNodes.forEach((node, idx) => {
                        node.querySelector('.w-status').textContent = 'Task 2 / 2';
                    });
                }, 1000);
                
                let timer2 = setTimeout(() => {
                    endPoolSim();
                }, 2000);

                poolTimelineTimers.push(timer1, timer2);
            }
        }

        function endPoolSim() {
            isPoolRunning = false;
            if (gilLockIndicator) {
                gilLockIndicator.classList.remove('locked');
                gilLockIndicator.style.opacity = simMode === 'thread' ? '0.3' : '0.1';
            }
            workerNodes.forEach((node, idx) => {
                node.className = 'worker-node';
                node.querySelector('.w-status').textContent = 'Xong';
                setCoreLoad(idx, 0);
            });
        }

        runPoolTasksBtn.onclick = runExecutorPoolSimulation;

        function resetPoolSim() {
            poolTimelineTimers.forEach(clearTimeout);
            poolTimelineTimers = [];
            isPoolRunning = false;
            if (gilLockIndicator) {
                gilLockIndicator.classList.remove('locked');
                gilLockIndicator.style.opacity = simMode === 'thread' ? '0.3' : '0.1';
            }
            workerNodes.forEach((node, idx) => {
                node.className = 'worker-node';
                node.querySelector('.w-status').textContent = 'Rảnh';
                setCoreLoad(idx, 0);
            });
        }

        resetPoolSimBtn.onclick = resetPoolSim;
        resetPoolSimGlobal = resetPoolSim;
    }

    // --- SƠ ĐỒ D: WORKER POOL & TASK QUEUE FLOW (Slide 10) ---
    const poolStep1Btn = document.getElementById('poolStep1Btn');
    const poolStep2Btn = document.getElementById('poolStep2Btn');
    const poolStep3Btn = document.getElementById('poolStep3Btn');
    const poolStep4Btn = document.getElementById('poolStep4Btn');
    
    const poolNodeMain = document.getElementById('poolNodeMain');
    const poolNodeFuture = document.getElementById('poolNodeFuture');
    const poolNodeQueue = document.getElementById('poolNodeQueue');
    const poolNodePool = document.getElementById('poolNodePool');
    
    const poolArrowMainQueue = document.getElementById('poolArrowMainQueue');
    const poolArrowMainFuture = document.getElementById('poolArrowMainFuture');
    const poolArrowQueuePool = document.getElementById('poolArrowQueuePool');
    const poolArrowPoolFuture = document.getElementById('poolArrowPoolFuture');
    
    const poolExplainText = document.getElementById('poolExplainText');

    if (poolStep1Btn) {
        function resetPoolFlowSim() {
            if (poolNodeMain) poolNodeMain.className = 'pool-flow-node';
            if (poolNodeFuture) poolNodeFuture.className = 'pool-flow-node';
            if (poolNodeQueue) poolNodeQueue.className = 'pool-flow-node';
            if (poolNodePool) poolNodePool.className = 'pool-flow-node';
            
            if (poolArrowMainQueue) poolArrowMainQueue.className = 'pool-flow-arrow v-arrow';
            if (poolArrowMainFuture) poolArrowMainFuture.className = 'pool-flow-arrow h-arrow';
            if (poolArrowQueuePool) poolArrowQueuePool.className = 'pool-flow-arrow h-arrow';
            if (poolArrowPoolFuture) poolArrowPoolFuture.className = 'pool-flow-arrow v-arrow';
            
            if (poolStep1Btn) poolStep1Btn.disabled = false;
            if (poolStep2Btn) poolStep2Btn.disabled = true;
            if (poolStep3Btn) poolStep3Btn.disabled = true;
            if (poolStep4Btn) poolStep4Btn.disabled = true;
            
            if (poolExplainText) {
                poolExplainText.innerHTML = 'Nhấp nút "Bước 1: Khởi tạo" ở bộ điều khiển để bắt đầu xem cách Pool vận hành.';
            }
        }

        poolStep1Btn.onclick = () => {
            resetPoolFlowSim();
            poolNodeMain.className = 'pool-flow-node active-node';
            poolNodePool.className = 'pool-flow-node active-node';
            poolStep1Btn.disabled = true;
            poolStep2Btn.disabled = false;
            poolExplainText.innerHTML = '<b>Bước 1: Khởi tạo (Initialization):</b> Chương trình chính (Main Thread) khởi tạo sẵn một Worker Pool gồm các luồng hoặc tiến trình con chạy ngầm dưới nền ở trạng thái rảnh rỗi chờ việc.';
        };

        poolStep2Btn.onclick = () => {
            poolArrowMainQueue.className = 'pool-flow-arrow v-arrow active-arrow';
            poolNodeQueue.className = 'pool-flow-node active-node';
            poolArrowMainFuture.className = 'pool-flow-arrow h-arrow active-arrow';
            poolNodeFuture.className = 'pool-flow-node active-future';
            poolStep2Btn.disabled = true;
            poolStep3Btn.disabled = false;
            poolExplainText.innerHTML = '<b>Bước 2: Giao việc & Nhận Future:</b> Main Thread đẩy tác vụ vào Task Queue. Đồng thời, nó nhận ngay đối tượng <b>Future (biên lai)</b> và tiếp tục chạy việc khác trên luồng chính (không bị chặn).';
        };

        poolStep3Btn.onclick = () => {
            poolArrowQueuePool.className = 'pool-flow-arrow h-arrow active-arrow';
            poolNodeQueue.className = 'pool-flow-node'; // queue gets cleared
            poolArrowMainQueue.className = 'pool-flow-arrow v-arrow';
            poolStep3Btn.disabled = true;
            poolStep4Btn.disabled = false;
            poolExplainText.innerHTML = '<b>Bước 3: Worker xử lý độc lập:</b> Một Worker rảnh rỗi trong Pool tự động rút tác vụ từ Task Queue và chạy tính toán độc lập dưới nền (trên luồng con hoặc CPU core riêng).';
        };

        poolStep4Btn.onclick = () => {
            poolArrowPoolFuture.className = 'pool-flow-arrow v-arrow active-arrow';
            poolNodeFuture.className = 'pool-flow-node active-future';
            poolArrowQueuePool.className = 'pool-flow-arrow h-arrow';
            poolStep4Btn.disabled = true;
            poolExplainText.innerHTML = '<b>Bước 4: Trả kết quả & Giải phóng:</b> Worker hoàn thành tác vụ, ghi dữ liệu kết quả vào Future và trở về trạng thái rảnh. Main Thread kiểm tra Future và lấy kết quả vào thời điểm thích hợp.';
        };

        resetPoolFlowSimGlobal = resetPoolFlowSim;
    }

    // --- SIMULATION 5: FUTURE LIFECYCLE (Slide 16) ---
    const futureCreateBtn = document.getElementById('futureCreateBtn');
    const futureStartBtn = document.getElementById('futureStartBtn');
    const futureFinishBtn = document.getElementById('futureFinishBtn');
    const futureCancelBtn = document.getElementById('futureCancelBtn');
    const futureStatePending = document.getElementById('futureStatePending');
    const futureStateRunning = document.getElementById('futureStateRunning');
    const futureStateFinished = document.getElementById('futureStateFinished');
    const futureStateCancelled = document.getElementById('futureStateCancelled');
    const futureExplainText = document.getElementById('futureExplainText');

    if (futureCreateBtn) {
        function resetFutureSim() {
            if (futureStatePending) futureStatePending.className = 'state-card pnd';
            if (futureStateRunning) futureStateRunning.className = 'state-card rng';
            if (futureStateFinished) futureStateFinished.className = 'state-card dn';
            if (futureStateCancelled) futureStateCancelled.className = 'state-card cnc';
            
            if (futureCreateBtn) futureCreateBtn.disabled = false;
            if (futureStartBtn) futureStartBtn.disabled = true;
            if (futureFinishBtn) futureFinishBtn.disabled = true;
            if (futureCancelBtn) futureCancelBtn.disabled = true;
            
            if (futureExplainText) {
                futureExplainText.innerHTML = 'Nhấp nút "Gửi việc" ở bộ điều khiển để bắt đầu khởi tạo Future.';
            }
        }

        futureCreateBtn.onclick = () => {
            resetFutureSim();
            futureStatePending.className = 'state-card pnd active-pnd';
            futureCreateBtn.disabled = true;
            futureStartBtn.disabled = false;
            futureCancelBtn.disabled = false;
            futureExplainText.innerHTML = 'Future được khởi tạo ở trạng thái <b>PENDING</b>. Tác vụ đang nằm trong hàng đợi chờ Thread/Process Worker rảnh để xử lý. Lúc này, bạn có thể hủy tác vụ.';
        };

        futureStartBtn.onclick = () => {
            futureStatePending.className = 'state-card pnd';
            futureStateRunning.className = 'state-card rng active-rng';
            futureStartBtn.disabled = true;
            futureFinishBtn.disabled = false;
            futureCancelBtn.disabled = true;
            futureExplainText.innerHTML = 'Tác vụ đang chạy ở trạng thái <b>RUNNING</b> ngầm dưới nền. Lúc này, nếu bạn gọi <code>future.result()</code> từ luồng chính, luồng chính sẽ <b>bị chặn hoàn toàn (blocking)</b> để đứng chờ cho đến khi tác vụ chạy xong.';
        };

        futureFinishBtn.onclick = () => {
            futureStateRunning.className = 'state-card rng';
            futureStateFinished.className = 'state-card dn active-dn';
            futureFinishBtn.disabled = true;
            futureExplainText.innerHTML = 'Tác vụ đã hoàn thành ở trạng thái <b>FINISHED</b>. Kết quả hoặc ngoại lệ đã được ghi nhận vào đối tượng Future. Lúc này, gọi <code>future.result()</code> sẽ trả về kết quả lập tức (non-blocking) và kích hoạt các hàm <code>add_done_callback()</code>.';
        };

        futureCancelBtn.onclick = () => {
            futureStatePending.className = 'state-card pnd';
            futureStateCancelled.className = 'state-card cnc active-cnc';
            futureStartBtn.disabled = true;
            futureCancelBtn.disabled = true;
            futureExplainText.innerHTML = 'Tác vụ đã được hủy bỏ thành công từ hàng đợi (trạng thái <b>CANCELLED</b>). Lúc này, worker sẽ không chạy tác vụ này nữa. Gọi <code>future.result()</code> sẽ ném lỗi <code>CancelledError</code>.';
        };

        resetFutureSimGlobal = resetFutureSim;
    }

    // --- SƠ ĐỒ B: EVENT LOOP ARCHITECTURE (Slide 25) ---
    const flowStep1Btn = document.getElementById('flowStep1Btn');
    const flowStep2Btn = document.getElementById('flowStep2Btn');
    const flowStep3Btn = document.getElementById('flowStep3Btn');
    const flowStep4Btn = document.getElementById('flowStep4Btn');
    const nodeSource = document.getElementById('nodeSource');
    const nodeQueue = document.getElementById('nodeQueue');
    const nodeLoop = document.getElementById('nodeLoop');
    const nodeHandler = document.getElementById('nodeHandler');
    const arrowSrcQueue = document.getElementById('arrowSrcQueue');
    const arrowQueueLoop = document.getElementById('arrowQueueLoop');
    const arrowLoopHandler = document.getElementById('arrowLoopHandler');
    const flowExplainText = document.getElementById('flowExplainText');

    if (flowStep1Btn) {
        function moveTokenToNode(nodeId) {
            const container = document.getElementById('flowDiagContainer');
            const node = document.getElementById(nodeId);
            const token = document.getElementById('flowEventToken');
            if (!container || !node || !token) return;
            
            token.style.display = 'block';
            const containerRect = container.getBoundingClientRect();
            const nodeRect = node.getBoundingClientRect();
            
            const leftPos = nodeRect.left - containerRect.left + (nodeRect.width / 2) - 7;
            const topPos = nodeRect.top - containerRect.top + (nodeRect.height / 2) - 7;
            
            token.style.left = `${leftPos}px`;
            token.style.top = `${topPos}px`;
        }

        function resetEventFlowSim() {
            if (nodeSource) nodeSource.className = 'flow-diag-node';
            if (nodeQueue) nodeQueue.className = 'flow-diag-node';
            if (nodeLoop) nodeLoop.className = 'flow-diag-node';
            if (nodeHandler) nodeHandler.className = 'flow-diag-node';
            
            if (arrowSrcQueue) arrowSrcQueue.className = 'flow-diag-arrow';
            if (arrowQueueLoop) arrowQueueLoop.className = 'flow-diag-arrow';
            if (arrowLoopHandler) arrowLoopHandler.className = 'flow-diag-arrow';
            
            if (flowStep1Btn) flowStep1Btn.disabled = false;
            if (flowStep2Btn) flowStep2Btn.disabled = true;
            if (flowStep3Btn) flowStep3Btn.disabled = true;
            if (flowStep4Btn) flowStep4Btn.disabled = true;
            
            const token = document.getElementById('flowEventToken');
            if (token) token.style.display = 'none';

            if (flowExplainText) {
                flowExplainText.innerHTML = 'Nhấp nút "Bước 1: Nguồn phát" ở bộ điều khiển để bắt đầu xem cách sự kiện truyền phát.';
            }
        }

        flowStep1Btn.onclick = () => {
            resetEventFlowSim();
            nodeSource.className = 'flow-diag-node active-node';
            moveTokenToNode('nodeSource');
            flowStep1Btn.disabled = true;
            flowStep2Btn.disabled = false;
            flowExplainText.innerHTML = '<b>Bước 1: Nguồn phát sự kiện (Event Source)</b> phát đi một sự kiện (như click chuột hoặc nhận dữ liệu mạng) và đẩy nó về phía Hàng đợi.';
        };

        flowStep2Btn.onclick = () => {
            arrowSrcQueue.className = 'flow-diag-arrow active-arrow';
            nodeQueue.className = 'flow-diag-node active-node';
            moveTokenToNode('nodeQueue');
            flowStep2Btn.disabled = true;
            flowStep3Btn.disabled = false;
            flowExplainText.innerHTML = '<b>Bước 2: Hàng đợi sự kiện (Event Queue)</b> nhận sự kiện từ nguồn phát và lưu giữ tạm thời trong hàng đợi theo cơ chế FIFO (Vào trước - Ra trước).';
        };

        flowStep3Btn.onclick = () => {
            arrowQueueLoop.className = 'flow-diag-arrow active-arrow';
            nodeLoop.className = 'flow-diag-node active-node';
            moveTokenToNode('nodeLoop');
            flowStep3Btn.disabled = true;
            flowStep4Btn.disabled = false;
            flowExplainText.innerHTML = '<b>Bước 3: Vòng lặp sự kiện (Event Loop)</b> chạy liên tục xuyên suốt chương trình, tự động phát hiện sự kiện mới trong Queue và rút ra để điều phối.';
        };

        flowStep4Btn.onclick = () => {
            arrowLoopHandler.className = 'flow-diag-arrow active-arrow';
            nodeHandler.className = 'flow-diag-node active-node';
            moveTokenToNode('nodeHandler');
            flowStep4Btn.disabled = true;
            flowExplainText.innerHTML = '<b>Bước 4: Trình xử lý sự kiện (Event Handler / Callback)</b> được Event Loop kích hoạt để chạy xử lý logic của sự kiện trên luồng chính của chương trình.';
        };

        resetEventFlowSimGlobal = resetEventFlowSim;
    }

    // --- SIMULATION 3: COROUTINES (ASYNC/AWAIT) (Slide 32) ---
    const runCoroSimBtn = document.getElementById('runCoroSimBtn');
    const resetCoroSimBtn = document.getElementById('resetCoroSimBtn');
    const threadExecBox = document.getElementById('threadExecBox');
    const threadCurrentState = document.getElementById('threadCurrentState');
    const memoryStackBox = document.getElementById('memoryStackBox');
    
    if (runCoroSimBtn) {
        const lines = {
            a1: document.getElementById('line-a1'),
            a2: document.getElementById('line-a2'),
            a3: document.getElementById('line-a3'),
            a4: document.getElementById('line-a4'),
            b1: document.getElementById('line-b1'),
            b2: document.getElementById('line-b2'),
            b3: document.getElementById('line-b3'),
            b4: document.getElementById('line-b4')
        };

        let coroTimelineTimers = [];
        let isCoroSimRunning = false;

        function clearLineHighlights() {
            Object.values(lines).forEach(line => {
                if (line) line.classList.remove('active-line');
            });
        }

        function highlightLine(lineKey) {
            clearLineHighlights();
            if (lines[lineKey]) lines[lineKey].classList.add('active-line');
        }

        function setThreadState(className, label, ballClass = null, ballLabel = null) {
            if (!threadExecBox) return;
            threadExecBox.className = `thread-exec-box ${className}`;
            threadCurrentState.textContent = label;
            
            const oldBall = threadExecBox.querySelector('.sim-running-coro');
            if (oldBall) oldBall.remove();

            if (ballClass) {
                const ball = document.createElement('div');
                ball.className = `sim-running-coro ${ballClass}`;
                ball.textContent = ballLabel;
                threadExecBox.appendChild(ball);
            }
        }

        function pushStackFrame(id, title, variables) {
            if (!memoryStackBox) return;
            const emptyText = memoryStackBox.querySelector('.stack-empty-text');
            if (emptyText) emptyText.remove();

            const card = document.createElement('div');
            card.className = `stack-frame-card ${id}-frame`;
            card.id = `frame-${id}`;
            
            const cardTitle = document.createElement('div');
            cardTitle.className = 'frame-title';
            cardTitle.textContent = title;
            
            const cardVars = document.createElement('div');
            cardVars.className = 'frame-vars';
            cardVars.textContent = variables;

            card.appendChild(cardTitle);
            card.appendChild(cardVars);
            memoryStackBox.appendChild(card);
        }

        function removeStackFrame(id) {
            if (!memoryStackBox) return;
            const card = document.getElementById(`frame-${id}`);
            if (card) card.remove();

            if (memoryStackBox.children.length === 0) {
                memoryStackBox.innerHTML = '<span class="stack-empty-text">Bộ nhớ trống...</span>';
            }
        }

        function runCoroutineSimulation() {
            if (isCoroSimRunning) return;
            isCoroSimRunning = true;

            clearLineHighlights();
            if (memoryStackBox) {
                memoryStackBox.innerHTML = '<span class="stack-empty-text">Bộ nhớ trống...</span>';
            }
            
            highlightLine('a1');
            setThreadState('running-a', 'Chạy Task A', 'task-a-ball', 'task_a()');
            
            let t1 = setTimeout(() => {
                highlightLine('a2');
            }, 1000);

            let t2 = setTimeout(() => {
                highlightLine('a3');
                setThreadState('', 'ĐANG CHỜ I/O (BỊ TREO)');
                pushStackFrame('task-a', 'Task A (Treo)', 'IP: Line 3\nlocal_v: "A"\nstate: sleep(1)');
            }, 2200);

            let t3 = setTimeout(() => {
                highlightLine('b1');
                setThreadState('running-b', 'Chạy Task B', 'task-b-ball', 'task_b()');
            }, 3400);

            let t4 = setTimeout(() => {
                highlightLine('b2');
            }, 4400);

            let t5 = setTimeout(() => {
                highlightLine('b3');
                setThreadState('', 'ĐANG CHỜ I/O (BỊ TREO)');
                pushStackFrame('task-b', 'Task B (Treo)', 'IP: Line 7\nlocal_v: "B"\nstate: sleep(1)');
            }, 5600);

            let t6 = setTimeout(() => {
                removeStackFrame('task-a');
                highlightLine('a4');
                setThreadState('running-a', 'Khôi phục Task A', 'task-a-ball', 'task_a()');
            }, 6800);

            let t7 = setTimeout(() => {
                removeStackFrame('task-b');
                highlightLine('b4');
                setThreadState('running-b', 'Khôi phục Task B', 'task-b-ball', 'task_b()');
            }, 8000);

            let t8 = setTimeout(() => {
                clearLineHighlights();
                setThreadState('', 'RẢNH RỖI');
                isCoroSimRunning = false;
            }, 9200);

            coroTimelineTimers.push(t1, t2, t3, t4, t5, t6, t7, t8);
        }

        runCoroSimBtn.onclick = runCoroutineSimulation;

        function resetCoroSim() {
            coroTimelineTimers.forEach(clearTimeout);
            coroTimelineTimers = [];
            isCoroSimRunning = false;
            clearLineHighlights();
            setThreadState('', 'RẢNH RỖI');
            if (memoryStackBox) {
                memoryStackBox.innerHTML = '<span class="stack-empty-text">Bộ nhớ trống...</span>';
            }
        }

        resetCoroSimBtn.onclick = resetCoroSim;
        resetCoroSimGlobal = resetCoroSim;
    }

    // =================================================================
    // --- SIMULATION: POOL DISPATCHER (Slide 18) ---
    // =================================================================
    const poolDispStartBtn = document.getElementById('poolDispStartBtn');
    const poolDispAddBtn = document.getElementById('poolDispAddBtn');
    const poolDispResetBtn = document.getElementById('poolDispResetBtn');
    const poolDispQueue = document.getElementById('poolDispQueue');
    const poolDispW0 = document.getElementById('poolDispW0');
    const poolDispW1 = document.getElementById('poolDispW1');
    const poolDispW2 = document.getElementById('poolDispW2');

    if (poolDispStartBtn) {
        let dispQueue = [];
        let isDispRunning = false;
        let dispTimers = [];
        let nextTaskId = 1;
        let activeWorkers = { W0: false, W1: false, W2: false };

        function addDispTask() {
            if (dispQueue.length >= 6) return;
            const taskName = `Task ${nextTaskId++}`;
            dispQueue.push(taskName);

            const bubble = document.createElement('div');
            bubble.className = 'dispatch-task-bubble';
            bubble.id = `disp-task-${taskName}`;
            bubble.textContent = taskName;
            if (poolDispQueue) poolDispQueue.appendChild(bubble);
            
            if (isDispRunning) {
                dispatchNextTask();
            }
        }

        function dispatchNextTask() {
            if (dispQueue.length === 0) return;
            
            let freeWorkerKey = null;
            if (!activeWorkers.W0) freeWorkerKey = 'W0';
            else if (!activeWorkers.W1) freeWorkerKey = 'W1';
            else if (!activeWorkers.W2) freeWorkerKey = 'W2';
            
            if (!freeWorkerKey) return;
            
            const taskName = dispQueue.shift();
            const bubble = document.getElementById(`disp-task-${taskName}`);
            if (bubble) bubble.remove();

            activeWorkers[freeWorkerKey] = true;
            const wNode = document.getElementById(`poolDisp${freeWorkerKey}`);
            if (wNode) {
                wNode.className = 'worker-disp-node busy';
                const statusSpan = wNode.querySelector('.w-disp-status');
                statusSpan.className = 'w-disp-status working';
                statusSpan.textContent = `Running ${taskName}`;
            }

            const timer = setTimeout(() => {
                activeWorkers[freeWorkerKey] = false;
                if (wNode) {
                    wNode.className = 'worker-disp-node';
                    const statusSpan = wNode.querySelector('.w-disp-status');
                    statusSpan.className = 'w-disp-status idle';
                    statusSpan.textContent = 'Idle';
                }
                if (isDispRunning) {
                    dispatchNextTask();
                }
            }, 2000);
            
            dispTimers.push(timer);
        }

        function runPoolDispSimulation() {
            if (isDispRunning) return;
            isDispRunning = true;
            poolDispStartBtn.disabled = true;
            
            dispatchNextTask();
            dispatchNextTask();
            dispatchNextTask();
        }

        function resetPoolDispSim() {
            dispTimers.forEach(clearTimeout);
            dispTimers = [];
            isDispRunning = false;
            dispQueue = [];
            nextTaskId = 1;
            activeWorkers = { W0: false, W1: false, W2: false };
            
            if (poolDispQueue) poolDispQueue.innerHTML = '';
            
            const workers = [poolDispW0, poolDispW1, poolDispW2];
            workers.forEach(wNode => {
                if (wNode) {
                    wNode.className = 'worker-disp-node';
                    const statusSpan = wNode.querySelector('.w-disp-status');
                    statusSpan.className = 'w-disp-status idle';
                    statusSpan.textContent = 'Idle';
                }
            });
            
            if (poolDispStartBtn) poolDispStartBtn.disabled = false;
            
            addDispTask();
            addDispTask();
            addDispTask();
            addDispTask();
        }

        poolDispStartBtn.onclick = runPoolDispSimulation;
        poolDispAddBtn.onclick = addDispTask;
        poolDispResetBtn.onclick = resetPoolDispSim;
        resetPoolDispSimGlobal = resetPoolDispSim;
        
        resetPoolDispSim();
    }

    // =================================================================
    // --- SIMULATION: POOL WORKFLOW S22 (Slide 22) ---
    // =================================================================
    const sim22TaskIO = document.getElementById('sim22TaskIO');
    const sim22TaskCPU = document.getElementById('sim22TaskCPU');
    const sim22PoolThread = document.getElementById('sim22PoolThread');
    const sim22PoolProcess = document.getElementById('sim22PoolProcess');
    const sim22RunBtn = document.getElementById('sim22RunBtn');
    const sim22ResetBtn = document.getElementById('sim22ResetBtn');
    const sim22ProgressContainer = document.getElementById('sim22ProgressContainer');
    const sim22TerminalLogs = document.getElementById('sim22TerminalLogs');

    if (sim22TaskIO) {
        let taskType = 'io';
        let poolType = 'thread';
        let isSim22Running = false;
        let sim22Timers = [];

        sim22TaskIO.onclick = () => {
            if (isSim22Running) return;
            taskType = 'io';
            sim22TaskIO.classList.add('active');
            sim22TaskCPU.classList.remove('active');
            sim22PoolThread.classList.add('active');
            sim22PoolProcess.classList.remove('active');
            poolType = 'thread';
            resetSim22();
        };

        sim22TaskCPU.onclick = () => {
            if (isSim22Running) return;
            taskType = 'cpu';
            sim22TaskCPU.classList.add('active');
            sim22TaskIO.classList.remove('active');
            resetSim22();
        };

        sim22PoolThread.onclick = () => {
            if (isSim22Running) return;
            poolType = 'thread';
            sim22PoolThread.classList.add('active');
            sim22PoolProcess.classList.remove('active');
            resetSim22();
        };

        sim22PoolProcess.onclick = () => {
            if (isSim22Running) return;
            poolType = 'process';
            sim22PoolProcess.classList.add('active');
            sim22PoolThread.classList.remove('active');
            resetSim22();
        };

        function addLog22(text) {
            if (sim22TerminalLogs) {
                sim22TerminalLogs.textContent += text + '\n';
                sim22TerminalLogs.parentElement.scrollTop = sim22TerminalLogs.parentElement.scrollHeight;
            }
        }

        function resetSim22() {
            sim22Timers.forEach(clearInterval);
            sim22Timers.forEach(clearTimeout);
            sim22Timers = [];
            isSim22Running = false;
            if (sim22RunBtn) sim22RunBtn.disabled = false;
            
            if (sim22TerminalLogs) sim22TerminalLogs.textContent = 'Chờ chạy mô phỏng...\n';
            
            if (sim22ProgressContainer) {
                sim22ProgressContainer.innerHTML = '';
                const numTasks = taskType === 'io' ? 3 : 4;
                for (let i = 0; i < numTasks; i++) {
                    const label = taskType === 'io' ? `URL ${i+1}` : `Input ${i+1}`;
                    const row = document.createElement('div');
                    row.className = 'sim-task-row';
                    row.innerHTML = `
                        <span class="sim-task-name">${label}</span>
                        <div class="sim-task-progress-bg">
                            <div class="sim-task-progress-bar" id="sim22-bar-${i}"></div>
                        </div>
                    `;
                    sim22ProgressContainer.appendChild(row);
                }
            }
        }

        function runSim22() {
            if (isSim22Running) return;
            isSim22Running = true;
            sim22RunBtn.disabled = true;
            if (sim22TerminalLogs) sim22TerminalLogs.textContent = '';
            
            const numTasks = taskType === 'io' ? 3 : 4;
            const bars = [];
            for (let i = 0; i < numTasks; i++) {
                bars.push(document.getElementById(`sim22-bar-${i}`));
            }

            addLog22(`[Start] Bắt đầu chạy ${taskType === 'io' ? 'I/O-bound' : 'CPU-bound'} với ${poolType === 'thread' ? 'ThreadPool' : 'ProcessPool'}...`);

            if (taskType === 'io') {
                bars.forEach((bar, idx) => {
                    addLog22(`[Queue] Gửi URL ${idx+1} vào pool`);
                    bar.style.width = '0%';
                });

                let progress = [0, 0, 0];
                let interval = setInterval(() => {
                    let doneCount = 0;
                    for (let i = 0; i < 3; i++) {
                        if (progress[i] < 100) {
                            progress[i] += Math.random() * 15 + 5;
                            if (progress[i] >= 100) {
                                progress[i] = 100;
                                bars[i].classList.add('done');
                                addLog22(`[Xong] URL ${i+1} tải hoàn thành!`);
                            }
                            bars[i].style.width = `${progress[i]}%`;
                        } else {
                            doneCount++;
                        }
                    }

                    if (doneCount === 3) {
                        clearInterval(interval);
                        addLog22(`[Kết quả] Hoàn thành 3 URLs trong ~1.00s!`);
                        isSim22Running = false;
                    }
                }, 100);
                
                sim22Timers.push(interval);

            } else {
                if (poolType === 'thread') {
                    bars.forEach((bar, idx) => {
                        bar.classList.add('waiting');
                    });
                    
                    let currentTaskIdx = 0;
                    let progress = 0;
                    
                    addLog22(`[Cảnh báo] ThreadPool chạy CPU-bound bị khóa GIL, các luồng bị chặn và chạy tuần tự!`);
                    
                    function runCpuThreadTask() {
                        if (currentTaskIdx >= 4) {
                            addLog22(`[Kết quả] Hoàn thành 4 Inputs mất ~4.00s (Tệ!)`);
                            isSim22Running = false;
                            return;
                        }
                        
                        addLog22(`[Chạy] Core chỉ cho phép chạy 1 luồng: Input ${currentTaskIdx+1}...`);
                        const currentBar = bars[currentTaskIdx];
                        currentBar.classList.remove('waiting');
                        progress = 0;
                        
                        let interval = setInterval(() => {
                            progress += 10;
                            currentBar.style.width = `${progress}%`;
                            
                            if (progress >= 100) {
                                clearInterval(interval);
                                currentBar.classList.add('done');
                                addLog22(`[Xong] Input ${currentTaskIdx+1} hoàn tất!`);
                                currentTaskIdx++;
                                runCpuThreadTask();
                            }
                        }, 100);
                        
                        sim22Timers.push(interval);
                    }
                    
                    runCpuThreadTask();

                } else {
                    bars.forEach((bar, idx) => {
                        addLog22(`[Queue] Giao Input ${idx+1} cho Process Worker ${idx}`);
                    });
                    
                    let progress = [0, 0, 0, 0];
                    let interval = setInterval(() => {
                        let doneCount = 0;
                        for (let i = 0; i < 4; i++) {
                            if (progress[i] < 100) {
                                progress[i] += Math.random() * 15 + 5;
                                if (progress[i] >= 100) {
                                    progress[i] = 100;
                                    bars[i].classList.add('done');
                                    addLog22(`[Xong] Process Worker ${i} hoàn thành Input ${i+1}!`);
                                }
                                bars[i].style.width = `${progress[i]}%`;
                            } else {
                                doneCount++;
                            }
                        }

                        if (doneCount === 4) {
                            clearInterval(interval);
                            addLog22(`[Kết quả] Hoàn thành 4 Inputs trên 4 nhân thực tế trong ~1.00s!`);
                            isSim22Running = false;
                        }
                    }, 100);
                    
                    sim22Timers.push(interval);
                }
            }
        }

        sim22RunBtn.onclick = runSim22;
        sim22ResetBtn.onclick = resetSim22;
        resetSim22Global = resetSim22;

        resetSim22();
    }

    // =================================================================
    // --- SIMULATION: ASYNC CODE RUN (Slide 31) ---
    // =================================================================
    const runAsyncCodeBtn = document.getElementById('runAsyncCodeBtn');
    const resetAsyncCodeBtn = document.getElementById('resetAsyncCodeBtn');
    const asyncTerminalLogs = document.getElementById('asyncTerminalLogs');
    
    if (runAsyncCodeBtn) {
        let asyncSimTimers = [];
        let isAsyncRunning = false;

        const lines31 = {
            main: [document.getElementById('s31-l10'), document.getElementById('s31-l11')],
            t1: document.getElementById('s31-l12'),
            t2: document.getElementById('s31-l13'),
            t3: document.getElementById('s31-l14'),
            gather: document.getElementById('s31-l15'),
            end: document.getElementById('s31-l16'),
            fetchDone: document.getElementById('s31-l7')
        };

        function clear31Highlights() {
            Object.values(lines31).forEach(el => {
                if (Array.isArray(el)) {
                    el.forEach(sub => { if (sub) sub.classList.remove('active-line'); });
                } else if (el) {
                    el.classList.remove('active-line');
                }
            });
        }

        function highlight31Line(key) {
            clear31Highlights();
            const el = lines31[key];
            if (Array.isArray(el)) {
                el.forEach(sub => { if (sub) sub.classList.add('active-line'); });
            } else if (el) {
                el.classList.add('active-line');
            }
        }

        function addAsyncLog(text) {
            if (asyncTerminalLogs) {
                asyncTerminalLogs.textContent += text + '\n';
                asyncTerminalLogs.parentElement.scrollTop = asyncTerminalLogs.parentElement.scrollHeight;
            }
        }

        function resetAsyncCodeSim() {
            asyncSimTimers.forEach(clearTimeout);
            asyncSimTimers = [];
            isAsyncRunning = false;
            clear31Highlights();
            if (asyncTerminalLogs) asyncTerminalLogs.textContent = 'Chờ chạy code...\n';
            if (runAsyncCodeBtn) runAsyncCodeBtn.disabled = false;
        }

        function runAsyncCodeSim() {
            if (isAsyncRunning) return;
            isAsyncRunning = true;
            runAsyncCodeBtn.disabled = true;
            if (asyncTerminalLogs) asyncTerminalLogs.textContent = '';

            addAsyncLog('--- BẤT ĐẦU CHẠY BẤT ĐỒNG BỘ ---');
            highlight31Line('main');

            let t1 = setTimeout(() => {
                highlight31Line('t1');
                addAsyncLog('[Async] Bắt đầu tải Task 1 (chờ 2s)...');
            }, 800);

            let t2 = setTimeout(() => {
                highlight31Line('t2');
                addAsyncLog('[Async] Bắt đầu tải Task 2 (chờ 3s)...');
            }, 1600);

            let t3 = setTimeout(() => {
                highlight31Line('t3');
                addAsyncLog('[Async] Bắt đầu tải Task 3 (chờ 1s)...');
            }, 2400);

            let t4 = setTimeout(() => {
                highlight31Line('gather');
                addAsyncLog('[Gather] Đang đợi cả 3 tasks hoàn thành (non-blocking)...');
            }, 3200);

            let timer3_done = setTimeout(() => {
                highlight31Line('fetchDone');
                addAsyncLog('[Async] -> Đã tải xong Task 3!');
            }, 3800);

            let timer1_done = setTimeout(() => {
                highlight31Line('fetchDone');
                addAsyncLog('[Async] -> Đã tải xong Task 1!');
            }, 4800);

            let timer2_done = setTimeout(() => {
                highlight31Line('fetchDone');
                addAsyncLog('[Async] -> Đã tải xong Task 2!');
            }, 5800);

            let t_end = setTimeout(() => {
                highlight31Line('end');
                addAsyncLog('[Async] Tổng thời gian: 3.01s');
                isAsyncRunning = false;
            }, 6600);

            asyncSimTimers.push(t1, t2, t3, t4, timer3_done, timer1_done, timer2_done, t_end);
        }

        runAsyncCodeBtn.onclick = runAsyncCodeSim;
        resetAsyncCodeBtn.onclick = resetAsyncCodeSim;
        resetAsyncCodeSimGlobal = resetAsyncCodeSim;
    }

    // =================================================================
    // --- SIMULATION: TASK CANCEL RUN (Slide 33) ---
    // =================================================================
    const runCancelCodeBtn = document.getElementById('runCancelCodeBtn');
    const resetCancelCodeBtn = document.getElementById('resetCancelCodeBtn');
    const cancelTerminalLogs = document.getElementById('cancelTerminalLogs');

    if (runCancelCodeBtn) {
        let cancelSimTimers = [];
        let isCancelRunning = false;

        const lines33 = {
            mainStart: [document.getElementById('s33-l10'), document.getElementById('s33-l11')],
            taskStart: [document.getElementById('s33-l1'), document.getElementById('s33-l2'), document.getElementById('s33-l3')],
            sleepTask: document.getElementById('s33-l4'),
            printMain: document.getElementById('s33-l14'),
            cancel: document.getElementById('s33-l15'),
            exceptTask: [document.getElementById('s33-l6'), document.getElementById('s33-l7'), document.getElementById('s33-l8')],
            awaitMain: document.getElementById('s33-l17'),
            exceptMain: [document.getElementById('s33-l18'), document.getElementById('s33-l19')]
        };

        function clear33Highlights() {
            Object.values(lines33).forEach(el => {
                if (Array.isArray(el)) {
                    el.forEach(sub => { if (sub) sub.classList.remove('active-line'); });
                } else if (el) {
                    el.classList.remove('active-line');
                }
            });
        }

        function highlight33Line(key) {
            clear33Highlights();
            const el = lines33[key];
            if (Array.isArray(el)) {
                el.forEach(sub => { if (sub) sub.classList.add('active-line'); });
            } else if (el) {
                el.classList.add('active-line');
            }
        }

        function addCancelLog(text) {
            if (cancelTerminalLogs) {
                cancelTerminalLogs.textContent += text + '\n';
                cancelTerminalLogs.parentElement.scrollTop = cancelTerminalLogs.parentElement.scrollHeight;
            }
        }

        function resetCancelCodeSim() {
            cancelSimTimers.forEach(clearTimeout);
            cancelSimTimers = [];
            isCancelRunning = false;
            clear33Highlights();
            if (cancelTerminalLogs) cancelTerminalLogs.textContent = 'Chờ chạy code...\n';
            if (runCancelCodeBtn) runCancelCodeBtn.disabled = false;
        }

        function runCancelCodeSim() {
            if (isCancelRunning) return;
            isCancelRunning = true;
            runCancelCodeBtn.disabled = true;
            if (cancelTerminalLogs) cancelTerminalLogs.textContent = '';

            highlight33Line('mainStart');
            
            let t1 = setTimeout(() => {
                highlight33Line('taskStart');
                addCancelLog('-> [Task]: Đang chạy ngầm...');
            }, 800);

            let t2 = setTimeout(() => {
                highlight33Line('sleepTask');
            }, 1600);

            let t3 = setTimeout(() => {
                highlight33Line('printMain');
                addCancelLog('Hoàn thành chưa? False | Yêu cầu hủy...');
            }, 2400);

            let t4 = setTimeout(() => {
                highlight33Line('cancel');
            }, 3200);

            let t5 = setTimeout(() => {
                highlight33Line('exceptTask');
                addCancelLog('-> [Task]: Đã bắt được sự kiện HỦY!');
            }, 4000);

            let t6 = setTimeout(() => {
                highlight33Line('awaitMain');
            }, 4800);

            let t7 = setTimeout(() => {
                highlight33Line('exceptMain');
                addCancelLog('Đã xác nhận hủy thành công.');
                isCancelRunning = false;
            }, 5600);

            cancelSimTimers.push(t1, t2, t3, t4, t5, t6, t7);
        }

        runCancelCodeBtn.onclick = runCancelCodeSim;
        resetCancelCodeBtn.onclick = resetCancelCodeSim;
        resetCancelCodeSimGlobal = resetCancelCodeSim;
    }

    // =================================================================
    // --- SIMULATION: FUTURE CALLBACK RUN (Slide 34) ---
    // =================================================================
    const runFutureCodeBtn = document.getElementById('runFutureCodeBtn');
    const resetFutureCodeBtn = document.getElementById('resetFutureCodeBtn');
    const futureTerminalLogs = document.getElementById('futureTerminalLogs');

    if (runFutureCodeBtn) {
        let futureSimTimers = [];
        let isFutureRunning = false;

        const lines34 = {
            mainStart: [document.getElementById('s34-l11'), document.getElementById('s34-l12'), document.getElementById('s34-l13')],
            addCallback: document.getElementById('s34-l16'),
            createTask: document.getElementById('s34-l17'),
            printMain: document.getElementById('s34-l19'),
            awaitFuture: document.getElementById('s34-l20'),
            coroStart: [document.getElementById('s34-l5'), document.getElementById('s34-l6')],
            coroSleep: document.getElementById('s34-l7'),
            coroSet: [document.getElementById('s34-l8'), document.getElementById('s34-l9')],
            callback: [document.getElementById('s34-l1'), document.getElementById('s34-l2'), document.getElementById('s34-l3')]
        };

        function clear34Highlights() {
            Object.values(lines34).forEach(el => {
                if (Array.isArray(el)) {
                    el.forEach(sub => { if (sub) sub.classList.remove('active-line'); });
                } else if (el) {
                    el.classList.remove('active-line');
                }
            });
        }

        function highlight34Line(key) {
            clear34Highlights();
            const el = lines34[key];
            if (Array.isArray(el)) {
                el.forEach(sub => { if (sub) sub.classList.add('active-line'); });
            } else if (el) {
                el.classList.add('active-line');
            }
        }

        function addFutureLog(text) {
            if (futureTerminalLogs) {
                futureTerminalLogs.textContent += text + '\n';
                futureTerminalLogs.parentElement.scrollTop = futureTerminalLogs.parentElement.scrollHeight;
            }
        }

        function resetFutureCodeSim() {
            futureSimTimers.forEach(clearTimeout);
            futureSimTimers = [];
            isFutureRunning = false;
            clear34Highlights();
            if (futureTerminalLogs) futureTerminalLogs.textContent = 'Chờ chạy code...\n';
            if (runFutureCodeBtn) runFutureCodeBtn.disabled = false;
        }

        function runFutureCodeSim() {
            if (isFutureRunning) return;
            isFutureRunning = true;
            runFutureCodeBtn.disabled = true;
            if (futureTerminalLogs) futureTerminalLogs.textContent = '';

            highlight34Line('mainStart');

            let t1 = setTimeout(() => {
                highlight34Line('addCallback');
            }, 800);

            let t2 = setTimeout(() => {
                highlight34Line('createTask');
            }, 1600);

            let t3 = setTimeout(() => {
                highlight34Line('printMain');
                addFutureLog('Main đang chờ Future...');
            }, 2400);

            let t4 = setTimeout(() => {
                highlight34Line('coroStart');
                addFutureLog('-> [Coroutine]: Đang xử lý ngầm...');
            }, 3200);

            let t5 = setTimeout(() => {
                highlight34Line('coroSleep');
            }, 4000);

            let t6 = setTimeout(() => {
                highlight34Line('coroSet');
                addFutureLog('-> [Coroutine]: Đã xong! Thiết lập kết quả...');
            }, 4800);

            let t7 = setTimeout(() => {
                highlight34Line('callback');
                addFutureLog('-> [Callback]: Nhận tín hiệu!');
                addFutureLog('-> [Callback]: Kết quả = \'KẾT QUẢ THÀNH CÔNG\'');
            }, 5600);

            let t8 = setTimeout(() => {
                highlight34Line('awaitFuture');
                isFutureRunning = false;
            }, 6400);

            futureSimTimers.push(t1, t2, t3, t4, t5, t6, t7, t8);
        }

        runFutureCodeBtn.onclick = runFutureCodeSim;
        resetFutureCodeBtn.onclick = resetFutureCodeSim;
        resetFutureCodeSimGlobal = resetFutureCodeSim;
    }
}
