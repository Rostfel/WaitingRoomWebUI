document.addEventListener('DOMContentLoaded', function() {
    const STORAGE_KEY = 'waitingRoomSettings';
    let savedSettings = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    // Apply saved or default background
    const body = document.body;
    if (savedSettings.backgroundUrl) {
        body.style.backgroundImage = `url('${savedSettings.backgroundUrl}')`;
        document.getElementById('bgUrlInput').placeholder = savedSettings.backgroundUrl;
    } else {
        body.style.backgroundImage = `url('https://www.mensjournal.com/.image/w_1200,h_675,g_auto,c_fill/NDI6MDAwMDAwMDAxMDE4ODg3/resident-evil-requiem-key-art.jpg')`;
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
