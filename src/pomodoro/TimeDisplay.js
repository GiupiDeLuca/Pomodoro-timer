import React from "react";
import { secondsToDuration } from "../utils/duration/index";
import classNames from "../utils/class-names";



export default function TimeDisplay(props) {

    const { timePassed, focusTime, breakTime, isTimerRunning } = props;


  return (
    <div className="row mb-2">
      <div
        className={classNames({
          col: true,
          invisible: timePassed === 0,
        })}
      >
        {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
        <h2 data-testid="session-title">
          {timePassed < focusTime
            ? `Focusing for ${secondsToDuration(focusTime)} minutes`
            : `On Break for ${secondsToDuration(breakTime)} minutes`}
        </h2>
        {/* TODO: Update message below to include time remaining in the current session */}
        <p className="lead" data-testid="session-sub-title">
          {`${
            timePassed < focusTime
              ? secondsToDuration(focusTime - timePassed)
              : secondsToDuration(breakTime - (timePassed - focusTime))
          } remaining`}

          {/* 25:00 remaining */}
          <h3>{!isTimerRunning && timePassed < 1500 ? "Paused" : null}</h3>
        </p>
      </div>
    </div>
  );
}
