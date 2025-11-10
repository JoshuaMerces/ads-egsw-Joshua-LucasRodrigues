const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");

const WORK_TIME = 1500; 
const BREAK_TIME = 300; 
let timeLeft = WORK_TIME; 
let interval;
let workTimer = true;

const updateTimer = () => {
    const minutes = Math.floor(timeLeft/60);
    const seconds = timeLeft % 60;

    timer.innerHTML = 
    `${minutes.toString().padStart(2,"0")}
    :
    ${seconds.toString().padStart(2,"0")}`;
};

const alarm = new Audio('audio/alarm.mp3');
alarm.volume = 0.2;

const startTimer = () => {
      if (interval) {
            clearInterval(interval); 
      }

      interval = setInterval(() => {
            timeLeft--;
            updateTimer();

            if (timeLeft === 0) {
                  clearInterval(interval);

                  if (workTimer) {
                        alarm.play();
                        workTimer = false;
                        timeLeft = BREAK_TIME; 
                        updateTimer();
                        startTimer();
                  } else {
                        alarm.play();
                        workTimer = true;
                        timeLeft = WORK_TIME; 
                        updateTimer();
                  }
            }
      }, 1000);
};

const stopTimer = () => clearInterval(interval);

const resetTimer = () => {
    clearInterval(interval);
    workTimer = true; 
    timeLeft = WORK_TIME; 
    updateTimer();
};

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);