import { useContext, useState } from "react";
import "./App.css";
import { resultContext } from "./context/resultContext";

function App() {
  const { state, updateState } = useContext(resultContext);
  console.log("STATE", state);

  const [s, setS] = useState("");
  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateState(s);
        }}
      >
        <input type="radio" value="A" onChange={(e) => setS(e.target.value)} />
        <button>A</button>
        <input type="radio" value="B" />
        <input type="radio" value="C" />
      </form>

      {state && state.map((e) => <div>{e}</div>)}
    </div>
  );
}

export default App;
