// Animasi smooth scroll untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Animasi navbar saat scroll
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > 50) {
        header.classList.add('scrolled');
        
        // Hide header on scroll down, show on scroll up
        if (currentScroll > lastScroll) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Animasi hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.transform = isMenuOpen 
            ? index === 1 
                ? 'scale(0)' 
                : index === 0 
                    ? 'rotate(45deg) translate(6px, 6px)' 
                    : 'rotate(-45deg) translate(6px, -6px)'
            : 'none';
    });
}

menuToggle.addEventListener('click', toggleMenu);

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });
});

// Typing animation untuk hero section
const heroText = document.querySelector('.hero-content p');
if (heroText) {
    const text = heroText.innerHTML;
    heroText.innerHTML = '';

    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Mulai animasi ketika halaman dimuat
    window.addEventListener('load', typeWriter);
}

// Scroll animation untuk sections
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
        }
    });
}, {
    threshold: 0.25,
    rootMargin: '0px'
});

sections.forEach(section => {
    section.classList.add('section-animate');
    sectionObserver.observe(section);
});

// Parallax effect untuk hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }, { passive: true });
}

// Project cards animation and interaction
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease forwards ${entry.target.dataset.delay || '0s'}`;
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

projectCards.forEach((card, index) => {
    card.dataset.delay = `${index * 0.1}s`;
    projectObserver.observe(card);

    // Add hover effect for project cards
    card.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            const overlay = card.querySelector('.project-overlay');
            const links = overlay.querySelectorAll('a');
            
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
            
            links.forEach((link, i) => {
                setTimeout(() => {
                    link.style.transform = 'translateY(0)';
                    link.style.opacity = '1';
                }, i * 100);
            });
        }
    });

    // Add smooth transition on mouseleave
    card.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            const overlay = card.querySelector('.project-overlay');
            const links = overlay.querySelectorAll('a');
            
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(100%)';
            
            links.forEach(link => {
                link.style.transform = 'translateY(20px)';
                link.style.opacity = '0';
            });
        }
    });
});

// Add click effect for project buttons
const projectButtons = document.querySelectorAll('.project-link, .project-demo');
projectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        
        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add smooth scroll for project links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate project cards after page load
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
    });
});

// Prevent scroll when mobile menu is open
document.body.addEventListener('touchmove', (e) => {
    if (isMenuOpen) {
        e.preventDefault();
    }
}, { passive: false });

// Animate logo on hover
const logo = document.querySelector('.logo');
logo.addEventListener('mouseenter', () => {
    logo.style.animation = 'none';
    setTimeout(() => {
        logo.style.animation = 'logoFloat 3s ease-in-out infinite';
    }, 10);
});

// Add glowing effect to active nav link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
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

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formGroups = document.querySelectorAll('.form-group');

// Animate form groups on scroll
const formObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.5s ease forwards ${entry.target.dataset.delay}`;
        }
    });
}, {
    threshold: 0.5
});

formGroups.forEach((group, index) => {
    group.dataset.delay = `${0.2 + index * 0.1}s`;
    formObserver.observe(group);
});

// Form input animations
const formInputs = document.querySelectorAll('.input-group input, .input-group textarea');
formInputs.forEach(input => {
    // Add focus animation
    input.addEventListener('focus', () => {
        const icon = input.previousElementSibling;
        icon.style.transform = 'scale(1.1)';
        icon.style.color = '#2b4865';
    });

    // Remove focus animation
    input.addEventListener('blur', () => {
        const icon = input.previousElementSibling;
        icon.style.transform = 'scale(1)';
        icon.style.color = '#ff69b4';
    });

    // Validate input on change
    input.addEventListener('input', () => {
        validateInput(input);
    });
});

// Form validation
function validateInput(input) {
    const inputGroup = input.parentElement;
    
    if (input.validity.valid) {
        inputGroup.classList.remove('invalid');
        inputGroup.classList.add('valid');
    } else {
        inputGroup.classList.remove('valid');
        inputGroup.classList.add('invalid');
    }
}

// Handle form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all inputs
        let isValid = true;
        formInputs.forEach(input => {
            if (!input.validity.valid) {
                isValid = false;
                validateInput(input);
            }
        });

        if (isValid) {
            // Add loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('span');
            const btnIcon = submitBtn.querySelector('i');
            
            submitBtn.disabled = true;
            btnText.textContent = 'Mengirim...';
            btnIcon.className = 'fas fa-spinner fa-spin';

            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Success state
                btnText.textContent = 'Terkirim!';
                btnIcon.className = 'fas fa-check';
                submitBtn.classList.add('submit-success');

                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    btnText.textContent = 'Kirim Pesan';
                    btnIcon.className = 'fas fa-paper-plane';
                    submitBtn.classList.remove('submit-success');
                }, 2000);
            }, 1500);
        }
    });
}

// Animate contact items on scroll
const contactItems = document.querySelectorAll('.contact-item');
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.5s ease forwards ${entry.target.dataset.delay}`;
            entry.target.style.opacity = '1';
        }
    });
}, {
    threshold: 0.5
});

contactItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.dataset.delay = `${0.2 + index * 0.1}s`;
    contactObserver.observe(item);
});
