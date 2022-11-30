import data from "./data.js";
import state from "./state.js";
const { initialState, stateAndFunctions } = state;
const DOMFunctions = {
  // append elements
  appendElements: (parent, ...childs) => {
    childs.forEach((child) => {
      parent.append(child);
    });
  },

  // create Element
  createElement: (type) => {
    return document.createElement(type);
  },

  // append class
  appendClass: (element, ...classes) => {
    classes.forEach((item) => {
      element.classList.add(item);
    });
  },

  // remove class
  removeClass: (element, ...classes) => {
    classes.forEach((item) => {
      element.classList.remove(item);
    });
  },

  // set text content
  setTextContent: (element, textContent) => {
    element.textContent = textContent;
  },

  //   interval function
  intervalFunction: function () {
    stateAndFunctions.updateState({ timer: stateAndFunctions.state.timer + 1 });

    DOMFunctions.updateDOMTime();
  },

  //   update DOM time
  updateDOMTime: function () {
    if (stateAndFunctions.state.timer > stateAndFunctions.state.time * 60) {
      clearInterval(stateAndFunctions.state.interval);
      console.log(stateAndFunctions.state);
      this.manipulateDOM();
      stateAndFunctions.updateState({ ...initialState });
      return;
    }

    const seconds = stateAndFunctions.state.timer % 60;
    const minutes = Math.trunc(
      Number(Number(stateAndFunctions.state.timer / 60))
    );
    let minuteString;
    if (minutes < 10) {
      minuteString = `0${minutes}`;
    } else {
      minuteString = `${minutes}`;
    }
    let secondsString;
    if (seconds < 10) {
      secondsString = `0${seconds}`;
    } else {
      secondsString = `${seconds}`;
    }
    let timeString = `${minuteString}:${secondsString}`;

    this.setTextContent(document.querySelector(".time-disp"), timeString);
  },

  // update dom elements
  updateDOMElements: function (element, classToRemove, classToAdd) {
    // update btn
    if (classToRemove) this.removeClass(element, ...classToRemove);

    if (classToAdd) this.appendClass(element, ...classToAdd);
  },

  //manipulate DOM
  manipulateDOM: function () {
    // for playing
    if (
      stateAndFunctions.state.time &&
      stateAndFunctions.state.isPlaying == false &&
      stateAndFunctions.state.weather
    ) {
      if (stateAndFunctions.state.weather == "sunny") {
        document.querySelector(".sunny-audio").play();
      }
      this.updateDOMElements(
        document.querySelector(".control-btn>i"),
        ["fa-solid", "fa-play"],
        ["fa-solid", "fa-pause"]
      );

      // update dom elements
      this.updateDOMElements(document.querySelector(".time-disp"), null, [
        "show",
      ]);
      this.updateDOMElements(
        document.querySelector(".container-left"),
        ["show"],
        null
      );
      this.updateDOMElements(
        document.querySelector(".container-right"),
        ["show"],
        null
      );

      // set interval
      const interval = setInterval(DOMFunctions.intervalFunction, 1000);

      const video = document.querySelector(".bg-video");
      video.src = data.videoLinks[stateAndFunctions.state.weather];
      video.play();
      // assign interval to state
      stateAndFunctions.updateState({ isPlaying: true, interval: interval });
      // console.log(isPlaying);
      // console.log(stateAndFunctions.state);
      return;
    }

    // for stopping
    if (
      stateAndFunctions.state.weather &&
      stateAndFunctions.state.time &&
      stateAndFunctions.state.timer > 0 &&
      stateAndFunctions.state.isPlaying == true
    ) {
      if (stateAndFunctions.state.weather == "sunny") {
        document.querySelector(".sunny-audio").pause();
      }
      // clear interval
      clearInterval(stateAndFunctions.state.interval);

      // update state

      // update dom elements
      this.updateDOMElements(
        document.querySelector(".control-btn>i"),
        ["fa-pause", "fa-solid"],
        ["fa-solid", "fa-play"]
      );
      this.updateDOMElements(document.querySelector(".container-left"), null, [
        "show",
      ]);
      this.updateDOMElements(document.querySelector(".container-right"), null, [
        "show",
      ]);

      // pause video
      const video = document.querySelector(".bg-video");
      video.pause();

      stateAndFunctions.updateState({ isPlaying: false });

      return;
    }
    if (
      stateAndFunctions.state.time &&
      stateAndFunctions.state.isPlaying == false &&
      stateAndFunctions.state.weather
    ) {
    }
  },
};

export default DOMFunctions;
