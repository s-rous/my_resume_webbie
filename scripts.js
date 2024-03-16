// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Show tooltip on skill hover
document.querySelectorAll('.skill').forEach(skill => {
    const tooltipText = skill.getAttribute('data-tooltip');
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    skill.appendChild(tooltip);
});

// Fade out the welcome section after 5 seconds
setTimeout(() => {
    const welcomeSection = document.getElementById('index');
    welcomeSection.classList.add('animate__fadeOut');
    setTimeout(() => {
        welcomeSection.style.display = 'none';
    }, 1000); // Fading animation duration
}, 5000); // Time to wait before fading out in milliseconds
