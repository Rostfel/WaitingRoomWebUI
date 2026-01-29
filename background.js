document.addEventListener('DOMContentLoaded', function() {
    const STORAGE_KEY = 'waitingRoomSettings';
    let savedSettings = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    // Apply saved or default background
    const body = document.body;
    if (savedSettings.backgroundUrl) {
        body.style.backgroundImage = `url('${savedSettings.backgroundUrl}')`;
        document.getElementById('bgUrlInput').placeholder = savedSettings.backgroundUrl;
    } else {
        body.style.backgroundImage = `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`;
    }

    // Background setter
    document.getElementById('setBgBtn').addEventListener('click', function() {
        const url = document.getElementById('bgUrlInput').value.trim();
        if (url && url.match(/^https?:\/\//)) {
            document.body.style.backgroundImage = `url('${url}')`;
            savedSettings.backgroundUrl = url;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSettings));
            document.getElementById('bgUrlInput').value = '';
            document.getElementById('bgUrlInput').placeholder = `Current: ${url}`;
        } else {
            alert('Please enter a valid URL starting with http:// or https://');
        }
    });

    // Enter key support
    document.getElementById('bgUrlInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('setBgBtn').click();
        }
    });
});
