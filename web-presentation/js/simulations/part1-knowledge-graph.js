// js/simulations/part1-knowledge-graph.js

export function init() {
    const btnNext = document.getElementById('btn-kg-next');
    if (!btnNext) return;

    const totalSteps = 4;
    let currentStep = 0;

    function revealStep(stepIndex) {
        const nodes = document.querySelectorAll(`.step${stepIndex}`);
        nodes.forEach(node => node.classList.add('active'));
    }

    function hideStep(stepIndex) {
        const nodes = document.querySelectorAll(`.step${stepIndex}`);
        nodes.forEach(node => node.classList.remove('active'));
    }

    // Initialize: show step 0
    revealStep(0);

    const advanceStep = () => {
        if (currentStep < totalSteps) {
            currentStep++;
            revealStep(currentStep);
            
            if (currentStep === totalSteps) {
                btnNext.style.opacity = '0';
                btnNext.style.pointerEvents = 'none';
            }
            return true; // We handled it
        }
        return false; // Let engine.js move to next slide
    };

    const reverseStep = () => {
        if (currentStep > 0) {
            hideStep(currentStep);
            currentStep--;
            
            btnNext.style.opacity = '1';
            btnNext.style.pointerEvents = 'auto';
            return true;
        }
        return false; // Let engine.js move to prev slide
    };

    // Hook into global presentation engine
    window.onSlideNext = advanceStep;
    window.onSlidePrev = reverseStep;

    // Handle local button
    btnNext.addEventListener('click', (e) => {
        e.stopPropagation();
        window.onSlideNext();
    });
}
