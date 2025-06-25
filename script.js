document.addEventListener('DOMContentLoaded', () => {
    const detailsButton = document.querySelector('.details-button');
    const safetyButton = document.querySelector('.safety-button');

    detailsButton.addEventListener('click', () => {
        alert("Dies würde normalerweise weitere Details zur Sicherheitswarnung anzeigen.");
    });

    safetyButton.addEventListener('click', () => {
        // Get maximum screen dimensions
        const screenWidth = window.screen.availWidth;
        const screenHeight = window.screen.availHeight;
        
        // Open the main virus alert page in maximum window size
        const mainWindow = window.open(
            'virus-alert.html', 
            '_blank', 
            `width=${screenWidth},height=${screenHeight},left=0,top=0,resizable=yes,scrollbars=yes,fullscreen=yes`
        );

        // Start creating 3 popup windows every 2 seconds for 1 minute
        let runCount = 0;
        const maxRuns = 30; // 30 runs * 2 seconds = 60 seconds (1 minute)
        const popupsPerInterval = 3;
        
        const popupInterval = setInterval(() => {
            if (runCount >= maxRuns) {
                clearInterval(popupInterval);
                return;
            }

            // Create three popup windows per interval
            for (let i = 0; i < popupsPerInterval; i++) {
                window.open(
                    'virus-alert.html', 
                    `popup_${runCount}_${i}`, 
                    `width=${screenWidth},height=${screenHeight},left=${Math.random() * 100},top=${Math.random() * 100},resizable=yes,scrollbars=yes`
                );
            }

            runCount++;
        }, 2000); // Every 2000ms (2 seconds)
    });
}); 