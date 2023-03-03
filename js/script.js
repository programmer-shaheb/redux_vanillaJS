import {
  addMatch,
  decrementSingleResult,
  incrementSingleResult,
  reset,
} from "./actions.js";
import { reducer } from "./reducer.js";

const store = Redux.createStore(reducer);

let selectMatches;

const render = () => {
  const state = store.getState();
  selectMatches = state.matches;
};

// Add match functionality
function addMatchContainer() {
  store.dispatch(addMatch());

  const selectMatches = store.getState().matches;
  const latestMatchResult = selectMatches[selectMatches.length - 1];
  const latestMatch = Array.of(selectMatches[selectMatches.length - 1]);
  const lastIndex = selectMatches.length - 1;

  latestMatch.forEach((match, index) => {
    const allMatchesContainer = document.querySelector(".all-matches");
    const newMatchContainer = document.createElement("div");
    newMatchContainer.classList.add("match");

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("lws-delete");
    deleteButton.innerHTML = '<img src="./image/delete.svg" alt="" />';

    const matchName = document.createElement("h3");
    matchName.classList.add("lws-matchName");
    matchName.textContent = `Match ${allMatchesContainer.children.length + 1}`;

    wrapper.appendChild(deleteButton);
    wrapper.appendChild(matchName);
    newMatchContainer.appendChild(wrapper);

    const incrementForm = createForm("incrementForm", lastIndex);
    const decrementForm = createForm("decrementForm", lastIndex);

    const numbersContainer = document.createElement("div");
    numbersContainer.classList.add("numbers");

    const resultElement = document.createElement("h2");
    resultElement.classList.add("lws-singleResult");
    resultElement.textContent = latestMatchResult.singleResult;

    numbersContainer.appendChild(resultElement);
    newMatchContainer.appendChild(incrementForm);
    newMatchContainer.appendChild(decrementForm);
    newMatchContainer.appendChild(numbersContainer);

    allMatchesContainer.appendChild(newMatchContainer);
  });

  function createForm(className, lastIndex) {
    const form = document.createElement("form");
    form.classList.add(className);

    const label = document.createElement("h4");
    const input = document.createElement("input");

    if (className === "incrementForm") {
      label.textContent = "Increment";
      input.name = "increment";
      input.type = "number";
      input.classList.add(`lws-increment`, `increment${lastIndex}`);
    } else if (className === "decrementForm") {
      label.textContent = "Decrement";
      input.name = "decrement";
      input.type = "number";
      input.classList.add(`lws-decrement`, `decrement${lastIndex}`);
    }

    form.appendChild(label);
    form.appendChild(input);

    form.onsubmit = function (e) {
      e.preventDefault();
      const dynamicIncClassName = `increment${lastIndex}`;
      const dynamicDecClassName = `decrement${lastIndex}`;

      const inputIncrementValue = document.querySelector(
        `.${dynamicIncClassName}`
      );

      const inputDecrementValue = document.querySelector(
        `.${dynamicDecClassName}`
      );
      const matchIndex = lastIndex;
      const resultElements = document.querySelectorAll(".lws-singleResult");

      if (className === "incrementForm") {
        store.dispatch(
          incrementSingleResult(matchIndex, parseInt(inputIncrementValue.value))
        );
      } else if (className === "decrementForm") {
        store.dispatch(
          decrementSingleResult(matchIndex, parseInt(inputDecrementValue.value))
        );
      }

      const updatedState = store.getState();
      const resultEl = resultElements[matchIndex];
      resultEl.textContent = updatedState.matches[matchIndex].singleResult;
    };

    return form;
  }
}

const addMatchButton = document.querySelector(".lws-addMatch");
addMatchButton.addEventListener("click", addMatchContainer);

// Reset match total value functionality
const resetBtnContainer = () => {
  store.dispatch(reset());

  let resultElements = document.querySelectorAll(".lws-singleResult");
  resultElements.forEach((element) => {
    element.textContent = 0;
  });
};

const resetButton = document.querySelector(".lws-reset");
resetButton.addEventListener("click", resetBtnContainer);

// Get the increment and decrement forms
const incrementForm = document.querySelector(".incrementForm");
const decrementForm = document.querySelector(".decrementForm");

// Add event listener to the increment form
incrementForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputIncrementValue = document.querySelector(".lws-increment");
  const matchIndex = 0;

  store.dispatch(
    incrementSingleResult(matchIndex, parseInt(inputIncrementValue.value))
  );

  const resultElements = document.querySelectorAll(".lws-singleResult");
  const resultEl = resultElements[matchIndex];
  resultEl.textContent = selectMatches[matchIndex].singleResult;
});

// Add event listener to the decrement form
decrementForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputDecrementValue = document.querySelector(".lws-decrement");
  const matchIndex = 0;

  store.dispatch(
    decrementSingleResult(matchIndex, parseInt(inputDecrementValue.value))
  );

  const resultElements = document.querySelectorAll(".lws-singleResult");
  const resultEl = resultElements[matchIndex];
  resultEl.textContent = selectMatches[matchIndex].singleResult;
});

render();
store.subscribe(render);
