import "./TimeFull.scss";

interface Time {
  hrs: number;
  min: number;
  sec: number;
  dec: number;
}

import { useEffect, useState } from "react";

export const TimeFull = () => {
  const [timeFull, setTimeFull] = useState<Time>({
    hrs: 0,
    min: 0,
    sec: 0,
    dec: 0,
  });

  const timeStep = (prev: Time) => {
    const step = { ...prev };

    if (step.dec < 9) {
      step.dec = step.dec + 1;
    } else {
      if (step.sec < 59) {
        step.sec = step.sec + 1;
        step.dec = 0;
      } else {
        if (step.min < 59) {
          step.min = step.min + 1;
          step.sec = step.dec = 0;
        } else {
          step.hrs = step.hrs + 1;
          step.min = step.sec = step.dec = 0;
        }
      }
    }
    return step;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeFull((prev) => timeStep(prev));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const twoDigits = (value: number): string =>
    value < 10 ? "0" + value : "" + value;

  return (
    <div className="time-full">
      <span>{twoDigits(timeFull.hrs)}</span>:
      <span>{twoDigits(timeFull.min)}</span>:
      <span>{twoDigits(timeFull.sec)}</span>:<span>{timeFull.dec}</span>
    </div>
  );
};
