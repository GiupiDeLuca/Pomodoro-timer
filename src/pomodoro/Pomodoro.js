import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import {secondsToDuration} from "../utils/duration/index";
import {checkBreakTime, checkFocusTime} from "./TimeLimits"
import TimeBar from "./TimeBar";

function playSound() {
  new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play()
}

function Pomodoro() {


  const [timePassed, setTimePassed] = useState(0);

  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [breakTime, setBreakTime] = useState(5)

  const [focusTime, setFocusTime] = useState(5)

  

  useInterval(
    () => {
      setTimePassed(timePassed + 1)
      // ToDo: Implement what should happen when the timer is running
      if (timePassed === focusTime) {
        playSound()
      } else if (timePassed === (focusTime + breakTime)) {
        playSound()
        setIsTimerRunning(true)
        setFocusTime(focusTime)
        setBreakTime(breakTime)
        setTimePassed(0)
        
      } 

      
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  }

  function resetSession() {
    setIsTimerRunning(false);
    setFocusTime(1500);
    setBreakTime(300)
    setTimePassed(0)
  };

  function breakOneUp() {
    setBreakTime(checkBreakTime(breakTime + 60))
  };

  function breakOneDown() {
    setBreakTime(checkBreakTime(breakTime - 60))
  }

  function focusOneUp() {
    setFocusTime(checkFocusTime(focusTime + 300))
  }

  function focusOneDown() {
    setFocusTime(checkFocusTime(focusTime - 300))
  }

  
  
  return (
    <div className="pomodoro">
      <div className="row">
        <div 
        className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              {`Focus Duration: ${secondsToDuration(focusTime)}`}
              {/* Focus Duration: 25:00 */}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={focusOneDown}
                disabled={isTimerRunning}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={focusOneUp}
                disabled={isTimerRunning}
                
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                {`Break Duration: ${secondsToDuration(breakTime)}`}
                {/* Break Duration: 05:00 */}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={breakOneDown}
                  disabled={isTimerRunning}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={breakOneUp}
                  disabled={isTimerRunning}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={resetSession}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <TimeBar timePassed={timePassed} isTimerRunning={isTimerRunning} focusTime={focusTime} breakTime={breakTime}/>
      </div>
    </div>
  );
}

export default Pomodoro;
