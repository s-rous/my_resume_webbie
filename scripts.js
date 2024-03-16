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

// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

// Event listener for mode switch toggle
document.getElementById('mode-switch-toggle').addEventListener('change', function () {
    toggleDarkMode();
});

// Check local storage for dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    toggleDarkMode();
}

// Store dark mode preference in local storage
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('mode-switch-toggle').addEventListener('change', function () {
        localStorage.setItem('darkMode', this.checked);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Job Listing Slider
    const slider = document.querySelector('.job-slider');
    const slides = document.querySelectorAll('.job-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const dots = [];

    let isDragging = false;
    let startPosX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = null;

    // Create dots for each slide
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        dotsContainer.appendChild(dot);
        dots.push(dot);

        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Set active dot for initial slide
    dots[0].classList.add('active');

    // Dragging functionality for slider
    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('touchstart', startDrag);

    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);

    window.addEventListener('mousemove', drag);
    window.addEventListener('touchmove', drag);

    function startDrag(e) {
        if (e.type === 'touchstart') {
            startPosX = e.touches[0].clientX;
        } else {
            startPosX = e.clientX;
        }

        isDragging = true;
        animationID = requestAnimationFrame(animation);
        slider.style.cursor = 'grabbing';
    }

    function drag(e) {
        if (isDragging) {
            let currentPositionX = 0;

            if (e.type === 'touchmove') {
                currentPositionX = e.touches[0].clientX;
            } else {
                currentPositionX = e.clientX;
            }

            currentTranslate = prevTranslate + currentPositionX - startPosX;
        }
    }

    function endDrag() {
        isDragging = false;
        cancelAnimationFrame(animationID);

        // Calculate nearest dot index
        const dotIndexes = dots.map((dot, index) => ({
            index,
            distance: Math.abs(currentTranslate + index * slider.offsetWidth)
        }));
        const nearestDotIndex = dotIndexes.reduce((prev, curr) => prev.distance < curr.distance ? prev : curr).index;

        goToSlide(nearestDotIndex);

        slider.style.cursor = 'grab';
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function goToSlide(slideIndex) {
        currentTranslate = -slideIndex * slider.offsetWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
        updateDots(slideIndex);
    }

    function updateDots(activeIndex) {
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
});
