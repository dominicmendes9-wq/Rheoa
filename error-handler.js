// error-handler.js - Unified error handling
window.ErrorHandler = {
    // Show an error message in a specific element
    showError: function(elementId, message, retryCallback = null) {
        const el = document.getElementById(elementId);
        if (!el) return;
        
        let html = `
            <div class="error-container">
                <p>❌ ${message}</p>
        `;
        if (retryCallback) {
            html += `<button class="retry-button" onclick="(${retryCallback.toString()})()">Try Again</button>`;
        }
        html += `</div>`;
        el.innerHTML = html;
    },

    // Handle Supabase errors
    handleSupabaseError: function(error, customMessage = 'An error occurred') {
        console.error('Supabase error:', error);
        
        // Return user-friendly message
        if (error?.message) {
            // Check for common errors
            if (error.message.includes('duplicate key')) {
                return 'This record already exists.';
            }
            if (error.message.includes('foreign key')) {
                return 'Referenced record not found.';
            }
            if (error.message.includes('permission denied') || error.message.includes('policy')) {
                return 'You do not have permission to perform this action.';
            }
            if (error.message.includes('JWT')) {
                return 'Your session has expired. Please log in again.';
            }
            if (error.message.includes('network')) {
                return 'Network error. Please check your connection.';
            }
            return error.message;
        }
        return customMessage;
    },

    // Wrapper for async operations with automatic error handling
    async withErrorHandling(asyncFn, errorElementId, errorMessage = 'Operation failed') {
        try {
            return await asyncFn();
        } catch (error) {
            const friendlyMessage = this.handleSupabaseError(error, errorMessage);
            if (errorElementId) {
                this.showError(errorElementId, friendlyMessage);
            } else {
                if (window.showToast) {
                    window.showToast(friendlyMessage, 'error');
                } else {
                    alert(friendlyMessage);
                }
            }
            throw error;
        }
    }
};

// Add error styles
(function() {
    const style = document.createElement('style');
    style.textContent = `
        .error-container {
            text-align: center;
            padding: 40px;
            color: #f44336;
            background: #ffebee;
            border: 2px solid #f44336;
            border-radius: 10px;
            margin: 20px;
        }
        .retry-button {
            margin-top: 15px;
            padding: 10px 20px;
            background: #f44336;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
            font-weight: bold;
        }
        .retry-button:hover {
            background: #d32f2f;
        }
    `;
    document.head.appendChild(style);
})();
