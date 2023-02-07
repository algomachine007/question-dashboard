import { useContext, useState } from "react";
import "./App.css";
import { resultContext } from "./context/resultContext";
import { questions } from "./data/questions";

function App() {
  const { state, updateState } = useContext(resultContext);
  const [step, setStep] = useState(0);
  console.log("STATE", state);

  const [selectedAnswer, setSelectedAnswer] = useState("");

  console.log("selected", selectedAnswer);

  const activeStep = questions[step];

  const handleStep = (direction) => {
    switch (direction) {
      case "next":
        return setStep((p) => p + 1);

      case "prev":
        return setStep((p) => (p > 0 ? p - 1 : p));

      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div>
        <h2>
          {activeStep.id}- {activeStep.question}
        </h2>
      </div>

      <form
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   updateState(selectedAnswer);
      // }}
      >
        {activeStep.answers.map((answer) => (
          <>
            <input
              type="radio"
              value={String(answer)}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              checked={answer === selectedAnswer}
            />
            <label>{answer}</label>
          </>
        ))}
      </form>

      <button onClick={() => updateState(selectedAnswer)} type="submit">
        Submit
      </button>

      <button onClick={() => handleStep("prev")} disabled={step <= 0}>
        Prev
      </button>

      <button
        onClick={() => handleStep("next")}
        disabled={step === Number(questions.length) - 1}
      >
        Next
      </button>
      {state && state.map((e) => <div>{e}</div>)}
    </div>
  );
}

export default App;
