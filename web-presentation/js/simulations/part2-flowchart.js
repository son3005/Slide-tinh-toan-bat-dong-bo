// js/simulations/part2-flowchart.js

export function init() {
    const btnNext = document.getElementById('btn-next-step');
    const btnReset = document.getElementById('btn-reset-flow');
    
    const stepTitle = document.getElementById('step-title');
    const stepDesc = document.getElementById('step-desc');
    
    const elements = {
        main: document.getElementById('node-main'),
        queue: document.getElementById('node-queue'),
        pool: document.getElementById('node-pool'),
        future: document.getElementById('node-future'),
        
        arrowMQ: document.getElementById('arrow-mq'),
        arrowQP: document.getElementById('arrow-qp'),
        arrowPF: document.getElementById('arrow-pf'),
        arrowFM: document.getElementById('arrow-fm'),
        
        qItem: document.getElementById('queue-item'),
        workerA: document.getElementById('worker-a'),
        futureLbl: document.getElementById('future-state-lbl')
    };

    let currentStep = 0;

    const steps = [
        {
            title: "Bước 0: Khởi tạo",
            desc: "Main Thread chuẩn bị một tác vụ (hàm và tham số) cần thực thi."
        },
        {
            title: "Bước 1: Submit() & Nhận Future",
            desc: "Main Thread gọi <span class='hl-func'>submit()</span>. Nó lập tức nhận lại một hộp thư (Future) ở trạng thái Pending. Mũi tên đứt nét biểu thị liên kết theo dõi kết quả.",
            action: () => {
                elements.future.classList.remove('hidden');
                elements.arrowFM.classList.remove('hidden');
                elements.main.classList.add('active');
            }
        },
        {
            title: "Bước 2: Vào Hàng đợi (Task Queue)",
            desc: "Đồng thời, tác vụ thực sự được đẩy xuống Task Queue (Hàng đợi) chờ được xử lý.",
            action: () => {
                elements.main.classList.remove('active');
                elements.arrowMQ.classList.remove('hidden');
                elements.queue.classList.remove('hidden');
                setTimeout(() => elements.qItem.classList.remove('hidden'), 300);
            }
        },
        {
            title: "Bước 3: Worker kéo (pull) tác vụ",
            desc: "Worker Pool giám sát hàng đợi. Một Worker rảnh sẽ tự động kéo tác vụ ra và bắt đầu thực thi độc lập.",
            action: () => {
                elements.arrowQP.classList.remove('hidden');
                elements.pool.classList.remove('hidden');
                setTimeout(() => {
                    elements.qItem.classList.add('hidden'); // leaves queue
                    elements.workerA.style.background = 'var(--color-cpu)';
                    elements.workerA.style.color = 'white';
                    elements.workerA.textContent = "Worker 1 (Đang chạy Task A)";
                }, 500);
            }
        },
        {
            title: "Bước 4: Cập nhật kết quả",
            desc: "Khi Worker chạy xong, nó sẽ âm thầm đẩy kết quả lên đối tượng Future (Mailbox). Main Thread không cần chờ, khi nào rảnh chỉ việc mở Future ra lấy kết quả!",
            action: () => {
                elements.workerA.style.background = 'var(--bg-tertiary)';
                elements.workerA.style.color = 'var(--text-secondary)';
                elements.workerA.textContent = "Worker 1 (Rảnh)";
                
                elements.arrowPF.classList.remove('hidden');
                
                // Update Future state
                elements.futureLbl.textContent = "Done (Có Kết Quả)";
                elements.futureLbl.style.background = "var(--color-success)";
                elements.future.classList.add('active');
                
                btnNext.style.display = 'none';
                btnReset.style.opacity = '1';
                btnReset.style.pointerEvents = 'auto';
            }
        }
    ];

    btnNext.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            const stepData = steps[currentStep];
            stepTitle.textContent = stepData.title;
            stepDesc.innerHTML = stepData.desc;
            if (stepData.action) stepData.action();
        }
    });

    btnReset.addEventListener('click', () => {
        currentStep = 0;
        stepTitle.textContent = steps[0].title;
        stepDesc.innerHTML = steps[0].desc;
        
        btnNext.style.display = 'inline-block';
        btnReset.style.opacity = '0';
        btnReset.style.pointerEvents = 'none';

        elements.main.classList.remove('active');
        
        elements.future.classList.add('hidden');
        elements.future.classList.remove('active');
        elements.futureLbl.textContent = "Pending";
        elements.futureLbl.style.background = "#f59e0b";
        
        elements.queue.classList.add('hidden');
        elements.qItem.classList.add('hidden');
        
        elements.pool.classList.add('hidden');
        elements.workerA.style.background = 'var(--bg-tertiary)';
        elements.workerA.style.color = 'var(--text-secondary)';
        elements.workerA.textContent = "Worker 1 (Rảnh)";
        
        elements.arrowMQ.classList.add('hidden');
        elements.arrowQP.classList.add('hidden');
        elements.arrowPF.classList.add('hidden');
        elements.arrowFM.classList.add('hidden');
    });
}
