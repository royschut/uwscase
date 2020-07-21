import { useEffect, useRef } from "react";
/*
 *
 * Tool functions
 *
 */
export const useInterval = (callback, step) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (step !== null) {
      let id = setInterval(tick, step);
      return () => clearInterval(id);
    }
  }, [step]);
};
export const formatTimeFromMS = (val) => {
  if (val < 0) val = 0;
  return new Date(val).toISOString().slice(14, -2).replace(".", ":");
};
