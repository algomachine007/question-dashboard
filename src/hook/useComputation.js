const useComputation = (state) => {
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
      Object.entries(currentValue).forEach(([key, value]) => {
        if (value === "yes") {
          acc += key;
        }
      });
      return acc;
    }, "");
  };
  return { output: computeResults() };
};

export default useComputation;
