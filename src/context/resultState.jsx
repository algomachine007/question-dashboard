import React, { useState } from "react";
import { resultContext } from "./resultContext";

const ResultState = ({ children }) => {
  const Result = resultContext;

  const [state, setState] = useState([]);

  const updateState = (info) => {
    setState((previous) => {
      return [...previous, info];
    });
  };

  return (
    <Result.Provider value={{ updateState, state }}>{children}</Result.Provider>
  );
};

export default ResultState;
