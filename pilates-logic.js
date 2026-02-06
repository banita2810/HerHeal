let totalPilatesSeconds = parseInt(localStorage.getItem('pilatesProgress')) || 0;
let activeInterval = null;

window.onload = () => {
    updatePlantVisual(totalPilatesSeconds);
};

function toggleTimer(id) {
    const button = event.target;
    const display = document.getElementById(`time-${id}`);

    if (activeInterval && button.innerText === "Stop") {
        clearInterval(activeInterval);
        activeInterval = null;
        button.innerText = "Start";
        button.style.background = "#333";
    } 
    else if (!activeInterval) {
        button.innerText = "Stop";
        button.style.background = "#ff7675"; // Coral color for Pilates

        activeInterval = setInterval(() => {
            totalPilatesSeconds++;
            localStorage.setItem('pilatesProgress', totalPilatesSeconds);

            let mins = Math.floor(totalPilatesSeconds / 60).toString().padStart(2, '0');
            let secs = (totalPilatesSeconds % 60).toString().padStart(2, '0');
            display.innerText = `${mins}:${secs}`;

            updatePlantVisual(totalPilatesSeconds);
        }, 1000);
    }
}

function endSession(id) {
    if (activeInterval) {
        clearInterval(activeInterval);
        activeInterval = null;
    }
    totalPilatesSeconds = 0;
    localStorage.removeItem('pilatesProgress');

    document.querySelectorAll('.timer-display-small').forEach(d => d.innerText = "00:00");
    document.querySelectorAll('.btn-start-timer').forEach(b => {
        b.innerText = "Start";
        b.style.background = "#333";
    });
    updatePlantVisual(0);
}

function updatePlantVisual(seconds) {
    const visual = document.getElementById('plant-visual');
    const status = document.getElementById('growth-status');

    if (seconds === 0) {
        visual.innerHTML = "<span>🫙</span>";
        status.innerText = "Ready to build strength?";
    } else if (seconds < 60) {
        visual.innerHTML = "<span>🌱</span>";
        status.innerText = "Roots are forming...";
    } else if (seconds < 180) {
        visual.innerHTML = "<span>🌺</span>"; // Hibiscus for Pilates
        status.innerText = "Strength is blooming!";
    } else {
        visual.innerHTML = "<span class='bloom'>✨🌺✨</span>";
        status.innerText = "Powerful! Session Complete.";
    }
}