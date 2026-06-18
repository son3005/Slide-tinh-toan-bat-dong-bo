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
    'part1-intro',
    'part1-architecture-compare',
    'part1-cpu-states',
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
    'part5-summary'
];

let currentIndex = 0;

const container = document.getElementById('slide-container');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const counter = document.getElementById('slide-counter');
const progressBar = document.getElementById('progress-bar');

async function loadSlide(index) {
    if (index < 0 || index >= slides.length) return;
    
    // UI Updates
    btnPrev.disabled = index === 0;
    btnNext.disabled = index === slides.length - 1;
    counter.textContent = `${index + 1} / ${slides.length}`;
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
btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        loadSlide(currentIndex);
    }
});

btnNext.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
        loadSlide(currentIndex);
    }
});

// Initialize first slide
document.addEventListener('DOMContentLoaded', () => {
    loadSlide(currentIndex);
});
