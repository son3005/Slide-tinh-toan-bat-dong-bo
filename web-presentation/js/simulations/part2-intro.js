// js/simulations/part2-intro.js
export function init() {
    const btnSave = document.getElementById('btn-save-code');
    const msg = document.getElementById('save-msg');
    
    if (btnSave) {
        btnSave.addEventListener('click', () => {
            const code = document.getElementById('code-snippet').innerText;
            localStorage.setItem('aisa_rehearsal_code', code);
            msg.style.display = 'block';
            
            setTimeout(() => {
                msg.style.display = 'none';
            }, 3000);
        });
    }
}
