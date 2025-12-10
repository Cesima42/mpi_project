// AТУ MPI Center - Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme or prefer-color-scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.className = 'fas fa-sun';
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.className = 'fas fa-moon';
        }
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.className = navLinks.classList.contains('active') 
            ? 'fas fa-times' 
            : 'fas fa-bars';
    });
    
    // Dropdown functionality for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Close dropdowns when clicking outside (mobile)
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown') && window.innerWidth <= 768) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
        
        // Close mobile menu when clicking outside
        if (!e.target.closest('.navbar') && window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
    
    // Animate stats numbers
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const target = parseInt(statNumber.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        statNumber.textContent = Math.floor(current).toLocaleString();
                    }, 16);
                    
                    observer.unobserve(statNumber);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(statNumber => {
            observer.observe(statNumber);
        });
    }
    
    // Copy code functionality
    function setupCopyButtons() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const codeId = this.getAttribute('data-code');
                const codeElement = document.getElementById(codeId);
                const codeText = codeElement.textContent;
                
                navigator.clipboard.writeText(codeText).then(() => {
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Көшірілді!';
                    this.style.background = '#2ecc71';
                    
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                        this.style.background = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Көшіру сәтсіз аяқталды: ', err);
                    this.innerHTML = '<i class="fas fa-times"></i> Қате!';
                    this.style.background = '#e74c3c';
                    
                    setTimeout(() => {
                        this.innerHTML = '<i class="far fa-copy"></i> Көшіру';
                        this.style.background = '';
                    }, 2000);
                });
            });
        });
    }
    
    // Task execution functionality for modules
    function setupTaskExecution() {
        const runButtons = document.querySelectorAll('.run-btn, .compact-run-btn');
        
        runButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const taskId = this.getAttribute('data-task');
                const outputElement = document.getElementById(`output${taskId}`);
                
                if (!outputElement) return;
                
                // Show running state
                this.classList.add('running');
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> АТУ кластерінде орындалуда...';
                
                if (outputElement.classList.contains('compact-output')) {
                    outputElement.textContent = 'АТУ MPI бағдарламасы іске қосылуда...\n';
                } else {
                    const outputContent = outputElement.querySelector('.output-content');
                    if (outputContent) {
                        outputElement.classList.add('active');
                        outputContent.textContent = 'АТУ MPI бағдарламасы іске қосылуда...';
                    }
                }
                
                // Simulate execution with random delay
                const delay = 1000 + Math.random() * 1000; // 1-2 seconds
                
                setTimeout(() => {
                    this.classList.remove('running');
                    this.innerHTML = originalHTML;
                    
                    // Get input values based on task
                    let result = '';
                    
                    // This is a simplified simulation - in real implementation
                    // you would process the actual input values
                    result = 'АТУ MPI бағдарламасы сәтті орындалды!\n';
                    result += '================================\n';
                    result += 'Нәтижелер АТУ кластерінде есептелді:\n\n';
                    
                    // Add some example output based on task type
                    if (taskId && taskId.length > 0) {
                        result += `MPIBegin${taskId} тапсырмасы орындалды\n`;
                        result += `АТУ HPC кластерінде 4 процесс арқылы\n`;
                        result += `Уақыт: ${(Math.random() * 2 + 0.5).toFixed(2)} секунд\n`;
                        result += `Память: ${(Math.random() * 100 + 50).toFixed(1)} MB\n`;
                    }
                    
                    if (outputElement.classList.contains('compact-output')) {
                        outputElement.textContent = result;
                    } else {
                        const outputContent = outputElement.querySelector('.output-content');
                        if (outputContent) {
                            outputContent.textContent = result;
                        }
                    }
                }, delay);
            });
        });
    }
    
    // Initialize all functionality
    animateStats();
    setupCopyButtons();
    setupTaskExecution();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add AТУ branding animation
    function addATUBranding() {
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                const atuBadge = logo.querySelector('.atu-badge');
                if (atuBadge) {
                    atuBadge.style.transform = 'scale(1.1)';
                    atuBadge.style.transition = 'transform 0.3s ease';
                }
            });
            
            logo.addEventListener('mouseleave', () => {
                const atuBadge = logo.querySelector('.atu-badge');
                if (atuBadge) {
                    atuBadge.style.transform = 'scale(1)';
                }
            });
        }
    }
    
    addATUBranding();
    
    // Add module accordion functionality if present
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector('.accordion-icon');
                
                // Close all other accordions
                document.querySelectorAll('.accordion-content.active').forEach(activeContent => {
                    if (activeContent !== content) {
                        activeContent.classList.remove('active');
                        const otherHeader = activeContent.previousElementSibling;
                        otherHeader.classList.remove('active');
                    }
                });
                
                // Toggle current
                this.classList.toggle('active');
                content.classList.toggle('active');
            });
        });
        
        // Open first accordion by default
        if (accordionHeaders[0]) {
            accordionHeaders[0].click();
        }
    }
    
    // Add loading animation for better UX
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});