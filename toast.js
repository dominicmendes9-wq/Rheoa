// toast.js - Unified toast notification system
(function() {
    // Create toast container if it doesn't exist
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // Toast function
    window.showToast = function(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // Remove after duration
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                if (toast.parentNode) {
                    container.removeChild(toast);
                }
            }, 300);
        }, duration);
    };

    // Add necessary styles if not already present
    const style = document.createElement('style');
    style.textContent = `
        .toast-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
        }
        .toast {
            padding: 15px 25px;
            margin-bottom: 10px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            min-width: 250px;
            max-width: 350px;
        }
        .toast.success { background: #4CAF50; }
        .toast.error { background: #f44336; }
        .toast.info { background: #2196F3; }
        .toast.warning { background: #ff9800; }
        .toast.achievement { background: #9c27b0; }
        .toast.battle-win { background: #4CAF50; }
        .toast.battle-loss { background: #f44336; }
        .toast.reward { background: #ffd700; color: #333; }
        .toast.prestige { background: #9c27b0; }
        .toast.discovery { background: #9c27b0; }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .toast.fade-out {
            animation: slideOut 0.3s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
})();
