// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Contact button click handler
const contactButton = document.querySelector('.contact-btn');
if (contactButton && document.querySelector('#contact')) {
    contactButton.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Add active class to current page link
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    const navMenu = document.querySelector('.nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    const closedMenuIcon = '<i class="fas fa-ellipsis-vertical"></i>';
    const openMenuIcon = '<i class="fas fa-xmark"></i>';
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    if (navMenu && navToggle) {
        navToggle.innerHTML = closedMenuIcon;
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.innerHTML = isOpen
                ? openMenuIcon
                : closedMenuIcon;
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.innerHTML = closedMenuIcon;
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.innerHTML = closedMenuIcon;
            }
        });
    }

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        });
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });

    // Contact form async submit (real-time feedback)
    const contactForm = document.querySelector('.contact-ref-form');
    if (contactForm) {
        const submitButton = contactForm.querySelector('.contact-ref-submit');
        const statusText = contactForm.querySelector('.contact-form-status');

        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (!submitButton || !statusText) return;

            const originalButtonHtml = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending...';
            statusText.classList.remove('error');
            statusText.textContent = 'Sending your message...';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://formsubmit.co/ajax/regminabin802@gmail.com', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });

                const result = await response.json();

                if (response.ok && result.success === 'true') {
                    statusText.textContent = 'Message sent successfully. I will get back to you soon.';
                    contactForm.reset();
                } else {
                    statusText.classList.add('error');
                    statusText.textContent = 'Unable to send message right now. Please try again.';
                }
            } catch (error) {
                statusText.classList.add('error');
                statusText.textContent = 'Network issue. Please check your connection and try again.';
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonHtml;
            }
        });
    }
}); 