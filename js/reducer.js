const initialState = {
  matches: [
    {
      matchName: "Match 1",
      incrementValue: 0,
      decrementValue: 0,
      singleResult: 0,
    },
  ],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT_SINGLE_RESULT":
      return {
        ...state,
        matches: state.matches.map((match, index) => {
          if (index === action.payload.index) {
            return {
              ...match,
              singleResult: match.singleResult + action.payload.incrementValue,
            };
          }
          return match;
        }),
      };
    case "DECREMENT_SINGLE_RESULT":
      return {
        ...state,
        matches: state.matches.map((match, index) => {
          if (index === action.payload.index) {
            return {
              ...match,
              singleResult:
                action.payload.decrementValue > match.singleResult
                  ? 0
                  : match.singleResult - action.payload.decrementValue,
            };
          }
          return match;
        }),
      };
    case "ADD_MATCH":
      return {
        ...state,
        matches: [
          ...state.matches,
          {
            matchName: `Match ${state.matches.length + 1}`,
            incrementValue: 0,
            decrementValue: 0,
            singleResult: 0,
          },
        ],
      };
    case "RESET":
      return {
        ...state,
        matches: state.matches.map((match) => ({
          ...match,
          incrementValue: 0,
          decrementValue: 0,
          singleResult: 0,
        })),
      };

    default:
      return state;
  }
}
