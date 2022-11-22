// Variables for button
const playPauseBtn = document.querySelector("#playPauseBtn");
const resetBtn = document.querySelector("#resetBtn");

// Variables for time values
let seconds = 0;
let minutes = 0;
let hours = 0;

// Variables for leading zero
let leadingSeconds = 0;
let leadingMinutes = 0;
let leadingHours = 0;

// Variables for set interval & timerstatus
let timerInterval = null;
let timerStatus = "stopped";

let displayTimer = document.getElementById("timer"),
  togglePlayResume = document.getElementById("playPauseBtn");

// laps
let laps = [];

// stopwatch function
function stopWatch() {
  // continually increment seconds as long as this function is called
  seconds++;
  // increment minutes by 1 if seconds counts to 60
  if (seconds / 60 === 1) {
    seconds = 0;
    minutes++;

    // increment hours by 1 if minutes counts to 60
    if (minutes / 60 === 1) {
      minutes = 0;
      hours++;
    }
  }

  // add leading zeros if value of seconds, minutes or hours is less than 10
  leadingSeconds = seconds < 10 ? "0" + seconds.toString() : seconds;
  leadingMinutes = minutes < 10 ? "0" + minutes.toString() : minutes;
  leadingHours = hours < 10 ? "0" + hours.toString() : hours;

  // render stopwatch value to the DOM
  displayTimer.innerText =
    leadingHours + ":" + leadingMinutes + ":" + leadingSeconds;
}

// play and pause button even listener and handler
playPauseBtn.addEventListener("click", function () {
  if (timerStatus === "stopped") {
    timerInterval = window.setInterval(stopWatch, 1000);
    togglePlayResume.innerHTML = '<i class="fa-solid fa-pause" id="pause"></i>';
    timerStatus = "started";
  } else {
    window.clearInterval(timerInterval);
    togglePlayResume.innerHTML = '<i class="fa-solid fa-play" id="play"></i>';
    timerStatus = "stopped";
  }
});

// reset button event listener and handler
resetBtn.addEventListener("click", function () {
  window.clearInterval(timerInterval);
  seconds = 0;
  minutes = 0;
  hours = 0;

  window.clearInterval(timerInterval);
  togglePlayResume.innerHTML = '<i class="fa-solid fa-play" id="play"></i>';
  timerStatus = "stopped";

  // reset timer
  document.getElementById("timer").innerHTML = "00:00:00";
  // clear laps
  laps = [];
  dispayLaps(laps);
});

// lap button event listener and handler
lapBtn.addEventListener("click", function () {
  const curTime = displayTimer.innerText;
  laps.push(curTime);
  dispayLaps(laps);
});

// function to loop and display lap content
function dispayLaps(data) {
  let lapContent = ``;
  data.reverse().forEach((item, index) => {
    lapContent += `<div class="lap-item">
        <p>Lap ${data.length - index}</p>
        <p>${item}</p>
      </div>`;
  });
  document.getElementById("laps").innerHTML = lapContent;
}
