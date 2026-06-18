// js/simulations/part2-intro.js
export function init() {
    const btnSave = document.getElementById('btn-save-code');
    const msg = document.getElementById('save-msg');
    
    if (btnSave) {
        btnSave.addEventListener('click', () => {
            const code = document.getElementById('code-snippet').innerText;
            localStorage.setItem('aisa_rehearsal_code', code);
            
            // Visual feedback on the button itself
            const originalText = btnSave.innerHTML;
            btnSave.innerHTML = `<span class="btn-core" style="background: var(--color-success); color: white;"><i class="fas fa-check"></i> Đã lưu thành công!</span>`;
            btnSave.style.pointerEvents = 'none';
            
            msg.style.display = 'block';
            
            setTimeout(() => {
                msg.style.display = 'none';
                btnSave.innerHTML = originalText;
                btnSave.style.pointerEvents = 'auto';
            }, 3000);
        });
    }
}
