import { useContext, useState } from "react";
import "./App.css";
import { resultContext } from "./context/resultContext";
import { questions, result } from "./data/questions";

function App() {
  const { state, updateState } = useContext(resultContext);
  const [step, setStep] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const activeStep = questions[step];

  const handleStep = (direction) => {
    switch (direction) {
      case "next":
        return setStep((p) => p + 1);

      case "prev":
        return setStep((p) => (p > 0 ? p - 1 : p));

      case "restart":
        return setStep(0);

      default:
        return null;
    }
  };

  const computeResults = () => {
    const responses = [...state];

    const transformResponses = responses.map((response, index) => {
      if (response) {
        return {
          [`q${index + 1}`]: response === "yes" ? "yes" : "no",
        };
      }
      return null;
    });

    return transformResponses.reduce((acc, currentValue) => {
      Object.entries(currentValue).map(([key, value]) => {
        if (value === "yes") {
          return (acc += key);
        }
      });
      return acc;
    }, "");
  };

  console.log(computeResults());

  const Component = result[computeResults()];
  console.log(Component);

  return (
    <>
      {!Component && (
        <div className="App">
          <div>
            <h2>
              {activeStep.id}- {activeStep.question}
            </h2>
          </div>
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
          <div className="btn">
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

            {step === Number(questions.length) - 1 && (
              <button onClick={() => handleStep("restart")}>Restart</button>
            )}
          </div>
          {state && state.map((e) => <div>{e}</div>)}
        </div>
      )}

      {Component && <div className="result">{Component}</div>}
    </>
  );
}

export default App;
