let totalMedSeconds = parseInt(localStorage.getItem('meditationProgress')) || 0;
let activeInterval = null;

// Load the state on start
window.onload = () => {
    updatePlantVisual(totalMedSeconds);
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
        button.style.background = "#8e6ee0"; // Purple for meditation

        activeInterval = setInterval(() => {
            totalMedSeconds++;
            localStorage.setItem('meditationProgress', totalMedSeconds);

            let mins = Math.floor(totalMedSeconds / 60).toString().padStart(2, '0');
            let secs = (totalMedSeconds % 60).toString().padStart(2, '0');
            display.innerText = `${mins}:${secs}`;

            updatePlantVisual(totalMedSeconds);
        }, 1000);
    }
}

function endSession(id) {
    // 1. Kill the clock
    if (activeInterval) {
        clearInterval(activeInterval);
        activeInterval = null;
    }

    // 2. Reset data
    totalMedSeconds = 0;
    localStorage.removeItem('meditationProgress');

    // 3. Reset UI
    document.querySelectorAll('.timer-display-small').forEach(d => d.innerText = "00:00");
    document.querySelectorAll('.btn-start-timer').forEach(b => {
        b.innerText = "Start";
        b.style.background = "#333";
    });

    // 4. Reset Plant
    updatePlantVisual(0);
}

function updatePlantVisual(seconds) {
    const visual = document.getElementById('plant-visual');
    const status = document.getElementById('growth-status');

    if (seconds === 0) {
        visual.innerHTML = "<span>🫙</span>";
        status.innerText = "Start your calm journey";
    } else if (seconds < 60) {
        visual.innerHTML = "<span>🌱</span>";
        status.innerText = "Peace is sprouting...";
    } else if (seconds < 100) {
        visual.innerHTML = "<span>🌻</span>"; // Sunflower for Meditation
        status.innerText = "Mindfulness is blooming!";
    } else {
        visual.innerHTML = "<span class='bloom'>✨🌻✨</span>";
        status.innerText = "Zen achieved.";
    }
}