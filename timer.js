let setTimeForm = document.querySelector("#set-time-form");
let inputElements = document.querySelectorAll("#set-time-form div input");
let timeDiv = document.querySelector('.time');

let cancelButton;
let pauseButton;
let runningTimer;

let pauseTimer = false;
let timeInterval;
let stoppingTime = new Date();
stoppingTime.setHours(0);
stoppingTime.setMinutes(0);
stoppingTime.setSeconds(0);

let time = new Date();
setTime(0, 0, 0);
handleFormSubmission();


function handleFormSubmission() {
    setTimeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let hours = event.target.hours.value;
        let minutes = event.target.minutes.value;
        let seconds = event.target.seconds.value;
        if (hours == 0 && minutes == 0 && seconds == 0) return;

        insertTimer(hours, minutes, seconds);
        setTime(hours, minutes, seconds);

        runningTimer = document.querySelector(".time-of-running-timer");
        cancelButton = document.querySelector("#cancel-timer");
        cancelButton.addEventListener("click", (event) => {
            resetEverything();
        })

        pauseButton = document.getElementById("pause-timer");
        pauseButton.addEventListener("click", (event) => {
            pauseTimer = pauseTimer ? false : true;
            pauseButton.innerHTML = pauseButton.innerHTML == "Pause" ? "Play" : "Pause";
        });


        timeInterval = setInterval(() => {
            if (pauseTimer) return;
            time.setSeconds(time.getSeconds() - 1);
            updateTime(time.getHours(), time.getMinutes(), time.getSeconds());
            if (time.getTime() <= stoppingTime.getTime()) {
                stopTime();
                setTimeout(() => {
                    resetEverything();
                }, 10000)
            }
        }, 1000)
    }
    )
}


inputElements.forEach((inputElement) => {
    inputElement.addEventListener('change', (event) => {
        event.target.value = addZeroes(event.target.value);
    });
});

function addZeroes(number) {
    number = String(number).length == 1 ? `0${number}` : number;
    return number;
}

function setTime(hours, minutes, seconds) {
    time.setHours(hours);
    time.setSeconds(seconds);
    time.setMinutes(minutes);
}

function updateTime(hours, minutes, seconds) {
    runningTimer.innerHTML = `
        <p>
            ${addZeroes(hours)}:${addZeroes(minutes)}:${addZeroes(seconds)}
        </p>
    `
}

function insertTimer(hours, minutes, seconds) {
    timeDiv.innerHTML = `
    <div class="running-timer">
        <div class="time-of-running-timer">
            <p>
                ${addZeroes(hours)}:${addZeroes(minutes)}:${addZeroes(seconds)}
            </p>
        </div>
        <div>
            <button id="pause-timer">Pause</button>
            <button id="cancel-timer">Cancel</button>
        </div>
    </div>
    `
}

function stopTime() {
    clearInterval(timeInterval);
    updateTime(0, 0, 0);
    setTime(0, 0, 0);
}

function resetEverything() {
    timeDiv.innerHTML = `
    <div class="time">
        <form action="" id="set-time-form">
            <div>
                <label for="hours">Hours:</label>
                <input type="number" min="0" value="00" max="23" name="hours" id="hours">
                <label for="minutes">Minutes:</label>
                <input type="number" min="0" value="00" max="59" name="minutes" id="minutes">
                <label for="seconds">Seconds:</label>
                <input type="number" min="0" value="00" max="59" name="seconds" id="seconds">
            </div>
            <button type="submit" id="set-time">start</button>
        </form>
    </div>
    `;
    setTime(0, 0, 0);
    pauseTimer = false;
    setTimeForm = document.querySelector("#set-time-form");
    inputElements = document.querySelectorAll("#set-time-form div input");
    timeDiv = document.querySelector('.time');
    handleFormSubmission();
    clearInterval(timeInterval);
    inputElements.forEach((inputElement) => {
        inputElement.addEventListener('change', (event) => {
            event.target.value = addZeroes(event.target.value);
        });
    });
}