// script.js

let startTime = 0;
let updatedTime = 0;
let running = false;
let interval;
let lapCount = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapTimes = document.getElementById('lapTimes');

function startStopwatch() {
    if (!running) {
        running = true;
        startTime = Date.now() - updatedTime;
        interval = setInterval(updateTime, 10);
        startStopButton.textContent = 'Pause';
    } else {
        running = false;
        clearInterval(interval);
        startStopButton.textContent = 'Resume';
    }
}

function updateTime() {
    updatedTime = Date.now() - startTime;
    let time = new Date(updatedTime);

    let hours = time.getUTCHours();
    let minutes = time.getUTCMinutes();
    let seconds = time.getUTCSeconds();
    let milliseconds = time.getMilliseconds();

    // Format: HH:MM:SS:MS
    display.textContent = formatTime(hours, minutes, seconds, milliseconds);
}

function formatTime(hours, minutes, seconds, milliseconds) {
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${padZeroMilliseconds(milliseconds)}`;
}

function padZero(num) {
    return num < 10 ? '0' + num : num;
}

function padZeroMilliseconds(ms) {
    return ms < 100 ? '0' + ms : ms;
}

function resetStopwatch() {
    clearInterval(interval);
    running = false;
    startStopButton.textContent = 'Start';
    display.textContent = '00:00:00:00';
    updatedTime = 0;
    lapCount = 0;
    lapTimes.innerHTML = '';
}

function recordLap() {
    if (running) {
        lapCount++;
        let time = new Date(updatedTime);
        let hours = time.getUTCHours();
        let minutes = time.getUTCMinutes();
        let seconds = time.getUTCSeconds();
        let milliseconds = time.getMilliseconds();
        let lapTime = formatTime(hours, minutes, seconds, milliseconds);

        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapTimes.appendChild(lapItem);
    }
}

startStopButton.addEventListener('click', startStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
