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

    // ── Hỗ trợ vuốt cảm ứng (Touch Swipe) cho điện thoại ──
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const slidesWrapper = document.getElementById('slidesWrapper');
    if (slidesWrapper) {
        slidesWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
            touchStartY = e.changedTouches[0].clientY;
            touchStartTime = Date.now();
        }, { passive: true });

        slidesWrapper.addEventListener('touchend', (e) => {
            const deltaX = e.changedTouches[0].clientX - touchStartX;
            const deltaY = e.changedTouches[0].clientY - touchStartY;
            const deltaTime = Date.now() - touchStartTime;

            // Chỉ nhận vuốt ngang (|deltaX| > 50px), không phải cuộn dọc
            // và thời gian vuốt < 500ms (loại trừ kéo chậm)
            if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) && deltaTime < 500) {
                if (deltaX < 0) {
                    // Vuốt sang trái → slide tiếp theo
                    nextSlide();
                } else {
                    // Vuốt sang phải → slide trước
                    prevSlide();
                }
            }
        }, { passive: true });
    }

    updateSlides();
    initializeSimulations();
}

// -----------------------------------------------------------------
// INITIALIZE SIMULATIONS & DIAGRAMS
// -----------------------------------------------------------------
function initializeSimulations() {

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
                setThreadState('yielding', '⚡ YIELDING (NHƯỜNG CPU CHO LOOP)');
                pushStackFrame('task-a', 'Task A (Đóng băng)', 'IP: Line 3\nlocal_v: "A"\nstate: await sleep(1)');
            }, 2200);

            let t3 = setTimeout(() => {
                highlightLine('b1');
                setThreadState('running-b', 'Luồng rảnh -> Chạy Task B', 'task-b-ball', 'task_b()');
            }, 3400);

            let t4 = setTimeout(() => {
                highlightLine('b2');
            }, 4400);

            let t5 = setTimeout(() => {
                highlightLine('b3');
                setThreadState('yielding', '⚡ YIELDING (NHƯỜNG CPU CHO LOOP)');
                pushStackFrame('task-b', 'Task B (Đóng băng)', 'IP: Line 7\nlocal_v: "B"\nstate: await sleep(1)');
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
                if (poolType === 'thread') {
                    addLog22(`[Khởi tạo] ThreadPool tạo luồng cực nhanh, tốn ít RAM.`);
                    bars.forEach((bar, idx) => {
                        addLog22(`[Queue] Gửi URL ${idx+1} vào ThreadPool...`);
                        bar.style.width = '0%';
                        bar.classList.add('blocking');
                    });
                    addLog22(`[Thực thi] Các Thread con nhận việc và đứng BLOCKING (Chết trân) chờ I/O...`);

                    let progress = [0, 0, 0];
                    let interval = setInterval(() => {
                        let doneCount = 0;
                        for (let i = 0; i < 3; i++) {
                            if (progress[i] < 100) {
                                progress[i] += Math.random() * 15 + 5;
                                if (progress[i] >= 100) {
                                    progress[i] = 100;
                                    bars[i].classList.remove('blocking');
                                    bars[i].classList.add('done');
                                    addLog22(`[Xong] Luồng ${i} tải xong URL ${i+1} (hết Blocking)!`);
                                }
                                bars[i].style.width = `${progress[i]}%`;
                            } else {
                                doneCount++;
                            }
                        }

                        if (doneCount === 3) {
                            clearInterval(interval);
                            addLog22(`[Kết quả] TỐI ƯU: Hoàn thành 3 URLs trong ~1.00s! (Main Thread không bị block)`);
                            isSim22Running = false;
                        }
                    }, 100);
                    
                    sim22Timers.push(interval);
                } else {
                    addLog22(`[Khởi tạo] ProcessPool đang copy RAM và tạo tiến trình con... (Rất chậm)`);
                    bars.forEach((bar, idx) => {
                        bar.classList.add('waiting');
                    });

                    let startupDelay = setTimeout(() => {
                        addLog22(`[Cảnh báo] Khởi động xong. Rất lãng phí RAM và tài nguyên CPU chỉ để đợi I/O!`);
                        bars.forEach((bar, idx) => {
                            bar.classList.remove('waiting');
                            addLog22(`[Queue] Gửi URL ${idx+1} vào Process Worker ${idx}...`);
                            bar.style.width = '0%';
                            bar.classList.add('blocking');
                        });
                        addLog22(`[Thực thi] Các tiến trình con cũng bị BLOCKING hoàn toàn chờ I/O...`);

                        let progress = [0, 0, 0];
                        let interval = setInterval(() => {
                            let doneCount = 0;
                            for (let i = 0; i < 3; i++) {
                                if (progress[i] < 100) {
                                    progress[i] += Math.random() * 15 + 5;
                                    if (progress[i] >= 100) {
                                        progress[i] = 100;
                                        bars[i].classList.add('done');
                                        addLog22(`[Xong] Process Worker ${i} tải xong URL ${i+1}!`);
                                    }
                                    bars[i].style.width = `${progress[i]}%`;
                                } else {
                                    doneCount++;
                                }
                            }

                            if (doneCount === 3) {
                                clearInterval(interval);
                                addLog22(`[Kết quả] LÃNG PHÍ: Xong việc nhưng tốn thời gian khởi động (~2.50s) và quá nhiều RAM!`);
                                isSim22Running = false;
                            }
                        }, 100);
                        
                        sim22Timers.push(interval);
                    }, 1500); // Giả lập độ trễ khởi động tiến trình
                    
                    sim22Timers.push(startupDelay);
                }

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

        const mgMain = document.getElementById('mgMain');
        const mgCoro = document.getElementById('mgCoro');
        const mgFuture = document.getElementById('mgFuture');
        const mgCallback = document.getElementById('mgCallback');
        const mgToken = document.getElementById('mgToken');

        function resetFutureCodeSim() {
            futureSimTimers.forEach(clearTimeout);
            futureSimTimers = [];
            isFutureRunning = false;
            clear34Highlights();
            if (futureTerminalLogs) futureTerminalLogs.textContent = 'Chờ chạy code...\n';
            if (runFutureCodeBtn) runFutureCodeBtn.disabled = false;
            
            if (mgMain) mgMain.style.background = 'rgba(56,189,248,0.1)';
            if (mgCoro) mgCoro.style.opacity = '0.3';
            if (mgFuture) {
                mgFuture.style.opacity = '0.3';
                mgFuture.textContent = 'Future (Trống)';
                mgFuture.style.borderColor = '#f59e0b';
                mgFuture.style.color = '#f59e0b';
            }
            if (mgCallback) {
                mgCallback.style.opacity = '0.3';
                mgCallback.style.background = 'rgba(244,63,94,0.1)';
            }
            if (mgToken) {
                mgToken.style.opacity = '0';
                mgToken.style.transition = 'none';
                mgToken.style.top = '100px';
                mgToken.style.left = '40px';
                void mgToken.offsetWidth;
                mgToken.style.transition = 'top 0.6s ease, left 0.6s ease, opacity 0.3s ease';
            }
        }

        function runFutureCodeSim() {
            if (isFutureRunning) return;
            isFutureRunning = true;
            runFutureCodeBtn.disabled = true;
            if (futureTerminalLogs) futureTerminalLogs.textContent = '';

            highlight34Line('mainStart');
            if (mgFuture) mgFuture.style.opacity = '1';

            let t1 = setTimeout(() => {
                highlight34Line('addCallback');
                if (mgCallback) mgCallback.style.opacity = '1';
            }, 1200);

            let t2 = setTimeout(() => {
                highlight34Line('createTask');
                if (mgCoro) mgCoro.style.opacity = '1';
            }, 2400);

            let t3 = setTimeout(() => {
                highlight34Line('printMain');
                addFutureLog('Main đang chờ Future...');
            }, 3600);

            let t4 = setTimeout(() => {
                highlight34Line('coroStart');
                addFutureLog('-> [Coroutine]: Đang xử lý ngầm...');
                if (mgToken) mgToken.style.opacity = '1';
            }, 4800);

            let t5 = setTimeout(() => {
                highlight34Line('coroSleep');
            }, 6000);

            let t6 = setTimeout(() => {
                highlight34Line('coroSet');
                addFutureLog('-> [Coroutine]: Đã xong! Thiết lập kết quả...');
                if (mgToken) {
                    mgToken.style.top = '15px';
                    mgToken.style.left = 'calc(100% - 60px)';
                }
            }, 7200);

            let t7 = setTimeout(() => {
                highlight34Line('callback');
                addFutureLog('-> [Callback]: Nhận tín hiệu!');
                addFutureLog('-> [Callback]: Kết quả = \'KẾT QUẢ THÀNH CÔNG\'');
                
                if (mgToken) mgToken.style.opacity = '0';
                if (mgFuture) {
                    mgFuture.textContent = 'Future (DONE)';
                    mgFuture.style.borderColor = 'var(--accent-emerald)';
                    mgFuture.style.color = 'var(--accent-emerald)';
                }
                if (mgCallback) {
                    mgCallback.style.background = 'var(--accent-rose)';
                    mgCallback.style.color = 'white';
                }
            }, 8400);

            let t8 = setTimeout(() => {
                highlight34Line('awaitFuture');
                if (mgCallback) {
                    mgCallback.style.background = 'rgba(244,63,94,0.1)';
                    mgCallback.style.color = 'var(--accent-rose)';
                }
                isFutureRunning = false;
            }, 9600);

            futureSimTimers.push(t1, t2, t3, t4, t5, t6, t7, t8);
        }

        runFutureCodeBtn.onclick = runFutureCodeSim;
        resetFutureCodeBtn.onclick = resetFutureCodeSim;
        resetFutureCodeSimGlobal = resetFutureCodeSim;
    }

    // Slide 10: Entity Token Animation
    const runWfBtn = document.getElementById('runWfBtn');
    const resetWfBtn = document.getElementById('resetWfBtn');
    if (runWfBtn) {
        let wfTimers = [];
        let isWfRunning = false;
        
        const nodes = {
            main: document.getElementById('entMain'),
            queue: document.getElementById('entQueue'),
            worker: document.getElementById('entWorker'),
            future: document.getElementById('entFuture')
        };
        const tokenContainer = document.getElementById('wfTokenContainer');
        const wfStepDesc = document.getElementById('wfStepDesc');
        
        function resetWf() {
            wfTimers.forEach(clearTimeout);
            wfTimers = [];
            isWfRunning = false;
            
            Object.values(nodes).forEach(n => {
                if (n) {
                    n.classList.remove('active-node');
                    n.style.borderColor = '';
                }
            });
            
            if (tokenContainer) tokenContainer.innerHTML = '';
            if (wfStepDesc) wfStepDesc.style.opacity = '0';
        }
        
        function updateDesc(text) {
            if (!wfStepDesc) return;
            wfStepDesc.innerHTML = text;
            wfStepDesc.style.opacity = '1';
        }

        function createTokens(count, type) {
            let tokens = [];
            for (let i = 0; i < count; i++) {
                let token = document.createElement('div');
                token.className = 'anim-token';
                if (type === 'task') {
                    token.textContent = 'T' + (i+1);
                    token.style.background = '#38bdf8';
                    token.style.boxShadow = '0 0 10px #38bdf8';
                    token.style.top = '33px';
                    token.style.left = '73px';
                } else if (type === 'result') {
                    token.textContent = 'R' + (i+1);
                    token.style.background = '#34d399';
                    token.style.boxShadow = '0 0 10px #34d399';
                    token.style.top = 'calc(100% - 57px)';
                    token.style.left = 'calc(100% - 97px)';
                } else if (type === 'future') {
                    token.textContent = 'F' + (i+1);
                    token.style.background = 'transparent';
                    token.style.border = '2px dashed #f59e0b';
                    token.style.color = '#f59e0b';
                    token.style.top = '33px';
                    token.style.left = 'calc(100% - 97px)';
                }
                token.style.opacity = '0';
                if (tokenContainer) tokenContainer.appendChild(token);
                // Trigger reflow
                void token.offsetWidth;
                token.style.transition = 'left 1s ease-in-out, top 1s ease-in-out, opacity 0.3s ease';
                tokens.push(token);
            }
            return tokens;
        }
        
        function runWf() {
            if (isWfRunning) return;
            resetWf();
            isWfRunning = true;

            let tasks = createTokens(4, 'task');
            let results = createTokens(4, 'result');
            let futures = createTokens(4, 'future');
            
            // Step 1: Submit 4 tasks
            let t1 = setTimeout(() => {
                nodes.main.classList.add('active-node');
                nodes.future.classList.add('active-node');
                updateDesc("Bước 1: Main Thread đẩy 4 Tác vụ (T) xuống Queue. ĐỒNG THỜI khởi tạo 4 hộp thư Future (F) rỗng.");
                
                tasks.forEach((tk, idx) => {
                    wfTimers.push(setTimeout(() => {
                        tk.style.opacity = '1';
                        futures[idx].style.opacity = '1'; // Spawn empty Future
                        setTimeout(() => { tk.style.top = 'calc(100% - 57px)'; }, 50);
                    }, idx * 250));
                });
            }, 500);
            
            // Step 2: Queue to Worker
            let t2 = setTimeout(() => {
                nodes.main.classList.remove('active-node');
                nodes.queue.classList.add('active-node');
                updateDesc("Bước 2: 4 Tác vụ (T) nằm trong Queue đợi Worker bốc ra.");
                
                tasks.forEach((tk, idx) => {
                    wfTimers.push(setTimeout(() => {
                        tk.style.left = 'calc(100% - 97px)';
                    }, idx * 250));
                });
            }, 3500);
            
            // Step 3: Worker processing
            let t3 = setTimeout(() => {
                nodes.queue.classList.remove('active-node');
                nodes.worker.classList.add('active-node');
                updateDesc("Bước 3: Worker bốc Task ra chạy song song...<br>(Main Thread vẫn đang rảnh tay đi làm việc khác)");
                
                tasks.forEach((tk, idx) => {
                    wfTimers.push(setTimeout(() => {
                        tk.style.opacity = '0';
                        results[idx].style.opacity = '1';
                    }, idx * 250));
                });
            }, 6500);
            
            // Step 4: Worker resolves Future
            let t4 = setTimeout(() => {
                updateDesc("Bước 4: Worker làm xong, nó KHÔNG TRẢ TRỰC TIẾP cho Main (vì Main đang làm việc khác), mà đem Kết quả (R) điền vào Future Mailbox.");
                
                results.forEach((tk, idx) => {
                    wfTimers.push(setTimeout(() => {
                        tk.style.top = '33px'; // Fly to Future Mailbox
                        setTimeout(() => {
                            futures[idx].style.opacity = '0'; // Replace empty Future with Result
                        }, 1000);
                    }, idx * 250));
                });
            }, 9500);
            
            // Step 5: Main reads Future
            let t5 = setTimeout(() => {
                nodes.worker.classList.remove('active-node');
                nodes.main.classList.add('active-node');
                nodes.future.style.borderColor = 'var(--accent-emerald)';
                updateDesc("Bước 5: Bất cứ khi nào rảnh, Main Thread gọi future.result() để đến Mailbox lấy 4 kết quả về.");
                
                results.forEach((tk, idx) => {
                    wfTimers.push(setTimeout(() => {
                        tk.style.left = '73px';
                    }, idx * 250));
                });
            }, 13000);
            
            let t6 = setTimeout(() => {
                results.forEach((tk, idx) => {
                    wfTimers.push(setTimeout(() => {
                        tk.style.opacity = '0';
                    }, idx * 250));
                });
                wfTimers.push(setTimeout(() => { isWfRunning = false; }, 1000));
            }, 16000);
            
            wfTimers.push(t1, t2, t3, t4, t5, t6);
        }
        
        runWfBtn.onclick = runWf;
        resetWfBtn.onclick = resetWf;
        
        resetWf();
    }

    // =================================================================
    // --- SIMULATION: CPU SEQUENTIAL VS CONCURRENT (Slide 7) ---
    // =================================================================
    const runSeqCpuBtn = document.getElementById('runSeqCpuBtn');
    const runAsyncCpuBtn = document.getElementById('runAsyncCpuBtn');
    const resetCpuLoadSimBtn = document.getElementById('resetCpuLoadSimBtn');
    
    if (runSeqCpuBtn) {
        let cpuSimTimers = [];
        let isCpuSimRunning = false;
        
        const taskABar = document.getElementById('cpuTaskABar');
        const taskBBar = document.getElementById('cpuTaskBBar');
        const loadTimeline = document.getElementById('cpuLoadTimeline');
        
        function resetCpuSim() {
            cpuSimTimers.forEach(clearTimeout);
            cpuSimTimers = [];
            isCpuSimRunning = false;
            runSeqCpuBtn.disabled = false;
            runAsyncCpuBtn.disabled = false;
            
            if (taskABar) {
                taskABar.style.transition = 'none';
                taskABar.style.width = '0%';
                void taskABar.offsetWidth; // Trigger reflow
                taskABar.style.transition = 'width 1000ms linear';
            }
            if (taskBBar) {
                taskBBar.style.transition = 'none';
                taskBBar.style.width = '0%';
                void taskBBar.offsetWidth;
                taskBBar.style.transition = 'width 1000ms linear';
            }
            if (loadTimeline) loadTimeline.innerHTML = '';
        }
        
        function addLoadChunk(type, durationMs, widthPercent, taskName = '') {
            if (!loadTimeline) return;
            let chunk = document.createElement('div');
            chunk.style.height = '100%';
            chunk.style.width = '0%';
            chunk.style.overflow = 'hidden';
            if (type === 'busy') {
                chunk.style.background = taskName === 'A' ? 'var(--accent-sky)' : (taskName === 'B' ? 'var(--accent-emerald)' : 'var(--accent-rose)');
                chunk.textContent = taskName;
                chunk.style.color = '#fff';
                chunk.style.display = 'flex';
                chunk.style.alignItems = 'center';
                chunk.style.justifyContent = 'center';
                chunk.style.fontSize = '0.75rem';
                chunk.style.fontWeight = 'bold';
            } else {
                chunk.style.background = '#475569';
                chunk.style.opacity = '0.7';
            }
            chunk.style.transition = `width ${durationMs}ms linear`;
            loadTimeline.appendChild(chunk);
            
            void chunk.offsetWidth;
            chunk.style.width = widthPercent + '%';
        }

        const secW = 16.66; // 100% / 6 seconds
        
        function runSeq() {
            if (isCpuSimRunning) return;
            resetCpuSim();
            isCpuSimRunning = true;
            runSeqCpuBtn.disabled = true;
            runAsyncCpuBtn.disabled = true;
            
            addLoadChunk('busy', 1000, secW, 'A');
            if (taskABar) taskABar.style.width = '50%';
            
            let t1 = setTimeout(() => {
                addLoadChunk('idle', 1000, secW);
            }, 1000);
            
            let t2 = setTimeout(() => {
                addLoadChunk('busy', 1000, secW, 'A');
                if (taskABar) taskABar.style.width = '100%';
            }, 2000);
            
            let t3 = setTimeout(() => {
                addLoadChunk('busy', 1000, secW, 'B');
                if (taskBBar) taskBBar.style.width = '50%';
            }, 3000);
            
            let t4 = setTimeout(() => {
                addLoadChunk('idle', 1000, secW);
            }, 4000);
            
            let t5 = setTimeout(() => {
                addLoadChunk('busy', 1000, secW, 'B');
                if (taskBBar) taskBBar.style.width = '100%';
            }, 5000);
            
            let t6 = setTimeout(() => {
                isCpuSimRunning = false;
                runSeqCpuBtn.disabled = false;
                runAsyncCpuBtn.disabled = false;
            }, 6000);
            
            cpuSimTimers.push(t1, t2, t3, t4, t5, t6);
        }
        
        function runAsync() {
            if (isCpuSimRunning) return;
            resetCpuSim();
            isCpuSimRunning = true;
            runSeqCpuBtn.disabled = true;
            runAsyncCpuBtn.disabled = true;
            
            addLoadChunk('busy', 1000, secW, 'A');
            if (taskABar) taskABar.style.width = '50%';
            
            let t1 = setTimeout(() => {
                addLoadChunk('busy', 1000, secW, 'B'); 
                if (taskBBar) taskBBar.style.width = '50%';
            }, 1000);
            
            let t2 = setTimeout(() => {
                addLoadChunk('busy', 1000, secW, 'A'); 
                if (taskABar) taskABar.style.width = '100%';
            }, 2000);
            
            let t3 = setTimeout(() => {
                addLoadChunk('busy', 1000, secW, 'B'); 
                if (taskBBar) taskBBar.style.width = '100%';
            }, 3000);
            
            let t4 = setTimeout(() => {
                isCpuSimRunning = false;
                runSeqCpuBtn.disabled = false;
                runAsyncCpuBtn.disabled = false;
            }, 4000);
            
            cpuSimTimers.push(t1, t2, t3, t4);
        }
        
        runSeqCpuBtn.onclick = runSeq;
        runAsyncCpuBtn.onclick = runAsync;
        resetCpuLoadSimBtn.onclick = resetCpuSim;
        
        resetCpuSim();
    }

    // =================================================================
    // --- SIMULATION: ASYNCIO CONTEXT SWITCH (Slide 25) ---
    // =================================================================
    const runAsyncioLoopBtn = document.getElementById('runAsyncioLoopBtn');
    const nextAsyncioStepBtn = document.getElementById('nextAsyncioStepBtn');
    const resetAsyncioLoopBtn = document.getElementById('resetAsyncioLoopBtn');
    const asyncioTokens = document.getElementById('asyncioTokens');
    
    // Nodes
    const asyLoop = document.getElementById('asyLoop');
    const asyCpu = document.getElementById('asyCpu');
    const asyIoWait = document.getElementById('asyIoWait');
    const asyStepDesc = document.getElementById('asyStepDesc');

    if (runAsyncioLoopBtn) {
        let asyncioTimers = [];
        let isAsyncioRunning = false;
        let currentAsyncioStep = 0;
        let tokens = [];
        
        function updateAsyncioDesc(text) {
            if (!asyStepDesc) return;
            asyStepDesc.innerHTML = text;
            asyStepDesc.style.opacity = '1';
        }

        function resetAsyncioSim() {
            asyncioTimers.forEach(clearTimeout);
            asyncioTimers = [];
            isAsyncioRunning = false;
            currentAsyncioStep = 0;
            tokens = [];
            runAsyncioLoopBtn.disabled = false;
            if (nextAsyncioStepBtn) nextAsyncioStepBtn.disabled = true;
            if (asyncioTokens) asyncioTokens.innerHTML = '';
            if (asyLoop) asyLoop.classList.remove('active-node');
            if (asyCpu) asyCpu.classList.remove('active-node');
            if (asyIoWait) asyIoWait.classList.remove('active-node');
            if (asyStepDesc) asyStepDesc.style.opacity = '0';
        }

        function runAsyncioSim() {
            if (isAsyncioRunning) return;
            resetAsyncioSim();
            isAsyncioRunning = true;
            currentAsyncioStep = 1;
            
            runAsyncioLoopBtn.disabled = true;
            if (nextAsyncioStepBtn) nextAsyncioStepBtn.disabled = false;

            updateAsyncioDesc('<strong>Bước 1: Hàng đợi Sẵn sàng</strong><br>Hàng loạt 10 Task được tạo ra. Trong đó T2, T5, T8 chỉ tính toán CPU (không cần đợi mạng), còn lại là các Task có `await` (phải tải mạng).');
            
            for (let i = 0; i < 10; i++) {
                let tk = document.createElement('div');
                tk.className = 'anim-token';
                const colors = ['var(--accent-sky)', 'var(--accent-emerald)', 'var(--accent-rose)', '#f59e0b', '#8b5cf6'];
                tk.style.background = colors[i % colors.length];
                tk.style.width = '24px';
                tk.style.height = '24px';
                tk.style.fontSize = '0.65rem';
                
                // Ready Queue Grid: 2 cols
                let c = i % 2;
                let r = Math.floor(i / 2);
                tk.style.top = (60 + r * 40) + 'px';
                tk.style.left = (45 + c * 50) + 'px';
                tk.style.transition = 'top 0.4s ease, left 0.4s ease, opacity 0.3s ease';
                tk.style.opacity = '1';
                tk.textContent = 'T' + (i + 1);
                tk.isIO = ![1, 4, 7].includes(i); // T2, T5, T8 are CPU-bound
                
                if (asyncioTokens) asyncioTokens.appendChild(tk);
                tokens.push(tk);
            }
        }

        function nextAsyncioStep() {
            if (!isAsyncioRunning) return;
            if (nextAsyncioStepBtn) nextAsyncioStepBtn.disabled = true; // prevent double clicks during anim

            if (currentAsyncioStep === 1) {
                currentAsyncioStep = 2;
                updateAsyncioDesc('<strong>Bước 2: Phân loại thông minh!</strong><br>Event Loop bốc Task chạy. Task nào có `await` sẽ bị ném ra góc Chờ I/O. Task tính toán thuần (T2, T5, T8) thì chạy thẳng trong CPU rồi xong luôn!');
                if (asyLoop) asyLoop.classList.add('active-node');
                
                let ioIndex = 0;
                for (let i = 0; i < 10; i++) {
                    let baseTime = i * 400; // Chậm hơn 1 chút để dễ nhìn
                    
                    // Loop pulls
                    asyncioTimers.push(setTimeout(() => {
                        tokens[i].style.top = '148px';
                        tokens[i].style.left = '268px'; // In loop
                    }, baseTime));

                    // CPU
                    asyncioTimers.push(setTimeout(() => {
                        if (asyCpu) asyCpu.classList.add('active-node');
                        tokens[i].style.top = '48px';
                        tokens[i].style.left = '498px'; // In CPU
                    }, baseTime + 150));

                    if (tokens[i].isIO) {
                        // IO Wait
                        asyncioTimers.push(setTimeout(() => {
                            if (asyCpu) asyCpu.classList.remove('active-node');
                            if (asyIoWait) asyIoWait.classList.add('active-node');
                            
                            // Grid in IO Wait: 4 cols
                            let ioC = ioIndex % 4;
                            let ioR = Math.floor(ioIndex / 4);
                            tokens[i].style.top = (180 + ioR * 50) + 'px';
                            tokens[i].style.left = (425 + ioC * 45) + 'px';
                            ioIndex++;
                        }, baseTime + 350));
                    } else {
                        // CPU bound -> finish immediately
                        asyncioTimers.push(setTimeout(() => {
                            tokens[i].style.opacity = '0';
                            if (asyCpu) asyCpu.classList.remove('active-node');
                        }, baseTime + 350));
                    }
                }

                // Unlock next step when done
                asyncioTimers.push(setTimeout(() => {
                    if (nextAsyncioStepBtn) nextAsyncioStepBtn.disabled = false;
                }, 9 * 400 + 400));
            } 
            else if (currentAsyncioStep === 2) {
                currentAsyncioStep = 3;
                if (asyLoop) asyLoop.classList.remove('active-node');
                updateAsyncioDesc('<strong>Bước 3: Tận dụng cực hạn (Concurrency)</strong><br>Dù 7 Task kia đang bị nghẽn I/O, chương trình vẫn không đứng im. Các Task thuần CPU đã được xử lý xong, Event Loop hoàn toàn rảnh tay làm việc khác.');
                if (nextAsyncioStepBtn) nextAsyncioStepBtn.disabled = false;
            }
            else if (currentAsyncioStep === 3) {
                currentAsyncioStep = 4;
                updateAsyncioDesc('<strong>Bước 4: I/O Hoàn tất (Bất đồng bộ)</strong><br>Thời gian tải dữ liệu của mỗi Task là khác nhau. Task nào tải xong trước sẽ thức dậy và ùa về Hàng đợi trước, lập tức được Event Loop bốc vào CPU xử lý nốt!');
                if (asyIoWait) asyIoWait.classList.remove('active-node');
                if (asyLoop) asyLoop.classList.add('active-node');

                let ioTokens = tokens.filter(tk => tk.isIO);
                // Pseudo-random wake up order for the 7 IO tokens
                const wakeOrder = [3, 0, 5, 1, 6, 2, 4];
                let maxBaseTime = 0;

                for (let i = 0; i < ioTokens.length; i++) {
                    let tk = ioTokens[i];
                    
                    let orderIndex = wakeOrder.indexOf(i);
                    // Create non-uniform gaps between wake-ups
                    let baseTime = orderIndex * 400 + (orderIndex % 2 === 0 ? 0 : 250);
                    
                    if (baseTime > maxBaseTime) maxBaseTime = baseTime;

                    // Back to ready
                    asyncioTimers.push(setTimeout(() => {
                        let c = i % 2;
                        let r = Math.floor(i / 2);
                        tk.style.top = (75 + r * 38) + 'px';
                        tk.style.left = (45 + c * 50) + 'px';
                    }, baseTime));

                    // Loop pulls again
                    asyncioTimers.push(setTimeout(() => {
                        tk.style.top = '148px';
                        tk.style.left = '268px'; // In loop
                    }, baseTime + 400));

                    // CPU and Finish
                    asyncioTimers.push(setTimeout(() => {
                        if (asyCpu) asyCpu.classList.add('active-node');
                        tk.style.top = '48px';
                        tk.style.left = '498px'; // In CPU
                        
                        // Fade out
                        asyncioTimers.push(setTimeout(() => {
                            tk.style.opacity = '0';
                            if (asyCpu) asyCpu.classList.remove('active-node');
                        }, 250));
                    }, baseTime + 600));
                }

                // Unlock for final step
                asyncioTimers.push(setTimeout(() => {
                    if (asyLoop) asyLoop.classList.remove('active-node');
                    if (nextAsyncioStepBtn) nextAsyncioStepBtn.disabled = false;
                }, maxBaseTime + 700));
            }
            else if (currentAsyncioStep === 4) {
                currentAsyncioStep = 5;
                updateAsyncioDesc('<strong>Hoàn tất:</strong> Hệ thống đã xử lý hỗn hợp cả tác vụ mạng lẫn tính toán cực kỳ nhịp nhàng. Không lãng phí 1 giây nhàn rỗi nào của CPU!');
                isAsyncioRunning = false; // Done
                runAsyncioLoopBtn.disabled = false;
                if (nextAsyncioStepBtn) nextAsyncioStepBtn.disabled = true;
            }
        }

        runAsyncioLoopBtn.onclick = runAsyncioSim;
        if (nextAsyncioStepBtn) nextAsyncioStepBtn.onclick = nextAsyncioStep;
        resetAsyncioLoopBtn.onclick = resetAsyncioSim;

        resetAsyncioSim();
    }

}
