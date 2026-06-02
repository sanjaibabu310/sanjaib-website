// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.getElementById('scrollToTop');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.id !== 'themeToggle') {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Scroll to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Theme Toggle
themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.toggle('dark-mode');
    
    // Save preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Generate Stars in Hero Section
function generateStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.5 + 0.5;
        star.style.animation = `twinkle ${2 + Math.random() * 2}s infinite`;
        starsContainer.appendChild(star);
    }
}

// Add twinkle animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);

generateStars();

// Download Resume Function
function downloadResume() {
    // Create a simple resume PDF or document
    const resumeContent = `
    SANJAI B
    B.Sc. Mathematics with Computer Applications Student
    Don Bosco College, Yelagiri

    CONTACT INFORMATION
    Email: sanjaibabu1310@gmail.com
    Phone: +91 97869 76122
    LinkedIn: https://www.linkedin.com/in/sanjai-b-253a64349
    GitHub: https://github.com/sanjaibabu310

    OBJECTIVE
    To secure opportunities where I can apply my mathematical knowledge, programming skills, and technical expertise while continuously learning and contributing to innovative projects in software development and technology.

    EDUCATION
    Bachelor of Science (B.Sc.)
    Mathematics with Computer Applications
    Don Bosco College, Yelagiri
    Status: Currently Pursuing

    TECHNICAL SKILLS
    - Languages: HTML5, CSS3, JavaScript, PHP, Java, Python
    - Database: MySQL
    - Software: Microsoft Office Suite

    PROJECTS
    1. Attendance Management System (HTML, CSS, JavaScript, PHP, MySQL)
    2. Department Website (HTML, CSS, JavaScript)
    3. Personal Portfolio Website (HTML, CSS, JavaScript)
    4. Mathematics Research Projects (Mathematics, Python, Data Analysis)

    RESEARCH & ACADEMIC ACTIVITIES
    - Mathematics in Astronomy: Foundations and Frontiers in Modern Space Exploration
    - Mathematical Modeling and Simulation of Planetary Orbits
    - Computational Approach to Celestial Mechanics
    - Youth Astronomy and Space Science Congress Participation

    SOFT SKILLS
    - Communication
    - Teamwork
    - Leadership
    - Time Management
    - Adaptability
    `;

    // Create a Blob from the content
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sanjai_B_Resume.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Contact Form Submission
function submitForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Validate form
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Create mailto link
    const mailtoLink = `mailto:sanjaibabu1310@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Show success message
    alert('Thank you for your message! Opening email client...');
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    form.reset();
}

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.skill-category, .project-card, .cert-card, .achievement-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
});