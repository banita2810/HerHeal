
//yoga timer
let totalYogaSeconds =parseInt(localStorage.getItem('yogaProgress')) || 0;
let activeInterval=null;

window.onload =()=>{
    updatePlantVisual(totalYogaSeconds);
};


function toggleTimer(id){
    const button = event.target;
    const display = document.getElementById(`time-${id}`);

    if(activeInterval && button.innerText === "Stop"){
        clearInterval(activeInterval);
        activeInterval =null;
        button.innerText="Start";

    }
    else if (!activeInterval){
        button.innerText="Stop";
        button.style.background="#a05d5d";

        activeInterval=setInterval(()=>{
            totalYogaSeconds++;

            localStorage.setItem('yogaProgress',totalYogaSeconds);


            let mins=Math.floor(totalYogaSeconds/60).toString().padStart(2,'0');
            let secs = (totalYogaSeconds%60).toString().padStart(2,'0');
            display.innerText=`${mins}:${secs}`;

            updatePlantVisual(totalYogaSeconds);
        },1000);
    }
}

function updatePlantVisual(seconds) {
    const visual = document.getElementById('plant-visual');
    const status = document.getElementById('growth-status');

    if (seconds === 0) {
        visual.innerHTML = "<span>🫙</span>"; // Empty Pot
        status.innerText = "Plant a seed by starting a pose";
    } else if (seconds < 60) {
        visual.innerHTML = "<span>🌱</span>"; // Sprout
        status.innerText = "Look! It's sprouting!";
    } else if (seconds < 120) {
        visual.innerHTML = "<span>🌿</span>"; // Growing
        status.innerText = "Your Lotus is getting stronger...";
    } else {
        visual.innerHTML = "<span class='bloom'>🪷</span>"; // FULL BLOOM
        status.innerText = "Beautiful! A Lotus has bloomed.";
        // Trigger the 'Add to Garden' logic here later
    }
}

// end session
function endSession(id){

    if(activeInterval){
        clearInterval(activeInterval);
        activeInterval=null;
    }
    totalYogaSeconds=0;

    localStorage.removeItem('yogaProgress');

    const allDisplays = document.querySelectorAll('.timer-display-small');
    allDisplays.forEach(display=>display.innerText="00:00");

    const allStartButtons = document.querySelectorAll('.btn-start-timer');

    allStartButtons.forEach(btn=>{
        btn.innerText="Start";
        btn.style.backgroundColor = ""; 
        btn.style.color = "";

    });

    updatePlantVisual(0);
   

}

