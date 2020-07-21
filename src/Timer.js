import React, { useState, useEffect } from "react";

import { useInterval, formatTimeFromMS } from "./Tools";

//Default values for timer
const stepMS = 103;
const startMS = 30000;
const dangerMS = 5000;
const bottomMS = -1700;

//Default values for blinker
const blinkStepMS = 70;

export default function Timer(props) {
  const [countMS, setCountMS] = useState(startMS);
  const [totalCounted, setTotalCounted] = useState(startMS);

  const [doBlink, setDoBlink] = useState(false);
  const [snoozeBlinks, setSnoozeBlinks] = useState(false); //used for extra blinks at snooze

  //Timer
  useInterval(() => {
    if (props.isTimerRunning) {
      if (countMS > bottomMS) {
        setCountMS(countMS - stepMS);
      } else {
        props.onExplode();
      }
    }
  }, stepMS);

  //(Re)start
  useEffect(() => {
    if (props.isTimerRunning) {
      setCountMS(startMS);
      setTotalCounted(startMS);
    }
  }, [props.isTimerRunning]);

  //Snooze
  useEffect(() => {
    if (props.snoozeValMS) {
      let c = countMS + props.snoozeValMS;
      if (c >= 60 * 60 * 1000) c = 60 * 60 * 1000 - 1; //60 minutes is enough :)
      setCountMS(c);
      setTotalCounted(c);
      setSnoozeBlinks(10);
    }
  }, [props.snoozeValMS, props.timesSnoozed]);

  //Blinker (when time reaches danger)
  useInterval(() => {
    let nextBlink = false;
    if (
      (countMS < dangerMS && countMS % 1000 > 700) ||
      (countMS <= 0 && countMS > bottomMS)
    ) {
      nextBlink = !doBlink;
    }
    if (snoozeBlinks) {
      nextBlink = !doBlink;
      setSnoozeBlinks(snoozeBlinks - 1);
    }
    if (nextBlink !== doBlink) setDoBlink(nextBlink);
  }, blinkStepMS);

  let progress = Math.round((countMS / totalCounted) * 100);
  if (progress < 0) progress = 0;
  if (progress > 100) progress = 100;

  return (
    <div className="timerContainer">
      <div className="timer">
        <div className={"clock" + (countMS < dangerMS ? " clockdanger" : "")}>
          {formatTimeFromMS(countMS)}
        </div>
        <div className={"blinker" + (doBlink ? " blink" : "")}>&nbsp;</div>
      </div>
      <div className="progressBar">
        <div className="progress" style={{ width: progress + "%" }}></div>
      </div>
    </div>
  );
}
