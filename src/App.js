import { useContext, useState } from "react";
import "./App.css";
import { resultContext } from "./context/resultContext";
import { questions, result } from "./data/questions";
import useComputation from "./hook/useComputation";
import useSteps from "./hook/useSteps";

function App() {
  const { state, updateState } = useContext(resultContext);

  const [step, handleStep] = useSteps(0);

  const [selectedAnswer, setSelectedAnswer] = useState("");

  // core logic
  const { output } = useComputation(state);

  // derived values
  const activeStep = questions[step];
  const Component = result[output];

  return (
    <>
      {step <= questions.length && (
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
              Choose
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
          {state.length > 0 && (
            <div className="responses">
              {state.map((e, i) => (
                <div>
                  <h3>Responses: </h3>
                  <p>{`Question${i + 1} ${e}`}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {state.length === questions.length && Component && (
        <div className="result">
          <div>{Component}</div>

          <button className="reset" onClick={() => window.location.reload()}>
            Restart
          </button>
        </div>
      )}
    </>
  );
}

export default App;
