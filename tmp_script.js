// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const screens = document.querySelectorAll('.screen');
const statusSegments = document.querySelectorAll('.status-segment');
const employeeRows = document.querySelectorAll('.employee-row');
const toast = document.getElementById('toast');

// Navigation Functionality
function switchScreen(screenId) {
    // Hide all screens
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        targetScreen.classList.add('fade-in');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            targetScreen.classList.remove('fade-in');
        }, 500);
    }
    
    // Update navigation active state
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.screen === screenId) {
            item.classList.add('active');
        }
    });
}

// Toast Notification Function
function showToast(message, duration = 3000) {
    toast.querySelector('span').textContent = message;
    toast.classList.add('show');
    
    // Auto-hide after specified duration
    setTimeout(() => {
        hideToast();
    }, duration);
}

function hideToast() {
    toast.classList.remove('show');
}

// Send Reminder Function
function sendReminder(button) {
    // Add loading state to button
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Show success toast
        showToast('Reminder sent successfully!');
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
        
        // Add success animation to the row
        const row = button.closest('.employee-row');
        row.style.background = '#d4edda';
        row.style.borderLeft = '4px solid #28a745';
        
        // Reset row styling after animation
        setTimeout(() => {
            row.style.background = '';
            row.style.borderLeft = '';
        }, 2000);
        
    }, 1000);
}

// Task Status Filtering
function filterByStatus(status) {
    // Remove active class from all status segments
    statusSegments.forEach(segment => {
        segment.classList.remove('active');
    });
    
    // Add active class to clicked segment
    const activeSegment = document.querySelector(`[data-filter="${status}"]`);
    if (activeSegment) {
        activeSegment.classList.add('active');
    }
    
    // Filter employee rows
    employeeRows.forEach(row => {
        row.classList.remove('highlighted');
        
        if (status === 'all' || row.dataset.status === status) {
            row.style.display = '';
            if (status !== 'all') {
                row.classList.add('highlighted');
            }
        } else {
            row.style.display = 'none';
        }
    });
    
    // Add animation to visible rows
    const visibleRows = document.querySelectorAll('.employee-row:not([style*="display: none"])');
    visibleRows.forEach((row, index) => {
        setTimeout(() => {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                row.style.transition = 'all 0.3s ease';
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, 50);
        }, index * 100);
    });
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }, index * 200);
    });
}

// Panel Hover Effects
function initializePanelEffects() {
    const panels = document.querySelectorAll('.panel');
    
    panels.forEach(panel => {
        panel.addEventListener('mouseenter', () => {
            panel.style.transform = 'translateY(-4px)';
            panel.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        panel.addEventListener('mouseleave', () => {
            panel.style.transform = 'translateY(0)';
            panel.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
    });
}

// Initiate Offboarding Button
function initializeOffboardingButton() {
    const initiateBtn = document.querySelector('.initiate-btn');
    
    initiateBtn.addEventListener('click', () => {
        // Add click animation
        initiateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            initiateBtn.style.transform = 'scale(1)';
        }, 150);
        
        // Show notification
        showToast('Initiating new offboarding process...');
        
        // Simulate loading state
        initiateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        initiateBtn.disabled = true;
        
        // Reset after delay
        setTimeout(() => {
            initiateBtn.innerHTML = '<i class="fas fa-briefcase"></i> Initiate Offboarding';
            initiateBtn.disabled = false;
            showToast('Offboarding process initiated successfully!');
        }, 2000);
    });
}

// Alert Item Interactions
function initializeAlertInteractions() {
    const alertItems = document.querySelectorAll('.alert-item');
    
    alertItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add click effect
            item.style.background = '#f8f9fa';
            item.style.borderRadius = '6px';
            item.style.padding = '12px';
            
            // Show action notification
            const alertText = item.querySelector('span').textContent;
            showToast(`Action taken on: ${alertText.substring(0, 50)}...`);
            
            // Reset styling
            setTimeout(() => {
                item.style.background = '';
                item.style.borderRadius = '';
                item.style.padding = '';
            }, 1000);
        });
    });
}

// KPI Counter Animation
function animateKPICounters() {
    const kpiNumbers = document.querySelectorAll('.kpi-number');
    
    kpiNumbers.forEach(number => {
        const finalValue = parseInt(number.textContent);
        let currentValue = 0;
        const increment = finalValue / 20;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            number.textContent = Math.floor(currentValue);
        }, 50);
    });
}

// Smooth Scrolling for Navigation
function initializeSmoothScrolling() {
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add click animation
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
            
            const screenId = item.dataset.screen;
            switchScreen(screenId);
        });
    });
}

// Status Segment Click Handlers
function initializeStatusSegments() {
    statusSegments.forEach(segment => {
        segment.addEventListener('click', () => {
            const filter = segment.dataset.filter;
            
            // Add click animation
            segment.style.transform = 'scale(0.95)';
            setTimeout(() => {
                segment.style.transform = 'scale(1)';
            }, 150);
            
            filterByStatus(filter);
        });
    });
}

// Table Row Hover Effects
function initializeTableEffects() {
    employeeRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.transform = 'translateX(4px)';
            row.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
        
        row.addEventListener('mouseleave', () => {
            row.style.transform = 'translateX(0)';
            row.style.boxShadow = 'none';
        });
    });
}

// Keyboard Navigation Support
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Escape key to hide toast
        if (e.key === 'Escape') {
            hideToast();
        }
        
        // Number keys for quick navigation
        if (e.key >= '1' && e.key <= '4') {
            const navIndex = parseInt(e.key) - 1;
            const navItem = navItems[navIndex];
            if (navItem) {
                switchScreen(navItem.dataset.screen);
            }
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all interactive features
    initializeSmoothScrolling();
    initializeStatusSegments();
    initializeTableEffects();
    initializePanelEffects();
    initializeOffboardingButton();
    initializeAlertInteractions();
    initializeKeyboardNavigation();
    
    // Animate progress bars on load
    setTimeout(animateProgressBars, 500);
    
    // Animate KPI counters
    setTimeout(animateKPICounters, 1000);
    
    // Add loading animation to progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        bar.classList.add('loading');
        setTimeout(() => {
            bar.classList.remove('loading');
        }, 2000);
    });
    
    console.log('HR Dashboard Prototype initialized successfully!');
});

// Export functions for global access
window.sendReminder = sendReminder;
window.switchScreen = switchScreen;
window.showToast = showToast;
window.hideToast = hideToast;
window.filterByStatus = filterByStatus;
