import React from "react";
import { secondsToDuration } from "../utils/duration/index";
import classNames from "../utils/class-names";

export default function TimeBar(props) {
  const { timePassed, focusTime, breakTime, isTimerRunning } = props;

  const barWidth =
    timePassed <= focusTime
      ? (timePassed / focusTime) * 100
      : ((timePassed - focusTime) / breakTime) * 100;

  const barColorClass = timePassed <= focusTime ? "bg-primary" : "bg-success";

  return (
    <div>
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
      <div className="row mb-2">
        <div
          className={classNames({
            col: true,
            invisible: timePassed === 0,
          })}
        >
          <div className="progress" style={{ height: "20px" }}>
            <div
              className={classNames({
                "progress-bar": true,
                [barColorClass]: true,
              })}
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={barWidth} // TODO: Increase aria-valuenow as elapsed time increases
              style={{ width: `${barWidth}%` }} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  );
}
