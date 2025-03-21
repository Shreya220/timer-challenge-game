import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
// portal is basically used to teleport the HTML code that will be rendered by this component into a different place in the DOM. just wrap jsx code into createPortal and pass it as 1st arg, 2nd arg is HTML element to which this code should be teleported(where the code should be rendered in the end) and it should be an element that exists in the DOM (index.html)

// Modal is basically a dialog box that opens up on top of screen
export default function ResultModal({
  timeRemaining,
  targetTime,
  ref,
  onReset,
}) {
  const userLost = timeRemaining <= 0; //timer expired
  const formattedRemainingTime = (timeRemaining / 1000).toFixed(2); //to show 2 decimal points
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

  const dialog = useRef();
  // ! this modal is still connected to the dialog ref in TimerChallenge component but under the hood it is basically referring to this object now. So, if the element changes from dialog to div we can change it here in this method rather than going to see where showModal is called in parent comp and then changing it.
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }, // name of method is up to us and this mehtod will be callable outside the component as well
    };
  });
  // accepts 2 args : 1. ref 2. function that returns an object which groups all the properties and methods that should be exposed by this component.
  return createPortal(
    // this built-in dialog element by default is invisible to make it visible we have to use "open" prop
    // we have a built-in backdrop that dims the bg when dialog box appears but it will not be shown if we force the dialog to be visible by setting open to true so we will open this dialog programatically using ref
    <dialog ref={dialog} className="result-modal">
      {userLost ? <h2>You lost!!</h2> : <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      {/* when dialog closes then timer resets */}
      <form method="dialog" onClose={onReset}> 
        {/* onClose used to close the dialog with Esc key rather than clicking the button. */}
        {/* this form inside dialog with the method dialog contains the button which will close the dialog - html feature  */}
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal') //selecting element by default browser API
  );
}
