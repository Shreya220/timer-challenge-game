import { useState, useRef } from "react";
// Ref in react is a value just as a variable contains a value its a special kind of value. Created using useRef hook
//! Dont use refs to read and manipulate all kinds of values on your page. For few cases using refs can be a great alternative to using state.
// whenever a ref changes, the component function does not re-execute.it is diff for state coz whenever state chnages component function re-executes.

export default function Player() {
  const playerNameInput = useRef(); //! this will be a JavaScript object that will always have a current property and this property will hold the element. so we can access all the methods and properties exposed by the HTML element.
  // ref value to in the end get the value entered in input field; we can connect these refs to jsx elements using SPECIAL PROP : ref. It takes ref value as input

  const [enteredPlayerName, setEnteredPlayerName] = useState("");
  function handleClick() {
    // through playerNameInput we can access the input element bcoz playerNameInput is connected to it.
    setEnteredPlayerName(playerNameInput.current.value);
    playerNameInput.current.value = ''; // clearing the input field
  }

  return (
    <section id="player">
      <h2>
        Welcome {enteredPlayerName ?? "unknown entity"}
        {/* enteredPlayerName ? enteredPlayerName : "unknown entity" ==> enteredPlayerName ??  "unknown entity" (SHORTCUT - if true then enteredPlayerName else (if enteredPlayerName is empty string) unknown entity) */}
      </h2>
      <p>
        <input ref={playerNameInput} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
