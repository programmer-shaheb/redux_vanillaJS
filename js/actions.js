export function incrementSingleResult(index, incrementValue) {
  return {
    type: "INCREMENT_SINGLE_RESULT",
    payload: { index, incrementValue },
  };
}

export function decrementSingleResult(index, decrementValue) {
  return {
    type: "DECREMENT_SINGLE_RESULT",
    payload: { index, decrementValue },
  };
}

export function addMatch() {
  return { type: "ADD_MATCH" };
}

export function reset() {
  return { type: "RESET" };
}
