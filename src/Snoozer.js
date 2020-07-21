import React, { useState, useEffect } from "react";

const initCountInput = "seconds...";

export default function Snoozer(props) {
  let [countInput, setCountInput] = useState(initCountInput);
  let [countMS, setCountMS] = useState(-1);
  let [error, setError] = useState("");

  useEffect(() => {
    return () => setCountInput(initCountInput);
  }, []);

  const checkInput = (e) => {
    const inp = e.target.value;
    setCountInput(inp);
    if (isNaN(inp)) {
      setError("Can only count numbers!");
    } else {
      setError("");
      setCountMS(Number(inp) * 1000);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (countMS > 0 && !error) {
      props.onSnooze(countMS);
      setCountInput(initCountInput);
    }
  };
  return (
    <div className="snoozer">
      <h1>{props.title}</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          value={countInput}
          onFocus={(e) => {
            if (e.target.value === initCountInput) setCountInput("");
            e.target.select();
          }}
          onBlur={(e) => checkInput(e)}
          onChange={(e) => checkInput(e)}
        />
        {countInput && countInput !== initCountInput && !error && (
          <button
            type="submit"
            className="snoozeBtn"
            onClick={(e) => onSubmit(e)}
          >
            Snooze
          </button>
        )}
      </form>
      <p>{error}</p>
    </div>
  );
}
