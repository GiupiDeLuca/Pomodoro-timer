import React from "react";
import classNames from "../utils/class-names";

export default function TimeBar(props) {
  const { timePassed, focusTime, breakTime } = props;

  const barWidth =
    timePassed <= focusTime
      ? (timePassed / focusTime) * 100
      : ((timePassed - focusTime) / breakTime) * 100;

  const barColorClass = timePassed <= focusTime ? "bg-primary" : "bg-success";

  return (
    
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

  );
}
