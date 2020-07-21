import React from "react";

const parser = require("html-react-parser");

const STR_WELCOME =
  "Welcome tester!<br/><br/>To determine if my programmer is qualifying for this test, I would like you to upload screenshots of 'better' test results... before the timer ends.<br/><br/>Ready to upload proof? </br>Or need more time and snooze? ";

export default function Home() {
  return (
    <div className="fade-in">
      <p>
        {parser(STR_WELCOME)}
        <span role="img" aria-label="clock">
          ⏰
        </span>{" "}
        <span role="img" aria-label="smirking face">
          😏
        </span>
      </p>
    </div>
  );
}
