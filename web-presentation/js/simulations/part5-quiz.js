export function init() {
    const options = document.querySelectorAll('.quiz-opt');
    
    options.forEach(opt => {
        // Remove existing click event listeners by cloning
        const newOpt = opt.cloneNode(true);
        opt.parentNode.replaceChild(newOpt, opt);
        
        newOpt.addEventListener('click', function() {
            const parent = this.closest('.quiz-card');
            if (parent.dataset.answered === "true") return; // Only answer once
            
            parent.dataset.answered = "true";
            
            const isCorrect = this.getAttribute('data-correct') === 'true';
            if (isCorrect) {
                this.classList.add('correct');
            } else {
                this.classList.add('wrong');
                // Highlight the correct one
                const correctOpt = parent.querySelector('[data-correct="true"]');
                if (correctOpt) correctOpt.classList.add('correct');
            }
            
            // Show explanation
            const exp = parent.querySelector('.quiz-exp');
            if (exp) exp.style.display = 'block';
        });
    });
}
