// Matrix Rain Effect
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

let fontSize = 14;
let columns, drops = [];

function initializeMatrix() {
    // Adjust font size based on screen width
    if (window.innerWidth <= 480) {
        fontSize = 10;
    } else if (window.innerWidth <= 768) {
        fontSize = 12;
    } else {
        fontSize = 14;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    columns = Math.floor(canvas.width / fontSize);
    
    // Reset drops array
    drops.length = 0;
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
}

initializeMatrix();

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]|\\:";\'<>?,./`~';

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px Share Tech Mono';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Adjust animation frame rate for mobile devices
const isMobile = window.innerWidth <= 768;
const animationSpeed = isMobile ? 50 : 35;

setInterval(drawMatrix, animationSpeed);

// Resize canvas on window resize with debounce
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initializeMatrix();
    }, 100);
});

// === DYNAMIC LOGS SYSTEM ===
class SystemLogs {
    constructor() {
        this.logs = [];
        this.container = document.getElementById('log-container');
        this.sessionStart = new Date();
        this.logQueue = [];
        this.isTyping = false;
        this.lastActivity = Date.now();
        
        this.systemMessages = [
            "Memory optimization... COMPLETE",
            "Scanning for vulnerabilities... CLEAR",
            "Coffee.exe status: CRITICAL_LOW",
            "Backup process initiated... RUNNING",
            "Network latency: OPTIMAL",
            "CPU temperature: NORMAL",
            "Disk space monitoring: OK",
            "Security protocols: ACTIVE",
            "Code compilation: SUCCESS",
            "Database connection: STABLE",
            "API endpoints: RESPONDING",
            "Session timeout: EXTENDED",
            "Cache cleared successfully",
            "Firewall status: ENABLED",
            "SSL certificate: VALID",
            "Port scanning: BLOCKED",
            "System update: AVAILABLE",
            "Monitoring scripts: ACTIVE",
            "Debug mode: DISABLED",
            "Performance metrics: LOGGED",
            "Error logs: REVIEWED",
            "Memory usage: 67%",
            "Network bandwidth: 89%",
            "Active processes: 42",
            "Background tasks: RUNNING"
        ];
        
        this.eventMessages = [
            { message: "User scrolled to projects section", trigger: () => this.checkSection('projects') },
            { message: "Tech stack accessed", trigger: () => this.checkSection('stack') },
            { message: "Contact information viewed", trigger: () => this.checkSection('contact') },
            { message: "About section analyzed", trigger: () => this.checkSection('about') },
            { message: "Navigation menu interacted", trigger: () => this.checkNavigation() },
            { message: "Matrix effect initialized", trigger: () => true },
        ];
        
        this.init();
    }
    
    init() {
        this.addInitialLogs();
        this.startLogging();
        this.setupEventListeners();
        this.monitorUserActivity();
    }
    
    formatTimestamp() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    
    addLog(message, type = 'info', color = '#00ff41') {
        const timestamp = this.formatTimestamp();
        const logEntry = {
            timestamp,
            message,
            type,
            color,
            id: Date.now() + Math.random()
        };
        
        this.logs.push(logEntry);
        this.logQueue.push(logEntry);
        
        if (!this.isTyping) {
            this.processQueue();
        }
        
        // Keep only last 100 logs for performance
        if (this.logs.length > 100) {
            this.logs = this.logs.slice(-100);
        }
    }
    
    async processQueue() {
        if (this.logQueue.length === 0 || this.isTyping) return;
        
        this.isTyping = true;
        const logEntry = this.logQueue.shift();
        await this.typeLog(logEntry);
        this.isTyping = false;
        
        // Process next in queue
        if (this.logQueue.length > 0) {
            setTimeout(() => this.processQueue(), 100);
        }
    }
    
    async typeLog(logEntry) {
        const logElement = document.createElement('p');
        logElement.style.color = logEntry.color;
        logElement.style.margin = '2px 0';
        this.container.appendChild(logElement);
        
        const fullText = `[${logEntry.timestamp}] ${logEntry.message}`;
        
        // Add blinking cursor
        if (logEntry.type === 'ready') {
            logElement.innerHTML = fullText + ' <span class="blinking">_</span>';
        } else {
            // Type effect
            for (let i = 0; i <= fullText.length; i++) {
                logElement.textContent = fullText.slice(0, i);
                await new Promise(resolve => setTimeout(resolve, 20));
            }
        }
        
        // Auto-scroll to bottom
        this.container.scrollTop = this.container.scrollHeight;
    }
    
    addInitialLogs() {
        const connectionTime = new Date(this.sessionStart);
        
        // Initial connection logs
        setTimeout(() => this.addLog("User connected from IP: CLASSIFIED", 'info', '#00ff41'), 100);
        setTimeout(() => this.addLog("Authentication: SUCCESS", 'success', '#00ff41'), 800);
        setTimeout(() => this.addLog("Loading user profile... COMPLETE", 'info', '#00ff41'), 1500);
        setTimeout(() => this.addLog("Initializing tech stack... COMPLETE", 'info', '#00ff41'), 2200);
        setTimeout(() => this.addLog("Coffee brewing process: INITIATED", 'warning', '#ffaa00'), 2900);
        setTimeout(() => this.addLog("Welcome message transmitted...", 'info', '#00ff41'), 3600);
        setTimeout(() => this.addLog(">>> READY FOR COLLABORATION", 'ready', '#ff6600'), 4300);
        
        // Random system messages
        setTimeout(() => this.startRandomLogs(), 5000);
    }
    
    startRandomLogs() {
        const addRandomLog = () => {
            if (Math.random() < 0.3) {
                const message = this.systemMessages[Math.floor(Math.random() * this.systemMessages.length)];
                const colors = ['#00ff41', '#ffaa00', '#ff6600'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                this.addLog(message, 'system', color);
            }
        };
        
        // Add random logs every 8-15 seconds
        setInterval(addRandomLog, Math.random() * 7000 + 8000);
    }
    
    startLogging() {
        // System monitoring logs every 30 seconds
        setInterval(() => {
            const uptime = Math.floor((Date.now() - this.sessionStart.getTime()) / 1000);
            this.addLog(`System uptime: ${this.formatUptime(uptime)}`, 'info', '#00ff41');
        }, 30000);
        
        // Memory usage simulation
        setInterval(() => {
            const usage = (65 + Math.random() * 20).toFixed(1);
            this.addLog(`Memory usage: ${usage}%`, 'info', '#ffaa00');
        }, 45000);
    }
    
    formatUptime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    setupEventListeners() {
        // Clear logs button
        document.getElementById('clear-logs')?.addEventListener('click', () => {
            this.container.innerHTML = '';
            this.logs = [];
            this.addLog("Log buffer cleared by user", 'warning', '#ff6600');
            this.addLog("System monitoring resumed", 'info', '#00ff41');
        });
        
        // Export logs button
        document.getElementById('export-logs')?.addEventListener('click', () => {
            const logText = this.logs.map(log => `[${log.timestamp}] ${log.message}`).join('\n');
            const blob = new Blob([logText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `system_logs_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
            a.click();
            URL.revokeObjectURL(url);
            this.addLog("Log file exported successfully", 'success', '#00ff41');
        });
    }
    
    monitorUserActivity() {
        // Track scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (Date.now() - this.lastActivity > 10000) { // 10 seconds since last activity
                    this.addLog("User activity detected: scrolling", 'activity', '#ffaa00');
                    this.lastActivity = Date.now();
                }
            }, 1000);
        });
        
        // Track section visits
        this.trackSectionVisits();
        
        // Track navigation clicks
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                const section = link.getAttribute('href').replace('#', '');
                this.addLog(`Navigation: Accessing ${section} section`, 'navigation', '#ff6600');
            });
        });
        
        // Track contact clicks
        document.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('click', () => {
                this.addLog("External link accessed", 'activity', '#ffaa00');
            });
        });
        
        // Track project repository clicks
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', () => {
                this.addLog("External repository accessed", 'activity', '#ffaa00');
            });
        });
    }
    
    trackSectionVisits() {
        const sections = document.querySelectorAll('.section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const sectionId = entry.target.id;
                    if (sectionId && Date.now() - this.lastActivity > 5000) {
                        this.addLog(`Section accessed: ${sectionId}`, 'activity', '#ffaa00');
                        this.lastActivity = Date.now();
                    }
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => observer.observe(section));
    }
    
    checkSection(sectionId) {
        const section = document.getElementById(sectionId);
        return section && this.isInViewport(section);
    }
    
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
    
    checkNavigation() {
        return document.querySelector('nav:hover') !== null;
    }
}

// Terminal typing effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize logs system
    const systemLogs = new SystemLogs();
    
    // Random glitch effect on title (reduced frequency on mobile)
    const title = document.querySelector('.glitch');
    const glitchFrequency = window.innerWidth <= 768 ? 2000 : 1000;
    
    setInterval(() => {
        if (Math.random() < 0.1) {
            const intensity = window.innerWidth <= 480 ? 1 : 2;
            title.style.transform = `translate(${Math.random() * intensity - intensity/2}px, ${Math.random() * intensity - intensity/2}px)`;
            setTimeout(() => {
                title.style.transform = 'translate(0, 0)';
            }, 100);
        }
    }, glitchFrequency);
    
    // Mobile menu enhancement
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    window.scrollBy(0, -60);
                }, 100);
            }
        });
    });
    
    // Touch-friendly hover effects for mobile
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.tech-item, .contact-item, nav a, .project');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Optimize animations for performance
    if (window.innerWidth <= 768) {
        const style = document.createElement('style');
        style.textContent = `
            .glitch::before,
            .glitch::after {
                animation-duration: 1s;
            }
            
            @keyframes pulse {
                0% { box-shadow: 0 0 10px #00ff41; }
                50% { box-shadow: 0 0 20px #00ff41; }
                100% { box-shadow: 0 0 10px #00ff41; }
            }
        `;
        document.head.appendChild(style);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - (window.innerWidth <= 768 ? 20 : 0);
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations on scroll
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: window.innerWidth <= 768 ? 0.1 : 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for entrance animations
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

//pause matrix effect when tab is not visible
let isTabVisible = true;
let matrixInterval;

document.addEventListener('visibilitychange', function() {
    isTabVisible = !document.hidden;
    if (!isTabVisible) {
        clearInterval(matrixInterval);
    } else {
        matrixInterval = setInterval(drawMatrix, animationSpeed);
    }
});

// Make systemLogs available globally for easter eggs
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const systemLogs = document.querySelector('#log-container');
        if (systemLogs && systemLogs.systemLogsInstance) {
            window.systemLogs = systemLogs.systemLogsInstance;
        }
    }, 1000);
});