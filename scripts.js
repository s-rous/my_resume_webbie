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