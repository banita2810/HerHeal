let totalCardioSeconds = parseInt(localStorage.getItem('cardioProgress')) || 0;
let activeInterval = null;

window.onload = () => {
    updatePlantVisual(totalCardioSeconds);
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
        button.style.background = "#ff4757"; // Energetic red for Cardio

        activeInterval = setInterval(() => {
            totalCardioSeconds++;
            localStorage.setItem('cardioProgress', totalCardioSeconds);

            let mins = Math.floor(totalCardioSeconds / 60).toString().padStart(2, '0');
            let secs = (totalCardioSeconds % 60).toString().padStart(2, '0');
            display.innerText = `${mins}:${secs}`;

            updatePlantVisual(totalCardioSeconds);
        }, 1000);
    }
}

function endSession(id) {
    if (activeInterval) {
        clearInterval(activeInterval);
        activeInterval = null;
    }
    totalCardioSeconds = 0;
    localStorage.removeItem('cardioProgress');

    document.querySelectorAll('.timer-display-small').forEach(d => d.innerText = "00:00");
    document.querySelectorAll('.btn-start-timer').forEach(b => {
        btnReset(b);
    });
    updatePlantVisual(0);
}

function btnReset(btn) {
    btn.innerText = "Start";
    btn.style.background = "#333";
}

function updatePlantVisual(seconds) {
    const visual = document.getElementById('plant-visual');
    const status = document.getElementById('growth-status');

    if (seconds === 0) {
        visual.innerHTML = "<span>🫙</span>";
        status.innerText = "Start your engine!";
    } else if (seconds < 60) {
        visual.innerHTML = "<span>🌱</span>";
        status.innerText = "Heating up...";
    } else if (seconds < 180) {
        visual.innerHTML = "<span>🌹</span>"; // Rose for Cardio
        status.innerText = "Vitality is in full bloom!";
    } else {
        visual.innerHTML = "<span class='bloom'>🔥🌹🔥</span>";
        status.innerText = "Incredible energy!";
    }
}