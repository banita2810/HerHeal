// move to dashboard

document.getElementById('loginForm')?.addEventListener('submit',function(e){
    e.preventDefault();

    const btn =e.target.querySelector('.enter-btn');
    btn.innerText = "Entering...";
    btn.style.opacity = "0.7";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 800);
});


//dashboard

const quotes = [
    "Your body is your sanctuary; listen to its rhythm today.",
    "Be gentle with yourself; you are healing.",
    "Balance is not something you find, it's something you create.",
    "Hydration is the first step to a glowing day.",
    "Rest is a productive activity.",
    "Flow with your cycle, not against it.",
    "Every phase has a purpose; honor where you are today.",
    "Nourish your body to replenish your energy.",
    "Self-care is how you take your power back.",
    "Listen to your body's natural needs and take time to rejuvenate.",
    "Practice self-compassion; you're doing amazing.",
    "Your health, your comfort, your empowerment — that's the priority."
];


// Function to initialize the dashboard

function initDashboard(){
    const quoteElement = document.getElementById('dailyQuote');
    if(quoteElement){
        const randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
        quoteElement.innerText =`"${randomQuote}"`;
    }
    const circle = document.getElementById('stepCircle');
    if(circle){
        const percent = (5420/8000) *100;
        const circumference = 2*Math.PI*50;
        const offset = circumference-(percent/100 *circumference);
        circle.style.strokeDashoffset=offset;
    }
}

window.addEventListener('DOMContentLoaded', initDashboard);


// Kitchen

const pcosSwaps = {
    "donut":{
       alt: "Sourdough toast + Almond butter + Cinnamon",
        why: "Sourdough is lower GI; Cinnamon improves insulin sensitivity." 
    },
    "pizza": {
        alt: "Chickpea or Cauliflower crust pizza",
        why: "Fiber-rich crust prevents the insulin spike that triggers acne."
    },
    "coffee": {
        alt: "Spearmint Tea",
        why: "Spearmint tea lowers excess androgens (helps with unwanted hair)."
    },
    "ice cream": {
        alt: "Greek yogurt + Berries + Walnuts",
        why: "Protein and healthy fats 'anchor' the sugar to prevent a crash."
    },
    "white rice": {
        alt: "Quinoa or Cauliflower rice",
        why: "Slow-releasing carbs keep energy steady."
    },
    "chips": {
        alt: "Roasted Chickpeas or Seaweed snacks",
        why: "Provides that salty crunch without the inflammatory seed oils and blood sugar spike."
    },
    "fries": {
        alt: "Baked Sweet Potato wedges",
        why: "Sweet potatoes contain Vitamin A and fiber, which help the liver process excess hormones."
    },
    "burger": {
        alt: "Grass-fed beef or Turkey burger (no bun or lettuce wrap)",
        why: "Red meat provides much-needed Iron during your bleed, while skipping the bun prevents a sugar crash."
    },
    "candy": {
        alt: "Frozen Grapes or Dates with a bit of Sea Salt",
        why: "Dates are high in fiber and magnesium; freezing grapes makes them take longer to eat, satisfying the 'hand-to-mouth' habit."
    },
    "bread": {
        alt: "Sprouted grain bread or Rye",
        why: "Sprouted grains are lower in gluten and higher in nutrients, making them easier on PCOS digestion."
    },
    "pancakes": {
        alt: "Oat and Banana pancakes",
        why: "Oats provide 'Beta-Glucan' fiber which stabilizes mood swings and keeps you full."
    }
};

function askMentor(){
    const inputField = document.getElementById('craving-input');
    const input = inputField.value.toLowerCase().trim();
    const responseArea = document.getElementById('mentor-response');

    if(!input) return;

    const data = pcosSwaps[input];

    if(data) {
        responseArea.innerHTML = `
            <div class="mentor-bubble">
                <p><strong>Try:</strong> ${data.alt}</p>
                <p class="logic-text"><strong>Mentor Logic:</strong> ${data.why}</p>
            </div>
        `;
    }else{
        responseArea.innerHTML = `
            <div class="mentor-bubble">
                <p class="logic-text"><strong>Mentor Tip:</strong> Eat your greens first! Putting a "fiber buffer" in your stomach slows down sugar absorption from whatever you crave next.</p>
            </div>
        `;
    }
    inputField.value="";
}

// Flow Calender Logic

let currentDisplayDate = new Date();
let loggedPeriods = JSON.parse(localStorage.getItem('loggedPeriods')) || [];

function initCalendar(){
    const grid = document.getElementById('calendar-grid');
    if(!grid) return;

    grid.innerHTML="";
    const month = currentDisplayDate.getMonth();
    const year = currentDisplayDate.getFullYear();

    document.getElementById('month-display').innerText = 
        new Intl.DateTimeFormat('en-US', 
            { month: 'long', year: 'numeric' }).format(currentDisplayDate);

    const firstDay = new Date(year, month,1). getDay();
    const daysInMonth = new Date(year,month+1,0).getDate();

    for(let i=0; i<firstDay; i++){
        const emptyDiv = document.createElement('div');
        grid.appendChild(emptyDiv);
    }

    // Generate days
    for(let day=1; day<= daysInMonth; day++){
        const dateStr = `${year}-${month + 1}-${day}`;
        const isLogged = loggedPeriods.includes(dateStr);
        const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
        
        const dayEl = document.createElement('div');
        dayEl.className = `calendar-day ${isLogged ? 'period-logged' : ''} ${isToday ? 'today' : ''}`;
        dayEl.innerText = day;
        dayEl.onclick = () => togglePeriod(dateStr);
        grid.appendChild(dayEl);
    }
}

function togglePeriod(date) {
    if(loggedPeriods.includes(date)){
        loggedPeriods = loggedPeriods.filter(d => d !== date);
    } else {
        loggedPeriods.push(date);
    }

    localStorage.setItem('loggedPeriods', JSON.stringify(loggedPeriods));
    initCalendar();

    updateHomePhase();

    const suggestionBox = document.getElementById('mood-suggestion');
    suggestionBox.innerHTML = '<strong>Period Logged!</strong> Your Home dashboard has been updated.';
    suggestionBox.classList.add('active');
}

function changeMonth(offset){
    currentDisplayDate.setMonth(currentDisplayDate.getMonth() + offset);
    initCalendar();
}

const moodActions = {
    "Crampy": "Rest is productive! Try the 'Butterfly Pose' in the Studio to ease pelvic tension.",
    "Low Energy": "Listen to your body. Today is a great day for a slow walk or some gentle stretching.",
    "Happy": "You're glowing! This is a great time for a more intense Yoga flow or trying a new complex recipe.",
    "Anxious": "Hormones can be heavy. Sip some warm Spearmint tea and try 5 minutes of deep belly breathing."
};

function logMood(mood) {
    const suggestionBox = document.getElementById('mood-suggestion');

    suggestionBox.classList.remove('active');
    
    setTimeout(() => {
        suggestionBox.innerHTML = `<strong>Period Power Tip:</strong> ${moodActions[mood]}`;
        suggestionBox.classList.add('active');
    }, 10);
}

// Call init on load
if (document.getElementById('calendar-grid')) {
    initCalendar();
}

function updateHomePhase() {
    if (loggedPeriods.length === 0) return;

    // 1. Sort dates to find the latest one
    const sortedDates = [...loggedPeriods].sort((a, b) => new Date(b) - new Date(a));
    const lastPeriodDate = new Date(sortedDates[0]);
    const today = new Date();

    // 2. Calculate difference in days
    const diffTime = Math.abs(today - lastPeriodDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // 3. Determine Phase (PCOS standard ranges)
    let phase = "";
    let desc = "";

    if (diffDays <= 5) {
        phase = "Menstrual";
        desc = "Your hormones are at their lowest. Rest and hydrate.";
    } else if (diffDays <= 13) {
        phase = "Follicular";
        desc = "Energy is rising. Great time for new projects!";
    } else if (diffDays <= 16) {
        phase = "Ovulatory";
        desc = "Estrogen peaks. You are at your most social and vibrant.";
    } else {
        phase = "Luteal";
        desc = "PMS might kick in. Focus on slow movement and clean eating.";
    }

    // 4. Save to localStorage so Home Page can read it
    const cycleData = { phase, desc, day: diffDays };
    localStorage.setItem('userCycleData', JSON.stringify(cycleData));
}

function loadHomePhase() {
    const phaseBadge = document.querySelector('.phase-badge');
    const phaseDesc = document.querySelector('.phase-desc');

    const data = JSON.parse(localStorage.getItem('userCycleData'));

    if (data) {
        // User has data - Show their specific phase in a PILL
        phaseBadge.innerText = data.phase;
        phaseDesc.innerText = data.desc;
        phaseBadge.className = `phase-badge phase-${data.phase.toLowerCase()}`;
        phaseBadge.style.display = "inline-block";
    } else {
        // NEW USER - Show a welcome state
        phaseBadge.innerText = "Setup Required";
        phaseBadge.style.background = "#ddd"; // Neutral gray pill
        phaseDesc.innerHTML = "Tap <strong>Flow</strong> to log your last period and see your phase!";
    }
}

// Run this when the Home Page loads
window.onload = loadHomePhase;

function updateCountdown() {
    const countdownEl = document.querySelector('.days-left-count'); // Add this class in HTML
    if (!countdownEl || loggedPeriods.length === 0) return;

    const sortedDates = [...loggedPeriods].sort((a, b) => new Date(b) - new Date(a));
    const lastDate = new Date(sortedDates[0]);
    
    // Average PCOS cycle is often longer, let's assume 30 days
    const nextPeriod = new Date(lastDate);
    nextPeriod.setDate(lastDate.getDate() + 30); 

    const today = new Date();
    const timeLeft = nextPeriod - today;
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

    countdownEl.innerText = daysLeft > 0 ? `${daysLeft} Days Left` : "Period Expected";
}

// Period starts today

function logPeriodToday(){
    const today =new Date();

    const dateStr =`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    togglePeriod(dateStr);
}