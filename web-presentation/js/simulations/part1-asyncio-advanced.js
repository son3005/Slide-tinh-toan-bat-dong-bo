export function init() {
    const buttons = document.querySelectorAll('.api-btn');
    const contents = document.querySelectorAll('.api-content');

    if (buttons.length === 0) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            buttons.forEach(b => b.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}
