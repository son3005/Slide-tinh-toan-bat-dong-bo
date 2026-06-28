// engine.js - Central routing and module loading

import * as part1EventLoopSim from './simulations/part1-event-loop.js';
import * as part1AsyncioSim from './simulations/part1-asyncio-simulation.js';
import * as part2ThreadProcessSim from './simulations/part2-thread-vs-process.js';
import * as part2GilSim from './simulations/part2-gil.js';
import * as part2SuperDashboardSim from './simulations/part2-super-dashboard.js';
import * as part3MasterSim from './simulations/part3-master-simulation.js';

function initializeSimulations() {
    part1EventLoopSim.init();
    part1AsyncioSim.init();
    part2ThreadProcessSim.init();
    part2GilSim.init();
    part2SuperDashboardSim.init();
    part3MasterSim.init();
}

const slides = [
    'team-intro',
    'part1-cpu-states',
    'part1-intro',
    'part1-architecture-compare',
    'part1-asyncio-theory',
    'part1-asyncio-event-driven',
    'part1-event-loop',
    'part1-asyncio-syntax',
    'part1-asyncio-advanced',
    'part1-asyncio-patterns',
    'part1-asyncio-simulation',
    'part2-intro',
    'part2-future-lifecycle',
    'part2-thread-vs-process',
    'part2-gil',
    'part2-super-dashboard',
    'part2-api-docs',
    'part3-intro',
    'part3-code-example',
    'part3-master-simulation',
    //'part5-quiz',
    'part5-knowledge-graph',
    'part5-summary'
];

let currentIndex = 0;

const container = document.getElementById('slide-container');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const slideInput = document.getElementById('slide-input');
const slideTotal = document.getElementById('slide-total');
const progressBar = document.getElementById('progress-bar');

async function loadSlide(index) {
    if (index < 0 || index >= slides.length) return;

    // UI Updates
    btnPrev.disabled = index === 0;
    btnNext.disabled = index === slides.length - 1;
    if (slideInput) {
        slideInput.value = index + 1;
        slideInput.max = slides.length;
    }
    if (slideTotal) slideTotal.textContent = `/ ${slides.length}`;
    progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;

    // Transition Out
    container.classList.add('fading-out');

    // Wait for fade out
    await new Promise(res => setTimeout(res, 300));

    try {
        // Fetch HTML content from slides directory
        const response = await fetch(`slides/${slides[index]}.html`);
        if (!response.ok) throw new Error('Slide not found');

        const html = await response.text();
        container.innerHTML = html;

        // Remove old classes and add transition-in class
        container.classList.remove('fading-out');

        // Force reflow
        void container.offsetWidth;

        container.classList.add('fading-in');

        // Load slide-specific JS if it exists
        loadSlideScript(slides[index]);

    } catch (error) {
        console.error("Error loading slide:", error);
        container.innerHTML = `<div class="content-pane"><h2>Error loading slide</h2><p>${error.message}</p></div>`;
        container.classList.remove('fading-out');
    }
}

function loadSlideScript(slideName) {
    // Dynamic import to load simulation logic for the specific slide
    // It looks for a script in js/simulations/ matching the slide name
    import(`./simulations/${slideName}.js`)
        .then(module => {
            if (module.init) {
                module.init(); // Call the init function of the module
            }
        })
        .catch(err => {
            // It's normal for some slides to not have JS modules
            console.log(`No specific JS script found for ${slideName}, or failed to load:`, err);
        });
}

// Event Listeners
function nextAction() {
    if (window.onSlideNext && window.onSlideNext()) {
        return;
    }

    const hiddenSteps = document.querySelectorAll('.slide-step:not(.active)');
    if (hiddenSteps.length > 0) {
        hiddenSteps[0].classList.add('active');
        return;
    }

    if (currentIndex < slides.length - 1) {
        currentIndex++;
        loadSlide(currentIndex);
    }
}

function prevAction() {
    if (window.onSlidePrev && window.onSlidePrev()) {
        return;
    }

    const activeSteps = document.querySelectorAll('.slide-step.active');
    if (activeSteps.length > 0) {
        activeSteps[activeSteps.length - 1].classList.remove('active');
        return;
    }

    if (currentIndex > 0) {
        currentIndex--;
        loadSlide(currentIndex);
    }
}

btnPrev.addEventListener('click', prevAction);

btnNext.addEventListener('click', nextAction);

// Clear hooks when changing slides
const originalLoadSlide = loadSlide;
loadSlide = async function (index) {
    window.onSlideNext = null;
    window.onSlidePrev = null;
    return originalLoadSlide(index);
};

if (slideInput) {
    slideInput.addEventListener('change', (e) => {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val)) val = 1;
        if (val < 1) val = 1;
        if (val > slides.length) val = slides.length;

        slideInput.value = val;
        if (currentIndex !== val - 1) {
            currentIndex = val - 1;
            loadSlide(currentIndex);
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Ignore if typing in an input field
    if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') {
        return;
    }

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        nextAction();
        if (e.key === ' ') e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevAction();
    } else if (e.key === 't' || e.key === 'T') {
        toggleRaccoon();
    }
});

// 🦝 Raccoon Easter Egg
function toggleRaccoon() {
    let overlay = document.getElementById('raccoon-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'raccoon-overlay';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.7); z-index: 9999;
            display: flex; justify-content: center; align-items: center;
            opacity: 0; transition: opacity 0.4s ease;
            cursor: pointer;
        `;
        overlay.innerHTML = `
            <img src="images/Raccoon.png" style="max-width: 60%; max-height: 80%; object-fit: contain; 
                 filter: drop-shadow(0 0 30px rgba(139,92,246,0.5));
                 transform: scale(0.8); transition: transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275);">
        `;
        overlay.addEventListener('click', () => toggleRaccoon());
        document.body.appendChild(overlay);
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            overlay.querySelector('img').style.transform = 'scale(1)';
        });
    } else {
        overlay.style.opacity = '0';
        overlay.querySelector('img').style.transform = 'scale(0.8)';
        setTimeout(() => overlay.remove(), 400);
    }
}

// Initialize first slide
document.addEventListener('DOMContentLoaded', () => {
    loadSlide(currentIndex);
});
