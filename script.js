// Smooth scroll animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // 1. SET ACTIVE SIDEBAR LINK BASED ON CURRENT PAGE
    // ============================================
    
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Get all sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    // Set active class based on current page
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove active class from all links first
        link.classList.remove('active');
        
        // Check if this link matches current page
        if (href === currentPage) {
            link.classList.add('active');
        }
        
        // Special case for index.html - also activate home link for other pages if they don't have exact match
        if (currentPage === 'index.html' && (href === 'index.html' || href === '#home')) {
            link.classList.add('active');
        }
    });
    
    // ============================================
    // 2. INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // 3. SMOOTH SCROLL FOR ANCHOR LINKS (ONLY WITHIN SAME PAGE)
    // ============================================
    
    // Only add smooth scroll if we have anchor links on the page
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    if (anchorLinks.length > 0) {
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#" or empty
                if (href === '#' || !href) return;
                
                // Check if the target exists on the current page
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const targetPosition = target.offsetTop - 80; // Offset for fixed header if any
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, href);
                }
                // If target doesn't exist, let the browser handle it normally (might be on another page)
            });
        });
        
        // ============================================
        // 4. UPDATE ACTIVE NAV ON SCROLL (FOR SINGLE PAGES WITH SECTIONS)
        // ============================================
        
        // Only run this if we're on a page with multiple sections
        const sections = document.querySelectorAll('section[id]');
        
        if (sections.length > 1) {
            const navLinks = document.querySelectorAll('.sidebar-link[href^="#"]');
            
            function updateActiveNav() {
                let current = '';
                const scrollPosition = window.pageYOffset + 100;

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    const sectionId = section.getAttribute('id');

                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        current = sectionId;
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }

            window.addEventListener('scroll', updateActiveNav);
            updateActiveNav(); // Initial call
        }
    }
    
    // ============================================
    // 5. HIGHLIGHT CURRENT PAGE IN SIDEBAR (ADDITIONAL LOGIC)
    // ============================================
    
    // For pages that are linked from multiple places
    function highlightCurrentPage() {
        const pageMap = {
            'index.html': ['index.html', '#home'],
            'about.html': ['about.html'],
            'experience.html': ['experience.html'],
            'projects.html': ['projects.html'],
            'skills.html': ['skills.html'],
            'contact.html': ['contact.html'],
            'morphshield.html': ['morphshield.html'],
            'pravasmitra.html': ['pravasmitra.html'],
            'factio.html': ['factio.html']
        };
        
        sidebarLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Check if this link's href matches current page or its variations
            if (pageMap[currentPage] && pageMap[currentPage].includes(href)) {
                link.classList.add('active');
            }
        });
    }
    
    highlightCurrentPage();
    
    // ============================================
    // 6. ADD PAGE-SPECIFIC SCRIPTS
    // ============================================
    
    // Check if we're on the landing page (index.html)
    if (currentPage === 'index.html') {
        
        
        // Animate stats on landing page
        const stats = document.querySelectorAll('.stat-number');
        if (stats.length > 0) {
            stats.forEach(stat => {
                const finalValue = parseInt(stat.textContent);
                if (!isNaN(finalValue)) {
                    let currentValue = 0;
                    const increment = finalValue / 20;
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            stat.textContent = finalValue + (stat.textContent.includes('+') ? '+' : '');
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('+') ? '+' : '');
                        }
                    }, 50);
                }
            });
        }
    }
    
    // ============================================
    // 7. BACK TO TOP BUTTON (OPTIONAL - CAN ADD LATER)
    // ============================================
    
    // You can add a "Back to Top" button here if needed
    // const backToTopButton = document.createElement('button');
    // backToTopButton.innerHTML = '↑';
    // backToTopButton.className = 'back-to-top';
    // document.body.appendChild(backToTopButton);
    // 
    // window.addEventListener('scroll', () => {
    //     if (window.pageYOffset > 300) {
    //         backToTopButton.classList.add('show');
    //     } else {
    //         backToTopButton.classList.remove('show');
    //     }
    // });
    // 
    // backToTopButton.addEventListener('click', () => {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // });
});