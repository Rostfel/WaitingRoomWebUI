document.addEventListener('DOMContentLoaded', function() {
    const dateBtn = document.getElementById('dateBtn');

    dateBtn.addEventListener('click', function() {
        const dateInput = document.createElement('input');
        dateInput.type = 'datetime-local';
        dateInput.min = new Date().toISOString().slice(0, 16);
        dateInput.step = '60';

        const overlay = document.createElement('div');
        overlay.className = 'date-overlay';
        overlay.appendChild(dateInput);

        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'OK';
        overlay.appendChild(confirmBtn);

        document.body.appendChild(overlay);
        dateInput.focus();

        function confirmSelection() {
            if (dateInput.value) {
                const newEndTime = new Date(dateInput.value);
                if (newEndTime > new Date()) {
                    const STORAGE_KEY = 'waitingRoomSettings';
                    const savedSettings = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
                    savedSettings.endTime = newEndTime.toISOString();
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSettings));
                    
                    if (window.waitingRoomTimer) {
                        window.waitingRoomTimer.endTime = newEndTime;
                        window.waitingRoomTimer.updateTimer();
                    }
                }
                overlay.remove();
            }
        }

        confirmBtn.addEventListener('click', confirmSelection);
        dateInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                confirmSelection();
            }
        });

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) overlay.remove();
        });
    });
});
