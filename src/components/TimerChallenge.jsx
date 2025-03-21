import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef(); // like state values the value in refs are not lost when component function re-executes, bu tunlike state setting value (timer.current = setTimeout) in ref doesnt cause component function to re-execute
  //   let timer;
  //! we can use refs to manage any kind of value, because using variable imposes multiple issues so we need to have a diff solution

  const dialog = useRef();
  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  const [remainingTime, setRemainingTime] = useState(targetTime * 1000); //targetTime in ms will be initial time.
  const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000; //equal hua target k meanss not active yet.

  if (remainingTime <= 0) {
    //timer expired so we lost
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setRemainingTime(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      //setInterval is js built in function, it executes the function everytime the time mentioned(10 millisec here) has expired , not just once
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);
  }
  function handleStop() {
    //manually stopping the timer so we won
    dialog.current.open();
    clearInterval(timer.current);
    // needs a pointer to that timer; the ID of that timer as an input; such a pointer is returned by setTimeout
  }

  return (
    <>
      {/* always rendered and since its invisible so having it like this is not a problem */}
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        timeRemaining={remainingTime}
        onReset = {handleReset}
      />
      {/* forwarding a ref here to ResultModal component */}
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <button onClick={timerIsActive ? handleStop : handleStart}>
          {timerIsActive ? "Stop" : "Start"} Challenge
        </button>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
