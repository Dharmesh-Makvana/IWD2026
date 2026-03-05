// ==========================================
// Initialization
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScrolling();
});

// ==========================================
// Sticky Navbar
// ==========================================
function initNavbar() {
    const navbar = document.getElementById("navbar");
    const heroSection = document.getElementById("hero");

    if (!navbar || !heroSection) return;

    // Check scroll position on load
    checkScroll();

    // Check scroll position on scroll
    window.addEventListener("scroll", checkScroll);

    function checkScroll() {
        // Add 'scrolled' class if we've scrolled past 50px
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
}

// ==========================================
// Mobile Hamburger Menu
// ==========================================
function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navLinksItems = document.querySelectorAll(".nav-links a");

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        
        // Toggle icon between bars and times
        const icon = hamburger.querySelector("i");
        if (navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });

    // Close menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove("active");
                const icon = hamburger.querySelector("i");
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        });
    });
}


// ==========================================
// Smooth Scrolling for Anchor Links
// ==========================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if it's a same-page hash link
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });
}

// ==========================================
// Scroll Animations (Intersection Observer)
// ==========================================
function initScrollAnimations() {
    // Select elements to animate
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .pop-in');

    // Options for the observer
    const observerOptions = {
        root: null, // use viewport
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before element comes into view
        threshold: 0.1 // Trigger when 10% visible
    };

    // Callback when elements intersect
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger CSS animation
                const delay = entry.target.getAttribute('data-delay');
                
                if (delay) {
                    entry.target.style.transitionDelay = delay;
                }
                
                entry.target.classList.add('visible');
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    };

    // Create observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all targeted elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}
