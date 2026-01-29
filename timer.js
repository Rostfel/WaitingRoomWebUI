document.addEventListener('DOMContentLoaded', function() {
    const STORAGE_KEY = 'waitingRoomSettings';
    const savedSettings = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    
    let endTime = savedSettings.endTime ? new Date(savedSettings.endTime) : new Date(Date.now());
    const timeDisplay = document.getElementById('timeRemaining');

    function padZero(num, digits = 2) {
        return num.toString().padStart(digits, '0');
    }

    function updateTimer() {
        // Always reload from storage to catch external changes
        const STORAGE_KEY = 'waitingRoomSettings';
        const savedSettings = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        endTime = savedSettings.endTime ? new Date(savedSettings.endTime) : new Date(Date.now());
        
        const now = new Date();
        const diff = endTime - now;

        if (diff <= 0) {
            timeDisplay.innerHTML = 'Time is up!';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timeDisplay.innerHTML = 
            padZero(days, 3) + ' days ' +
            padZero(hours) + ' hours ' +
            padZero(minutes) + ' minutes ' +
            padZero(seconds) + ' seconds';
    }

    // Expose endTime for other scripts
    window.waitingRoomTimer = {
        endTime: endTime,
        updateTimer: updateTimer
    };

    // Start timer
    updateTimer();
    setInterval(updateTimer, 1000);
});
