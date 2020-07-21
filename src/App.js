import React, { useState } from "react";

import "./App.css";

import Uploader from "./Uploader";
import Snoozer from "./Snoozer";
import Home from "./Home";
import Timer from "./Timer";
import TestResults from "./TestResults";

const P_HOME = 0;
const P_RESULTS = 1;
const P_PANEL = 2;
const P_Default = P_HOME;

const PN_COUNT = 0;
const PN_UPLOAD = 1;
const PN_Default = PN_COUNT;

const Nav = ["Snooze", "Upload proof"];

function App() {
  const [curPage, setCurPage] = useState(P_Default);
  const [curPanel, setCurPanel] = useState(PN_Default);

  const [snoozeValMS, setSnoozeValMS] = useState();
  const [timesSnoozed, setTimesSnoozed] = useState(0);
  const [totallImages, setTotalImages] = useState(0);

  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const onRestart = () => {
    setCurPage(P_Default);
    setCurPanel(PN_Default);
    setSnoozeValMS(0);
    setTimesSnoozed(0);
    setIsTimerRunning(true);
    setTotalImages(0);
  };

  return (
    <div className="App">
      <section className="main">
        {curPage === P_HOME && <Home />}
        {curPage === P_RESULTS && (
          <TestResults
            totalImages={totallImages}
            timesSnoozed={timesSnoozed}
            onRestart={() => onRestart()}
          />
        )}
        {curPage === P_PANEL && (
          <div
            className={"panel fade-in " + (curPanel === 1 ? " flipnow" : "")}
          >
            <div className="panelContent">
              <div className="panelFront">
                <Snoozer
                  title={Nav[PN_COUNT]}
                  onSnooze={(v) => {
                    setSnoozeValMS(v);
                    setTimesSnoozed(timesSnoozed + 1);
                    setCurPanel(PN_UPLOAD);
                  }}
                />
              </div>
              <div className="panelBack">
                <Uploader
                  title={Nav[PN_UPLOAD]}
                  onSetTotalImages={(x) => setTotalImages(x)}
                  onDone={(e) => {
                    setCurPage(P_RESULTS);
                    setIsTimerRunning(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </section>
      <footer>
        <nav>
          <ul>
            {Nav.map((n, i) => (
              <React.Fragment key={i}>
                <i>
                  <button
                    className={
                      "footerBtn" +
                      (curPanel === i && curPage === P_PANEL
                        ? " footerBtn_sel"
                        : "")
                    }
                    onClick={() => {
                      if (!isTimerRunning) onRestart();
                      setCurPanel(i);
                      setCurPage(P_PANEL);
                    }}
                  >
                    {n}
                  </button>
                </i>
                {i < Nav.length - 1 && " "}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <Timer
          snoozeValMS={snoozeValMS}
          timesSnoozed={timesSnoozed}
          isTimerRunning={isTimerRunning}
          onExplode={() => {
            setCurPage(P_RESULTS);
            setIsTimerRunning(false);
          }}
        />
      </footer>
    </div>
  );
}
export default App;
