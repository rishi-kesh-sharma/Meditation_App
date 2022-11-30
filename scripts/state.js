import data from "./data.js";
// initial state
const initialState = {
  timer: 0,
  time: data.timeDurations[0],
  isPlaying: false,
  weather: "rainy",
  interval: "",
};

// state and functions
const stateAndFunctions = {
  state: {
    ...initialState,
  },

  // updateState
  updateState: function (newState) {
    this.state = { ...this.state, ...newState };
  },

  // intervalFunction
};

export default { initialState, stateAndFunctions };
