import { useState } from "react";

const useSteps = (initialStep = 0) => {
  const [step, setStep] = useState(initialStep);

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
  return [step, handleStep];
};

export default useSteps;
