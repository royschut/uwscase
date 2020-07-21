import React from "react";

export default function TestResults(props) {
  return (
    <div className="testResults fade-in">
      <h2>Test results</h2>
      <div className="results">
        <span>Amount of proof:</span>
        <span>{props.totalImages}</span>
        <span>Times snoozed:</span>
        <span>{props.timesSnoozed}</span>
      </div>
      <p>
        Hopefully this helps to paint a picture!{" "}
        <span role="img" aria-label="student">
          👨‍🎓
        </span>
      </p>
      <p>
        Greets from my programmer, <br />
        Roy Schut
      </p>
      <p>
        Want to
        <button className="linkButton" onClick={() => props.onRestart()}>
          test again
        </button>
        ?
      </p>
    </div>
  );
}
