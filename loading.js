// loading.js - Loading indicators
window.LoadingManager = {
    // Show a spinner in a given element
    showSpinner: function(elementId, message = 'Loading...') {
        const el = document.getElementById(elementId);
        if (!el) return;
        el.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>${message}</p>
            </div>
        `;
    },

    // Show a skeleton loader for a card grid
    showSkeleton: function(elementId, count = 3, type = 'crime') {
        const el = document.getElementById(elementId);
        if (!el) return;
        let skeletons = '';
        for (let i = 0; i < count; i++) {
            skeletons += `
                <div class="${type}-card skeleton">
                    <div class="skeleton-icon"></div>
                    <div class="skeleton-title"></div>
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line"></div>
                    <div class="skeleton-button"></div>
                </div>
            `;
        }
        el.innerHTML = skeletons;
    },

    // Hide loading (clear element content)
    hide: function(elementId) {
        const el = document.getElementById(elementId);
        if (el) el.innerHTML = '';
    }
};

// Add skeleton styles
(function() {
    const style = document.createElement('style');
    style.textContent = `
        .loading-spinner {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px;
            text-align: center;
        }
        .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #9c27b0;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 15px;
        }
        .spinner.small {
            width: 30px;
            height: 30px;
            border-width: 3px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .skeleton {
            background: white;
            pointer-events: none;
            animation: none;
        }
        .skeleton .skeleton-icon {
            width: 50px;
            height: 50px;
            background: #e0e0e0;
            border-radius: 50%;
            margin: 10px auto;
            animation: shimmer 1.5s infinite;
        }
        .skeleton .skeleton-title {
            height: 24px;
            width: 60%;
            background: #e0e0e0;
            margin: 15px auto;
            border-radius: 4px;
            animation: shimmer 1.5s infinite;
        }
        .skeleton .skeleton-line {
            height: 16px;
            width: 90%;
            background: #e0e0e0;
            margin: 10px auto;
            border-radius: 4px;
            animation: shimmer 1.5s infinite;
        }
        .skeleton .skeleton-button {
            height: 40px;
            width: 100%;
            background: #e0e0e0;
            margin-top: 15px;
            border-radius: 8px;
            animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
        }
    `;
    document.head.appendChild(style);
})();
